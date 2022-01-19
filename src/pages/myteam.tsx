import { Box, Flex, Text, Heading, HStack, Stack } from "@chakra-ui/react";
import { withUrqlClient } from "next-urql";
import React from "react";
import { Layout } from "../components/Layout";
import { useCarMechanicsQuery, useDriversQuery, useMyDriversQuery } from "../generated/graphql";
import { createUrqlClient } from "../utils/createUrqlClient";

interface TeamFieldProps {
    
}

 const MyTeam: React.FC<TeamFieldProps> = () => {

    const [{data, fetching}]  = useMyDriversQuery();
    // have queries for mechanics, engineers, management
    data?.myDrivers.map((d)=>{console.log(d)});
    return (
        <Layout>
            <br/>
            
           { !data  && fetching? (
                <div>loading...</div>
            ):(
                <>
                <Heading >Banglore Racing Drivers</Heading>
                <HStack my={8} spacing={8}>
                    
                    {data!.myDrivers.map((d) => (
                        <>
                        <Box
                        p={5}
                        shadow='md'
                        borderWidth='1px'
                        flex='1'
                        borderRadius='md'
                        
                        >
                            <Heading fontSize='xl'>{d.Dname}</Heading>
                            <Text mt={4}>Age: {d.Dage}</Text>
                            <Text mt={4}>WDC position: {d.pos}</Text>
                            
                        </Box>
                    
                        </>
                    )
                    )}
                    
                </HStack>
                
                </>)}
        </Layout>
    );
}


export default withUrqlClient(createUrqlClient)(MyTeam);