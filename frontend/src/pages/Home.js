import {
    Box,
    Stack,
    Grid,
    Heading,
    Text,
    Button,
    VStack,
    useToast,
    HStack,
  } from "@chakra-ui/react";
  import axios from "axios";
  import React, { useEffect, useState } from "react";
  import Seat from "./Seat";
  import Tickets from "./Ticket";
  
  
  
  const Homepage = () => {
    const [allSeats, setAllSeats] = useState([]);
    const [ticket, setTicket] = useState([]);
    const [value, setValue] = useState("");
    const [load, setLoad] = useState(false);
    const toast = useToast();
  
  
    let getAllSeats = async () => {

      try {
        let res = await axios.get(
          `https://un-stop-0p2m.onrender.com/seats`
        );
  
        setAllSeats(res.data.seats);
      } catch (error) {
        console.log(error);
      }
    };
  
    let handleChange = (e) => {
      setValue(e.target.value);
    };
  
    let bookSeats = async () => {
      setLoad(true);
      try {
        if (value === "") {
          toast({
            position: "top",
            title: "Aleart",
            description: "Enter valid Number",
            status: "error",
            duration: 2000,
            isClosable: true,
          });
        } else if (+value >= 7) {
          toast({
            position: "top",
            title: "Aleart",
            description: "You can book only 7 tickets at once",
            status: "error",
            duration: 2000,
            isClosable: true,
          });
        } else {
          let res = await axios.patch(
            "https://un-stop-0p2m.onrender.com/seats/book",
            { number: value }
          );
          setTicket(res.data.seatNo);
          getAllSeats();
          toast({
            position: "top",
            title: "Your Tickets Are Booked",
            description: "Your Tickets Are Booked",
            status: "success",
            duration: 2000,
            isClosable: true,
            });
          setLoad(false);
          setValue("");
        }
      } catch (error) {
        console.log(error);
      }
    };

    // Reset Function

    let reset = async () => {
      try {
         await axios.patch(
          `https://un-stop-0p2m.onrender.com/seats/reset`
        );
   
        getAllSeats()
        toast({
          position: "top",
          title: "Aleart",
          description: "All Seats Are Empty Now",
          status: "error",
          duration: 2000,
          isClosable: true,
        });
      } catch (error) {
        console.log(error);
      }
    
    }
  
    useEffect(() => {
      getAllSeats();
    }, []);
  
    return (
      <>
        <Stack
          w="100vw"
          h={{ base: "auto", md: "100px", lg: "100px" }}
          bgColor={{ base: "red.50" }}
        
          direction={{ base: "column", md: "row", lg: "row" }}
        >
          <Box w={{ base: "90%", md: "50%", lg: "50%" }} p="30px">
 
            <Heading color={"red"}>BOOK YOUR TICKETS NOW</Heading>
            <VStack w={{ base: "100%", md: "70%", lg: "70%" }} m="auto" mt="30px">
              
              <input
                type="number"
                placeholder="Enter Number"
                value={value}
                onChange={handleChange}
                style={{
                  width: "40%",
                  fontSize: "1.2em",
                  padding: "5px",
                  textAlign: "center",
                  color: "red.900",
                  fontWeight: "bold",
                }}
                min="1"
                max="7"
              ></input>
              <Button
                w="40%"
                isLoading={load}
                bgColor={"red.100"}
                color="red.700"
                fontWeight={"bold"}
                onClick={bookSeats}
              >
                BOOK
              </Button>

              <Button m="auto" mt="10vh"   bgColor={"red.100"} fontWeight={"bold"} onClick={reset}>RESET</Button>
            </VStack>
          </Box>
          <Box w={{ base: "100%", md: "50%", lg: "50%" }}>
            <HStack w="50%" m="auto" mt="20px">
              <Box h="15px" w="15px" bgColor={"red.500"}></Box>{" "}
              <Text as={"span"}  fontWeight={"bold"}>
                Booked
              </Text>
              <Box h="15px" w="15px" bgColor={"green"}></Box>{" "}
              <Text as={"span"}  fontWeight={"bold"}>
                Available
              </Text>
            </HStack>
  
            <Grid
              gridTemplateColumns={"repeat(7,1fr)"}
              gap="10px"
              w="70%"
              m="auto"
              mt="5%"
            >
              {allSeats.length > 0 &&
                allSeats.map((e) => <Seat key={e.seatNumber} {...e} />)}
            </Grid>
          </Box>
        </Stack>
      </>
    );
  };
  
  export default Homepage;
  