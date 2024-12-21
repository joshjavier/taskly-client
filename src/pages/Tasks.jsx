import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router';
import {
  Badge,
  Box,
  Flex,
  Heading,
  TableBody,
  TableCell,
  TableColumnHeader,
  TableHeader,
  TableRoot,
  TableRow,
} from '@chakra-ui/react';
import { useUser } from '@/context/UserContext';
import { API_BASE_URL } from '@/util';
import {
  NativeSelectField,
  NativeSelectRoot,
} from '@/components/ui/native-select';
import { Button } from '@/components/ui/button';
import Pagination from '@/components/pagination';
import TasksSkeleton from '@/_skeletons/TasksSkeleton';
import { BsArrowUp } from 'react-icons/bs';

export default function Tasks() {
  const { user } = useUser();
  const [tasks, setTasks] = useState();

  const [searchParams, setSearchParams] = useSearchParams();
  const [itemCount, setItemCount] = useState(0);
  const page = parseInt(searchParams.get('page')) || 1;

  useEffect(() => {
    const fetchTasks = async () => {
      const query = searchParams.size ? `?${searchParams.toString()}` : '';
      const res = await fetch(
        `${API_BASE_URL}/tasks/user/${user._id}${query}`,
        {
          credentials: 'include',
        }
      );
      const { tasks, taskCount } = await res.json();
      setTasks(tasks);
      setItemCount(taskCount);
    };
    fetchTasks();
  }, [searchParams]);

  const handleStatusFilter = (e) => {
    const value = e.target.value;
    if (value) {
      searchParams.set('status', value);
    } else {
      searchParams.delete('status');
    }
    setSearchParams(searchParams);
  };

  const handleOrderBy = (value) => {
    searchParams.set('orderBy', value);
    setSearchParams(searchParams);
  };

  if (!tasks) {
    return <TasksSkeleton />;
  }

  return (
    <Box p={5} maxW="3lg" mx="auto">
      <Heading
        as="h1"
        fontSize="3xl"
        fontWeight="semibold"
        textAlign="center"
        my={7}
      >
        Tasks to do
      </Heading>
      <Flex justify="space-between" mb={3}>
        <Box w="100px">
          <NativeSelectRoot>
            <NativeSelectField placeholder="All" onChange={handleStatusFilter}>
              <option value="open">Open</option>
              <option value="done">Done</option>
            </NativeSelectField>
          </NativeSelectRoot>
        </Box>
        <Button
          colorPalette="green"
          textTransform="uppercase"
          fontWeight="semibold"
        >
          <Link to="/create-task">Create New Task</Link>
        </Button>
      </Flex>
      <TableRoot px={3} border="2px solid" borderColor="gray.100">
        <TableHeader backgroundColor="gray.100">
          <TableRow>
            <TableColumnHeader>
              <Flex
                onClick={() => handleOrderBy('name')}
                cursor="pointer"
                alignItems="center"
              >
                Task {searchParams.get('orderBy') === 'name' && <BsArrowUp />}
              </Flex>
            </TableColumnHeader>
            <TableColumnHeader>
              <Flex
                onClick={() => handleOrderBy('priority')}
                cursor="pointer"
                alignItems="center"
              >
                Priority{' '}
                {searchParams.get('orderBy') === 'priority' && <BsArrowUp />}
              </Flex>
            </TableColumnHeader>
            <TableColumnHeader>
              <Flex
                onClick={() => handleOrderBy('status')}
                cursor="pointer"
                alignItems="center"
              >
                Status{' '}
                {searchParams.get('orderBy') === 'status' && <BsArrowUp />}
              </Flex>
            </TableColumnHeader>
            <TableColumnHeader>
              <Flex
                onClick={() => handleOrderBy('due')}
                cursor="pointer"
                alignItems="center"
              >
                Due Date{' '}
                {searchParams.get('orderBy') === 'due' && <BsArrowUp />}
              </Flex>
            </TableColumnHeader>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tasks.map((task) => (
            <TableRow key={task._id}>
              <TableCell>
                <Link to={`/tasks/${task._id}`}>{task.name}</Link>
              </TableCell>
              <TableCell>
                <Badge
                  colorPalette={task.priority === 'urgent' ? 'red' : 'gray'}
                >
                  {task.priority}
                </Badge>
              </TableCell>
              <TableCell>
                <Badge
                  colorPalette={task.status === 'open' ? 'orange' : 'green'}
                >
                  {task.status}
                </Badge>
              </TableCell>
              <TableCell>
                {task.due ? new Date(task.due).toDateString() : ''}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </TableRoot>
      <Pagination itemCount={itemCount} pageSize={4} currentPage={page} />
    </Box>
  );
}
