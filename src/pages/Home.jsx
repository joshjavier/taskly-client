import { Box, Flex, Heading, Image, Link, Stack, Text } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router';
import productiveSvg from '/productive.svg';

export default function Home() {
  return (
    <Flex
      direction={{ base: 'column', md: 'row' }}
      gap={6}
      p={14}
      maxW="6xl"
      mx="auto"
    >
      <Stack flex={1} alignSelf="center">
        <Heading
          as="h1"
          fontSize={{ base: '4xl', lg: '6xl' }}
          fontWeight="bold"
          color="gray.700"
        >
          Make your{' '}
          <Text as="span" color="gray.500">
            perfect
          </Text>
          <br />
          day
        </Heading>
        <Box color="gray.500" pt={8}>
          Taskly will help you manage your day and to-do list.
          <br />
          We have a wide range of features to help you get things done.
        </Box>
        <Link as={RouterLink} to="/profile" fontWeight="bold" color="blue.400">
          Let&apos;s get started...
        </Link>
      </Stack>
      <Box flex={1}>
        <Image
          src={productiveSvg}
          maxWidth="400px"
          alt="Productive Illustration"
        />
      </Box>
    </Flex>
  );
}
