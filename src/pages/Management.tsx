import {Box, Flex, Heading, Link, Stack, Text, Button} from "@chakra-ui/react";
import { withUrqlClient } from "next-urql";
import React from "react";
import { Layout } from "../components/Layout";
import { useAllManagementQuery, useSponsorsQuery } from "../generated/graphql";
import { createUrqlClient } from "../utils/createUrqlClient";

const management: React.FC<{}> = () =>{


    const [{data,fetching}] = useAllManagementQuery({variables:{limit:10}})
    
    
    return(
        <>
        <Layout>
        {!data &&fetching ?(
            <>
                <div>Loading....</div>
            </>
        ):(
            <>
                <Heading fontSize='xx-large' p={5} shadow='xs' borderWidth='1px'>All Management</Heading>
                <Stack>
                    {data!.allManagement.map((m) => ( 
                       <>
                       
                        <Box key = {m.m_id} p={5} shadow='md' borderWidth='1px' >
                            <Heading fontSize='xl'>{m.name} </Heading>
                            <Text mt={4}>Position: {m.type}</Text>
                            <Text mt={4}> Management number: {m.m_id}</Text>
                            <Text mt={4}>Active Position: {m.status?"Active":"InActive"}</Text>
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