import { Heading } from "@chakra-ui/react";
import { withUrqlClient } from "next-urql";
import React from "react";
import { useSponsorsQuery } from "../generated/graphql";
import { createUrqlClient } from "../utils/createUrqlClient";

const addobject: React.FC<{}> = () =>{


    const [] = useSponsorsQuery();
    return(
        <Heading>The Management Desk</Heading>
    )
}

export default withUrqlClient(createUrqlClient)(addobject);