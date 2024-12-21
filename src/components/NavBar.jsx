import { useUser } from '@/context/UserContext';
import { API_BASE_URL } from '@/util';
import { Box, Flex, Image, Link, Spacer } from '@chakra-ui/react';
import toast from 'react-hot-toast';
import { Link as RouterLink, useNavigate } from 'react-router';
import { MenuContent, MenuItem, MenuRoot, MenuTrigger } from './ui/menu';
import { Button } from './ui/button';

export default function NavBar() {
  const { user, updateUser } = useUser();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/auth/signout`, {
        credentials: 'include',
      });
      const message = await res.json();
      toast.success(message);
      updateUser(null);
      navigate('/');
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <Box as="nav" bg="red.50">
      <Flex
        minWidth="max-content"
        alignItems="center"
        p={12}
        maxW="7xl"
        m="0 auto"
      >
        <Box p={2}>
          <Link as={RouterLink} fontSize="lg" fontWeight="bold" to="/">
            Taskly
          </Link>
        </Box>
        <Spacer />
        <Box>
          {user ? (
            <MenuRoot>
              <MenuTrigger asChild>
                <Button
                  bg="gray.300"
                  w="48px"
                  h="48px"
                  p="0"
                  borderRadius="full"
                >
                  <Image
                    boxSize="40px"
                    borderRadius="full"
                    src={user.avatar}
                    alt={user.username}
                  />
                </Button>
              </MenuTrigger>
              <MenuContent>
                <MenuItem as={RouterLink} to="/profile">
                  Profile
                </MenuItem>
                <MenuItem as={RouterLink} to="/tasks">
                  Tasks
                </MenuItem>
                <MenuItem onClick={handleSignOut}>Sign Out</MenuItem>
              </MenuContent>
            </MenuRoot>
          ) : (
            <Link as={RouterLink} to="/signin">
              Sign In
            </Link>
          )}
        </Box>
      </Flex>
    </Box>
  );
}
