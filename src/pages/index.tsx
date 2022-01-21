
import {withUrqlClient} from 'next-urql';
import { createUrqlClient } from "../utils/createUrqlClient";
import { Layout } from "../components/Layout";
import NextLink from 'next/link';
import {Box, Flex, Heading, Link, Stack, Text, Button} from '@chakra-ui/react'
import { ExternalLinkIcon } from "@chakra-ui/icons";
import { useDriversQuery } from "../generated/graphql";

const Index = () => {
    const [{data, fetching}] = useDriversQuery({
        variables:{
            limit: 5,
            // cursor: 5
        }
    });

    if(!fetching && !data){
        return <div> No drivers found</div>
    }
    return (
    <Layout>
        <>
        <Flex>
            <Heading>Bangalore Racing </Heading>
            <NextLink href='/create-contract'>
                <Link ml="auto">
                    Create Contracts <ExternalLinkIcon mx='2px'/>
                    
                </Link>
                
            </NextLink>
        </Flex>
        
        
        <br/>
        <NextLink href='/myteam'>
            <Link >
                Team Management <ExternalLinkIcon mx='2px'/>
            </Link>
        </NextLink>
            <br/>
            {!data  && fetching? (
                <div>loading...</div>
            ):(
                <Stack>
                    {data!.drivers.map((d) => ( 
                       <>
                       
                        <Box key = {d.driver_id} p={5} shadow='md' borderWidth='1px' >
                            <Heading fontSize='xl'>{d.Dname}</Heading>
                            <Text mt={4}>Age: {d.Dage}</Text>
                            <Text mt={4}>WDC position: {d.pos}</Text>
                            <Text mt={4}>ActiveDriver: {d.status === '0'?"InActive":"Active"}</Text>
                        </Box>
                       </>
                        
                    
                    )
                    
                    )}
                </Stack> 

            )}
            {data ? (
                <Flex>
                    <Button isLoading = {fetching} m="auto" my={8}>
                        Load more
                    </Button>
                </Flex>
            ): null}
            
            
        
        </>
    </Layout>
        
    );
}
export default withUrqlClient(createUrqlClient, {ssr: false})(Index);
