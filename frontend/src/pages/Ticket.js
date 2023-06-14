import React from 'react';
import { Box } from '@chakra-ui/react';

const Tickets = ({ num }) => {
  return (
    <Box h="30px" bgColor="green.200" textAlign="center" p="5px" fontWeight="bold">
      S{num}
    </Box>
  );
};

export default Tickets;
