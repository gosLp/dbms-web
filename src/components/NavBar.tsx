import { Box, Button, Flex, Link  } from "@chakra-ui/react";
import React from 'react';
import Nextlink from 'next/link';
import { useLogoutMutation, useMeQuery } from "../generated/graphql";
import { isServer } from "../utils/isServer";

interface NavBarprops {
    
}

export const NavBar: React.FC<NavBarprops> = () => {
    const [{fetching:logoutFetching},logout] = useLogoutMutation();
    const [{data, fetching}] = useMeQuery({
        pause: isServer(),
    });
    let body = null;

    //datat is loading
    if(fetching){
        body = null;
    }
    // user is not logged in
    else if(!data?.me){
        body =(
            <>
                <Nextlink href= '/login'>
                    <Link color='white' mr={2}>login</Link>
                </Nextlink>
                <Nextlink href={'/register'}>
                    <Link color= 'white'>register</Link>
                </Nextlink>
            </>
        )
    }
    // user is logged in
    else{
        body = (
            <>
            <Flex>
                <Box mr={2}>{data.me.uname}</Box>
                <Button onClick={() =>{
                    logout();
                }} isLoading ={logoutFetching} variant={'link'}>logout</Button>
                
            </Flex>
            <Box>
                <Nextlink href={'/create-contract'}>
                    
                    <Link color= 'white'>Contracts</Link>
                </Nextlink>
            </Box>
            </>
        )
    }
    return (
        <Flex zIndex={2} position="sticky" top={0} bg='tan' padding={4} > 
        

            <Box ml={'auto'}>
                {body}
                
                
            </Box>
                
        </Flex>
    );
}