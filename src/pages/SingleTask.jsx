import SingleTaskSkeleton from '@/_skeletons/SingleTaskSkeleton';
import DeleteConfirmation from '@/components/DeleteConfirmation';
import { API_BASE_URL } from '@/util';
import {
  Badge,
  Box,
  Card,
  Flex,
  Heading,
  Link,
  Stack,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { BsChevronLeft } from 'react-icons/bs';
import { Link as RouterLink, useNavigate, useParams } from 'react-router';

export default function SingleTask() {
  const [task, setTask] = useState();
  const { taskId } = useParams();
  const navigate = useNavigate();
  const { open, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    const fetchTask = async () => {
      const res = await fetch(`${API_BASE_URL}/tasks/${taskId}`, {
        credentials: 'include',
      });
      const data = await res.json();
      setTask(data);
    };
    fetchTask();
  }, []);

  const handleDeleteTask = async () => {
    const res = await fetch(`${API_BASE_URL}/tasks/${taskId}`, {
      method: 'DELETE',
      credentials: 'include',
    });
    const data = await res.json();
    if (res.status === 200) {
      toast.success(data.message);
      navigate('/tasks');
    } else {
      toast.error(data.message);
    }
  };

  if (!task) {
    return <SingleTaskSkeleton />;
  }

  return (
    <Box p={3} maxW="lg" mx="auto">
      <Link
        as={RouterLink}
        to="/tasks"
        color="teal"
        _hover={{ textDecor: 'none' }}
        display="flex"
        alignItems="center"
      >
        <BsChevronLeft /> All Tasks
      </Link>
      <Heading fontSize="3xl" fontWeight="semibold" textAlign="center" my={7}>
        {task.name}
      </Heading>
      <Stack direction="row">
        <Badge
          fontSize="md"
          colorPalette={task.status === 'open' ? 'orange' : 'green'}
        >
          {task.status}
        </Badge>
        {task.due && <Text>{new Date(task.due).toLocaleDateString()}</Text>}
      </Stack>
      <Card.Root mt={4} border="1px solid" borderColor="gray.200">
        <Card.Body>
          <Text>{task.description}</Text>
        </Card.Body>
      </Card.Root>
      <Flex justify="space-between" mt={5}>
        <Text as="span" color="red.600" cursor="pointer" onClick={onOpen}>
          Delete Task
        </Text>
        <Link
          as={RouterLink}
          to={`/update-task/${task._id}`}
          color="teal"
          _hover={{ textDecor: 'none' }}
        >
          Edit Task
        </Link>
      </Flex>
      <DeleteConfirmation
        alertTitle="Delete Task"
        handleClick={handleDeleteTask}
        isOpen={open}
        onClose={onClose}
      />
    </Box>
  );
}
