import React from 'react';
import { Box } from "@chakra-ui/react";
import { Seats } from './Home';

const Seat = ({ seatNumber, isBooked }) => {
  return (
    <Box
      bgColor={isBooked ? "red" : "green"}
      h="30px"
      borderRadius="5px"
      textAlign="center"
      color="white"
    >
      {seatNumber}
    </Box>
  );
};

export default Seat;
