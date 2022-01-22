import { Box,  Text, Heading, HStack, Link, Select, Button, FormControl, FormLabel } from "@chakra-ui/react";
import { withUrqlClient } from "next-urql";
import React, { useEffect } from "react";
import { Layout } from "../components/Layout";
import {  useDriverDetailsQuery,  useMyCarQuery,  useMyEngineersQuery, useNewDriverEngineerMutation  } from "../generated/graphql";
import { createUrqlClient } from "../utils/createUrqlClient";
import NextLink from 'next/link'
import {ExternalLinkIcon} from '@chakra-ui/icons'
import { useRouter } from "next/router";
import { Field, Form, Formik } from "formik";
interface TeamFieldProps {
   
}

// type EngDriv = {}

 const ManageDriver: React.FC<TeamFieldProps> = () => {
    const router = useRouter();
    const {isReady, query} = useRouter();
    console.log(router)
    
    
    
    if(isReady){
        const cur = query.user_id!.toString()
        let engId: number;
        
        const [{data: carData, fetching: carFetching}] = useMyCarQuery({variables:{myCarId: parseInt(cur)}});
        useEffect(() =>{
            if (carData) {
                console.log(carData)
            }


        },[carData])
        
        const [{data, fetching}] = useDriverDetailsQuery({variables:{myDetailsId: parseInt(cur)}})
        const [, newEngineer] = useNewDriverEngineerMutation()
        const [{data:eData, fetching:eFetching}] = useMyEngineersQuery();
        

        
        return(
            <>
             <Layout>
            <br/>
            <></>
           { !data  && fetching? (
                <div>loading...</div>
            ):(
                <>
                <Heading scale={5}>DRIVER</Heading>
                
                <HStack my={8} spacing={8}>
                    
                    {!data?.myDetails.driver?(
                        <div>loading...</div>
                     ): (
                        <>
                        <Box
                        p={5}
                        shadow='md'
                        borderWidth='1px'
                        flex='1'
                        borderRadius='md'
                        
                        >
                            
                            <Heading fontSize='xl'>{data.myDetails.driver.Dname}</Heading>
                            <NextLink href='/manage'>
                                <Link ml="auto" onClick={() => 
                                    console.log("click")// router.push({pathname:'/manage', query: {user_id: d.driver_id }})
                                }>
                                    Manage Driver <ExternalLinkIcon mx='2px'/>
                    
                                </Link>
                
                            </NextLink>
                            <Text mt={4}>Age: {data.myDetails.driver.Dage}</Text>
                            <Text mt={4}>WDC position: {data.myDetails.driver.pos}</Text>
                            
                        </Box>
                    
                        </>
                    )
                    }
                    
                </HStack>
                
                </>)}
             {!data && fetching?(
                <div>loading...</div>
            ):(
                <>
                    <Heading size="md">DRIVER INFORMATION</Heading>
                    <HStack>
                        
                        <Box p={5}
                        shadow='md'
                        borderWidth='1px'
                        flex='1'
                        borderRadius='md'>
                        <Heading size ="sm">CONTRACT INFO</Heading>
                            <Text mt={4}> Contract ID: {data?.myDetails.contract?.contract_id}</Text>
                            <Text mt={4}> Length: {data?.myDetails.contract?.duration}</Text>
                            <Text mt={4}> Value: {data?.myDetails.contract?.value}</Text>
                        </Box>
                        <Box p={5}
                        shadow='md'
                        borderWidth='1px'
                        flex='1'
                        borderRadius='md'>
                        <Heading size ="md" my={2}>Engineer Info</Heading>
                            {!data?.myDetails.engineer? (
                                <>
                                <div>ENGINEER NOT ASSIGNED</div>
                                <Formik initialValues={{ e_id: eData?.myEngineers[0].engineer_id}} onSubmit={ async (values, seterrors) =>{
                                    console.log(values);
                                    if(values.e_id){
                                        const id = parseInt(values.e_id.toString())
                                        console.log(typeof(id))
                                        const eng =await newEngineer({eId:id,driverId: parseInt(cur)});
                                        console.log(eng)
                                    }
                                    
                                    
                                }}>
                                    <Form>
                                    <FormControl>
                                        <FormLabel m="auto" my={2} htmlFor="e_id">Select Engineer</FormLabel>
                                        <Field as= "select" name = "e_id" placeholder={0}>
                                            {
                                                eData?(
                                                    eData.myEngineers.map((m)=>(
                                                        <>
                                                        <option value={m.engineer_id} >{m.Ename} Engineer</option>  {/* onClick={async ()=>{ engId = m.engineer_id console.log(engId)}} */}

                                                        </>
                                                ))
                                                ):(<>
                                                <div><div className="loading"></div></div>
                                                </>)
                                            }
                                        </Field>
                                        {/* <Select  placeholder="Select available Engineers">  */}
                                            

                                        {/* </Select> */}
                                <Button ml={4} onSubmit={async ()=>{ await newEngineer({eId:engId,driverId:parseInt(cur)})}} type="submit">submit</Button>
                                </FormControl>
                                </Form>
                                </Formik>
                                
                                </>
                                ): (
                                    <>
                                    <Text mt={4}> Engineer Name: {data?.myDetails.engineer.Ename}</Text>
                                    <Text mt={4}> Engineer Age: {data?.myDetails.engineer?.Eage}</Text>
                                    <Text mt={4}> Engineer Status: {data?.myDetails.engineer?.status}</Text>
                                    </>
                                )
                            
                                }
                            
                        </Box>
                    
                    
                    </HStack>
                    
                                
                    <HStack my={4}>
                    
                            {carData?.myCar.map((c) =>(
                                <>
                            {/* <Heading>CAR: {c.car_id}</Heading> */}
                            <Box p={5} as='button' onClick={ () =>{ router.push('/myCar',{query: c.car_id.toString(), pathname: '/myCar' })}}
                            shadow='md'
                            borderWidth='1px'
                            flex='1'
                            borderRadius='md'>
                                <HStack>
                                    <Heading size="sm">CAR: {c.car_id}</Heading>
                                    <Box p={5}
                            shadow='md'
                            borderWidth='1px'
                            flex='1'
                            borderRadius='md'>
                                    <Heading size="xs">Car Details</Heading>
                                    <Text mt={4}> Engine Supplier: {c.engineSupplier}</Text>
                                    <Text mt={4}> Active Car{c.isActiveCar}</Text>
                                    </Box>
                                    <Box p={5}
                            shadow='md'
                            borderWidth='1px'
                            flex='1'
                            borderRadius='md'>
                                        <Heading size="xs">Car Condition</Heading>
                                        <Text mt={4}> Engine Condition:{c.E_condition}</Text>
                                        <Text mt={4}> Chasis Conditon: {c.chasis}</Text>
                                        <Text mt={4}> Front Conditon: {c.front}</Text>
                                        <Text mt={4}> Rear Conditon: {c.rear}</Text>
                                    </Box>
                                    
                                </HStack>
                                
                                
                            </Box>
                        </>
                            ))}
                    </HStack>
                
                    
                   
                        
                       
                </>
            )

            } 
        </Layout>

            </>
        )



        
    }
    else{
        return(
          <>
          <Heading>Not Reached</Heading>
              </>  
        );
    }

    
    
    
    

    
    
    // have queries for mechanics, engineers, management
    // data?.myDrivers.map((d)=>{console.log(d)});
    // return (
       
    // );
}


export default withUrqlClient(createUrqlClient)(ManageDriver);