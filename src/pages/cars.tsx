import {Box, Flex, Heading, Link, Stack, Text, Button, HStack} from "@chakra-ui/react";
import { withUrqlClient } from "next-urql";
import { useRouter } from "next/router";
import React from "react";
import { Layout } from "../components/Layout";
import { useAllCarsQuery, useAllManagementQuery, useSponsorsQuery } from "../generated/graphql";
import { createUrqlClient } from "../utils/createUrqlClient";

const management: React.FC<{}> = () =>{


    const [{data,fetching}] = useAllCarsQuery({variables:{limit:10}})
    const router = useRouter();
    
    return(
        <>
        <Layout>
        {!data &&fetching ?(
            <>
                <div>Loading....</div>
            </>
        ):(
            <>
                <Heading fontSize='xx-large' p={5} shadow='xs' borderWidth='1px'>All Available Cars</Heading>
                <Stack>
                    {data!.allCars.map((c) => ( 
                       <>
                       
                       <Box p={5} as='button' onClick={ () =>{ router.push('/myCar',{pathname:'/myCar', query: {carId: c.car_id }})}}
                            shadow='md'
                            borderWidth='1px'
                            flex='1'
                            borderRadius='md'>
                                <HStack>
                                    <Heading size="sm">CAR: {c.car_id}</Heading>
                                    <Box p={5}
                            shadow='md'
                            borderWidth='1px'
                            flex='1'
                            borderRadius='md'>
                                    <Heading size="xs">Car Details</Heading>
                                    <Text mt={4}> Engine Supplier: {c.engineSupplier}</Text>
                                    <Text mt={4}> Active Car{c.isActiveCar}</Text>
                                    </Box>
                                    <Box p={5}
                            shadow='md'
                            borderWidth='1px'
                            flex='1'
                            borderRadius='md'>
                                        <Heading size="xs">Car Condition</Heading>
                                        <Text mt={4}> Engine Condition:{c.E_condition}</Text>
                                        <Text mt={4}> Chasis Conditon: {c.chasis}</Text>
                                        <Text mt={4}> Front Conditon: {c.front}</Text>
                                        <Text mt={4}> Rear Conditon: {c.rear}</Text>
                                    </Box>
                                    
                                </HStack>
                                
                                
                            </Box>
                       </>
                        
                    
                    )
                    
                    )}
                </Stack> 
            </>

        )}
            {data ? (
                <Flex>
                    <Button isLoading = {fetching} m="auto" my={8}>
                        Load more
                    </Button>
                </Flex>
            ): null}
        </Layout>
        </>
        
    )
}

export default withUrqlClient(createUrqlClient)(management);