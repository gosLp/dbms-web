
import {withUrqlClient} from 'next-urql';
import { createUrqlClient } from "../utils/createUrqlClient";
import { Layout } from "../components/Layout";
import NextLink from 'next/link';
import {Box, Flex, Heading, Link, Stack, Text, Button, HStack} from '@chakra-ui/react'
import { ExternalLinkIcon } from "@chakra-ui/icons";
import { useAllEngineersQuery, useDriversQuery } from "../generated/graphql";

const Index = () => {
    const [{data, fetching}] = useDriversQuery({
        variables:{
            limit: 20,
            // cursor: 5
        }
    });
    const [{data:eData, fetching: efetching}] = useAllEngineersQuery({variables:{limit: 10}})

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
            <NextLink href='/myteam'>
            <Link >
                Team Management <ExternalLinkIcon mx='2px'/>
            </Link>
        </NextLink>
            {/* <NextLink href='/management'>
            <Link >
                management  <ExternalLinkIcon mx='2px'/>
            </Link>
            </NextLink>
            <NextLink href='/Sponsors'>
            <Link >
                Sponsors  <ExternalLinkIcon mx='2px'/>
            </Link>
            </NextLink> */}
        </Flex>
        <Flex>
        <NextLink href='/management'>
            <Link >
                management  <ExternalLinkIcon mx='2px'/>
            </Link>
            </NextLink>
            <NextLink href='/Sponsors'>
            <Link >
                Sponsors  <ExternalLinkIcon mx='2px'/>
            </Link>
            </NextLink>
            <NextLink href='/cars'>
            <Link >
                AvailableCars  <ExternalLinkIcon mx='2px'/>
            </Link>
            </NextLink>
        </Flex>
        
        <br/>
        
            <br/>
            {!data  && fetching? (
                <div>loading...</div>
            ):(
                <>
                <Heading fontSize='xx-large' p={5} shadow='xs' borderWidth='1px'>All Drivers</Heading>
                <Stack>
                    {data!.drivers.map((d) => ( 
                       <>
                       
                        <Box key = {d.driver_id} p={5} shadow='md' borderWidth='1px' >
                            <Heading fontSize='xl'>{d.Dname}</Heading>
                            <Text mt={4}>Age: {d.Dage}</Text>
                            <Text mt={4}>WDC position: {d.pos}</Text>
                            <Text mt={4}>ActiveDriver: {d.status?"Active":"InActive"}</Text>
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
            
            {!eData && efetching?(
            <>
                <div>Loading.....</div>
            </>
            ):(
            <>  
                 <Heading fontSize='xx-large' p={5} shadow='xs' borderWidth='1px'>All Engineers</Heading>
                <Stack>
                    {eData!.Engineers.map((e) => ( 
                       <>

                        <Box key = {e.engineer_id} p={5} shadow='md' borderWidth='1px' >
                            <Heading fontSize='xl'>{e.Ename}</Heading>
                            <Text mt={4}>Age: {e.Eage}</Text>
                            <Text mt={4}>Engineer Number: {e.engineer_id}</Text>
                            <Text mt={4}>ActiveEngineer: { e.status?"Active":"InActive"}</Text>
                        </Box>
                       </>
                        
                    
                    )
                    
                    )}
                </Stack> 
            </>
            )}
            {eData ? (
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
