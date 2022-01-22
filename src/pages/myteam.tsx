import { Box,  Text, Heading, HStack,  Link } from "@chakra-ui/react";
import { withUrqlClient } from "next-urql";
import React from "react";
import { Layout } from "../components/Layout";
import {   useMyDriversQuery, useMyEngineersQuery } from "../generated/graphql";
import { createUrqlClient } from "../utils/createUrqlClient";
import NextLink from 'next/link'
import {ExternalLinkIcon} from '@chakra-ui/icons'
import { useRouter } from "next/router";
import { useIsAuth } from "../utils/useIsAuth";
interface TeamFieldProps {
    
}

 const MyTeam: React.FC<TeamFieldProps> = () => {

    const [{data, fetching}]  = useMyDriversQuery();
    const [{data:eData,fetching:eFetching}] = useMyEngineersQuery();
    //Engineers and management left
    
    useIsAuth();
    const router = useRouter();
    
    // have queries for mechanics, engineers, management
    data?.myDrivers.map((d)=>{console.log(d)});
    return (
        
        <Layout>
            <br/>
            <Heading >Banglore Racing Team</Heading>
           { !data  && fetching? (
                <div>loading...</div>
            ):(
                <>
                <Heading ml="auto" my={4} size="md">Drivers</Heading>
                <HStack my={4} spacing={8}>
                    
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
                            {/* <NextLink href='/manageDriver'> */}
                                <Link ml="auto" onClick={() => 
                                    router.push({pathname:'/manageDriver', query: {user_id: d.driver_id }})
                                }>
                                    Manage Driver <ExternalLinkIcon mx='2px'/>
                    
                                </Link>
                
                            {/* </NextLink> */}
                            <Text mt={4}>Age: {d.Dage}</Text>
                            <Text mt={4}>WDC position: {d.pos}</Text>
                            
                        </Box>
                    
                        </>
                    )
                    )}
                    
                </HStack>
                
                </>)}
                {!eData && eFetching?(
                <div>loading...</div>
            ):(
                <>
                    
                    <Heading my={4} size="md"> Engineers</Heading>

                    <HStack my={8} spacing={8}>
                        {eData!.myEngineers.map((e)=>(
                            <>
                            <Box
                            p={5}
                            shadow='md'
                            borderWidth='1px'
                            flex='1'
                            borderRadius='md'
                            
                            >
                                
                                <Heading fontSize='xl'>{e.Ename}</Heading>
                                <NextLink href='/manage'>
                                    <Link ml="auto" onClick={() => 
                                        router.push({pathname:'/manageEngineer', query: {user_id: e.engineer_id }})
                                    }>
                                        Manage Engineer <ExternalLinkIcon mx='2px'/>
                        
                                    </Link>
                    
                                </NextLink>
                                <Text mt={4}>Age: {e.Eage}</Text>
                                {/* <Text mt={4}>WDC position: {}</Text> */}
                                
                        </Box>
                            </>
                        ))}
                    </HStack>
                    
                </>
            )

            }
            {

            }
        </Layout>
    );
}


export default withUrqlClient(createUrqlClient)(MyTeam);