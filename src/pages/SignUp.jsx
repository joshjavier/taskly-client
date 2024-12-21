import { Button } from '@/components/ui/button';
import { Field } from '@/components/ui/field';
import { useUser } from '@/context/UserContext';
import { API_BASE_URL } from '@/util';
import { Box, Flex, Heading, Input, Stack, Text } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router';

export default function SignUp() {
  const { updateUser } = useUser();
  const navigate = useNavigate();
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm();

  const doSubmit = async (values) => {
    try {
      const res = await fetch(`${API_BASE_URL}/auth/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
        credentials: 'include',
      });
      const data = await res.json();
      if (res.status === 200) {
        toast.success('Sign Up Successful. You are now logged in');
        updateUser(data);
        navigate('/profile');
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error('Something went wrong');
    }
  };

  return (
    <Box p={3} maxW="lg" mx="auto">
      <Heading
        as="h1"
        textAlign="center"
        fontSize="3xl"
        fontWeight="semibold"
        my={7}
      >
        Create an Account
      </Heading>
      <form onSubmit={handleSubmit(doSubmit)}>
        <Stack gap={4}>
          <Field invalid={errors.username} errorText={errors.username?.message}>
            <Input
              id="username"
              type="text"
              placeholder="username"
              {...register('username', { required: 'Username is required' })}
            />
          </Field>
          <Field invalid={errors.email} errorText={errors.email?.message}>
            <Input
              id="email"
              type="email"
              placeholder="email"
              {...register('email', { required: 'Email is required' })}
            />
          </Field>
          <Field invalid={errors.password} errorText={errors.password?.message}>
            <Input
              id="password"
              type="password"
              placeholder="password"
              {...register('password', { required: 'Password is required' })}
            />
          </Field>
          <Button
            type="submit"
            isLoading={isSubmitting}
            colorPalette="teal"
            textTransform="uppercase"
          >
            Sign Up
          </Button>
        </Stack>
      </form>
      <Flex gap={2} mt={5}>
        <Text>Have an account?</Text>
        <Link to="/signin">
          <Text as="span" color="blue.400">
            Sign in
          </Text>
        </Link>
      </Flex>
    </Box>
  );
}
