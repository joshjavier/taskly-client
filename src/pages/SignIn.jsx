import { Button } from '@/components/ui/button';
import { Field } from '@/components/ui/field';
import { useUser } from '@/context/UserContext';
import { API_BASE_URL } from '@/util';
import { Box, Flex, Heading, Input, Stack, Text } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router';

export default function SignIn() {
  const navigate = useNavigate();
  const { updateUser } = useUser();

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm();

  const doSubmit = async (values) => {
    try {
      const res = await fetch(`${API_BASE_URL}/auth/signin`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(values),
      });
      const data = await res.json();
      if (res.status === 200) {
        toast.success('Sign In Successful');
        updateUser(data);
        navigate('/profile');
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
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
        Enter Your Credentials
      </Heading>
      <form onSubmit={handleSubmit(doSubmit)}>
        <Stack gap={4}>
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
            Sign In
          </Button>
        </Stack>
      </form>
      <Flex gap={2} mt={5}>
        <Text>Don&apos;t have an account?</Text>
        <Link to="/signup">
          <Text as="span" color="blue.400">
            Sign up
          </Text>
        </Link>
      </Flex>
    </Box>
  );
}
