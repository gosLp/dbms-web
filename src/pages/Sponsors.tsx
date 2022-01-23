import {Box, Flex, Heading, Link, Stack, Text, Button} from "@chakra-ui/react";
import { withUrqlClient } from "next-urql";
import React from "react";
import { Layout } from "../components/Layout";
import { useAllSponsorsQuery } from "../generated/graphql";
import { createUrqlClient } from "../utils/createUrqlClient";

const revenue: React.FC<{}> = () =>{


    const [{data, fetching}] = useAllSponsorsQuery({variables:{limit: 5}});
    if(data){
    return(
        <>
        <Layout>
        {!data &&fetching ?(
            <>
                <div>Loading....</div>
            </>
        ):(
            <>
                <Heading fontSize='xx-large' p={5} shadow='xs' borderWidth='1px'>All Sponsors</Heading>
                <Stack>
                    {data!.allSponsors.map((s) => ( 
                       <>
                       
                        <Box key = {s.r_id} p={5} shadow='md' borderWidth='1px' >
                            <Heading fontSize='xl'>{s.type} </Heading>
                            <Text mt={4}>Value: {s.value}</Text>
                            <Text mt={4}> Revenue Number: {s.r_id}</Text>
                            <Text mt={4}> Duration: {s.duration}</Text>
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
                    else{
                        return (
                            <div>Not Available</div>
                        )
                    }
}




export default withUrqlClient(createUrqlClient)(revenue);