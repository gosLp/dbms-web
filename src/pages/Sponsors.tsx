import { Heading } from "@chakra-ui/react";
import { withUrqlClient } from "next-urql";
import React from "react";
import { useSponsorsQuery } from "../generated/graphql";
import { createUrqlClient } from "../utils/createUrqlClient";

const revenue: React.FC<{}> = () =>{


    const [] = useSponsorsQuery();
    return(
        <Heading>Sponsors Desk</Heading>
    )
}




export default withUrqlClient(createUrqlClient)(revenue);