import { Box, Button, Flex, Link  } from "@chakra-ui/react";
import React from 'react';
import Nextlink from 'next/link';
import { useMeQuery } from "../generated/graphql";

interface NavBarprops {
    
}

export const NavBar: React.FC<NavBarprops> = () => {
    const [{data, fetching}] = useMeQuery();
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
            <Flex>
                <Box mr={2}>{data.me.uname}</Box>
                <Button variant={'link'}>logout</Button>
            </Flex>
            
        )
    }
    return (
        <Flex bg='tomato' padding={4} >

            <Box ml={'auto'}>
                {body}
                
                
            </Box>
                
        </Flex>
    );
}