import { useSearchParams } from 'react-router';
import { Flex, Text } from '@chakra-ui/react';
import { Button } from './ui/button';
import {
  BsChevronDoubleLeft,
  BsChevronDoubleRight,
  BsChevronLeft,
  BsChevronRight,
} from 'react-icons/bs';

export default function Pagination({ itemCount, pageSize, currentPage }) {
  const [searchParams, setSearchParams] = useSearchParams();

  const pageCount = Math.ceil(itemCount / pageSize);
  if (pageCount <= 1) {
    return null;
  }

  const changePage = (page) => {
    searchParams.set('page', page.toString());
    setSearchParams(searchParams);
  };

  return (
    <Flex align="center" gap={2} mt={2}>
      <Text>
        Page {currentPage} of {pageCount}
      </Text>
      <Button disabled={currentPage === 1} onClick={() => changePage(1)}>
        <BsChevronDoubleLeft />
      </Button>
      <Button
        disabled={currentPage === 1}
        onClick={() => changePage(currentPage - 1)}
      >
        <BsChevronLeft />
      </Button>
      <Button
        disabled={currentPage === pageCount}
        onClick={() => changePage(currentPage + 1)}
      >
        <BsChevronRight />
      </Button>
      <Button
        disabled={currentPage === pageCount}
        onClick={() => changePage(pageCount)}
      >
        <BsChevronDoubleRight />
      </Button>
    </Flex>
  );
}
