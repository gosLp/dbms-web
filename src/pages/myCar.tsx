import { Box, Button, Heading, HStack, Image, Img, Text , FormControl, FormLabel } from "@chakra-ui/react";
import { withUrqlClient } from "next-urql";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { Layout } from "../components/Layout";
import { PartType, useActiveMechanicsQuery, useAssignMechanicMutation, useCarConditionQuery, useCarMechanicsQuery, useNewMechanicMutation, useSponsorsQuery } from "../generated/graphql";
import { createUrqlClient } from "../utils/createUrqlClient";
import { Field, Form, Formik } from "formik"
// import engine from '../public/'
// sources old engine https://www.formula1.com/content/dam/fom-website/sutton/2018/China/Saturday/dcd1814ap130.jpg.transform/9col/image.jpg
interface InputFieldProps {
    
}

 const myCar: React.FC<InputFieldProps> = () => {
    const router = useRouter();
    const {isReady, query} = useRouter();
    const {carid} = router.query
    // useEffect(() =>{
    //     if(!carid){
    //         return
    //     }
    //     const fetchSomethingById = async () =>{
    //         const response = await fetch(`/myCar/${carid}`)
    //     }
    //     fetchSomethingById()
    // }, [carid])
    if (carid) {
        
    }
    console.log(router.query)
    
     if (isReady && router.query.carId) {
         const cur = router.query.carId!.toString();
         const [{data: mData,fetching:mFetching}] = useCarMechanicsQuery({variables:{carId: parseInt(cur)}})
         const [{data:eData,fetching: eFetching}] = useCarConditionQuery({variables:{carId: parseInt(cur), part: PartType.Engine}});
         const [{data:fData, fetching: fFetching}] = useCarConditionQuery({variables:{carId: parseInt(cur), part: PartType.Front}});
         const [{data:rData,fetching: rFetching}] = useCarConditionQuery({variables:{carId: parseInt(cur), part: PartType.Rear}});
         const [{data:cData,fetching: cFetching}] = useCarConditionQuery({variables:{carId: parseInt(cur), part: PartType.Chasis}});
         const [{data:aData, fetching:afetching}] = useActiveMechanicsQuery();
         const [{data:sData, fetching:sfetching}] = useSponsorsQuery({variables:{carId: parseInt(cur)}});
         const [,newMechanic] = useAssignMechanicMutation();
         console.log("car mechanics are",mData?.mechanics.mechanic)

        if (mData?.mechanics.mechanic) {
            return(
                <Layout>
                    
                    <Heading m='auto'>Engine condition for CAR no: {cur}</Heading>
                    <HStack>
                    {!eData && eFetching?(
                    <>
                        <div>Loading....</div>
                    </>
                    ):(
                    <>
                        <HStack my={8} spacing={8}>
                        <Box p={5} shadow="md" flex='1' borderRadius="md">
                        <Image m="auto" ml={4} height={200} width={250} src ="https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/p06-0714-a4-1559310904.jpg?resize=980:*"/>
    
                            <Text ml={8}> Engine Condition: {eData?.carCondition.condition![0].condition}</Text>
                            
                            
                        </Box>
                        </HStack>
                    </>
                    )}
                    {!fData && fFetching?(
                    <>
                        <div>Loading....</div>
                    </>
                    ):(
                    <>
                        <HStack my={8} spacing={8}>
                        <Box p={5} shadow="md" flex='1'  borderRadius="md">
                        <Image m="auto" ml={4} height={200} width={300}  src ="https://www.formula1.com/content/dam/fom-website/sutton/2019/Spain/Thursday/1017482851-SUT-20190509-MS2_6678.jpg.transform/9col/image.jpg"/>
    
                            <Text ml={10}> Front Condition: {fData?.carCondition.condition![0].condition}</Text>
                            
                            
                        </Box>
                        </HStack>
                    </>
                    )}
                    </HStack>
                    
                    
                    <HStack>
    
                    {!rData && rFetching?(
                    <>
                        <div>Loading....</div>
                    </>
                    ):(
                    <>
                        <HStack my={8} spacing={8}>
                        <Box p={5} shadow="md"  borderRadius="md">
                        <Image m="auto" ml={4} height={200} width={300}  src ="https://f1chronicle.com/wp-content/uploads/2021/04/How-do-Formula-One-Rear-Wings-work-scaled.jpg"/>
    
                            <Text ml={10}> Rear Condition: {rData?.carCondition.condition![0].condition}</Text>
                            
                            
                        </Box>
                        </HStack>
                    </>
                    )}
                    {!cData && cFetching?(
                    <>
                       <div>Loading....</div> 
                    </>
                    ):(
                    <>
                        <HStack my={8} spacing={8}>
                        <Box p={5} shadow="md"  borderRadius="md">
                        <Image m="auto" ml={4} height={200} width={300}  src ="https://i.ytimg.com/vi/jKZKCl_GEgY/maxresdefault.jpg"/>
    
                            <Text ml={10}> Chasis Condition: {rData?.carCondition.condition![0].condition}</Text>
                            
                            
                        </Box>
                        </HStack>
                    </>
                    )}
                    
                    </HStack>
                    <Button ml={300} onClick={()=>{}}>Update Car</Button>
    
    
                    <Heading my={4} size='lg'>Sponsors for Car no: {cur}</Heading>
                    { !sData && sfetching?(<>
                        <div>Loading....</div> 
                    </>):(<>
                       <HStack>
                           {sData!.sponsors.map((s) =>(
                               <Box  p={5}
                               shadow='md'
                               borderWidth='1px'
                               flex='1'
                               borderRadius='md'>
                               <Heading fontSize='xl'>{s.type} SPONSORS</Heading>
                               <Text mt={4}>VALUE : {s.value}</Text>
                               <Text mt={4}>DURATION : {s.duration}</Text>
                               </Box>
                           ))}
                       </HStack>
                    </>)}
    
                    <Heading my={4} size='lg'>Car Mechanics for Car no: {cur}</Heading>
                    
                    {
                        !mData && mFetching?( 
                            <>
                            {!aData && afetching?(<>
                                <div>Loading</div>
                            </>):(
                                <>
                                <div>MECHANICS NOT ASSIGNED</div>
                                <Formik initialValues={{ m_id:aData?.myMechanics[0].mech_id}} onSubmit={ async (values, seterrors) =>{
                                    console.log(values);
                                    if(values.m_id){
                                        const id = parseInt(values.m_id.toString())
                                        console.log(typeof(id))
                                        const eng = await newMechanic({mid:id,carId: parseInt(cur)})//await ({eId:id,driverId: parseInt(cur)});
                                        console.log(eng)
                                    }
                                    
                                    
                                }}>
                                    <Form>
                                    <FormControl>
                                        <FormLabel m="auto" my={2} htmlFor="m_id">Select Mechanic</FormLabel>
                                        <Field as= "select" name = "m_id" placeholder={0}>
                                            {
                                                aData?(
                                                    aData.myMechanics.map((m)=>(
                                                        <>
                                                        <option value={m.mech_id} >{m.Mname} Mechanic</option>  {/* onClick={async ()=>{ engId = m.engineer_id console.log(engId)}} */}

                                                        </>
                                                ))
                                                ):(<>
                                                <div><div className="loading"></div></div>
                                                </>)
                                            }
                                        </Field>
                                        {/* <Select  placeholder="Select available Engineers">  */}
                                            

                                        {/* </Select> */}
                                <Button ml={4} onSubmit={async ()=>{ console.log("worked")}} type="submit">submit</Button>
                                </FormControl>
                                </Form>
                                </Formik>
                                </>
                            )}
                                
                            </>
                        ):(<>
                                <HStack>
                                {mData!.mechanics.mechanic.map((m) =>(
                                    <Box p={5} shadow='md' borderWidth='1px'
                                     borderRadius='md' flex='1'>
                                         
                                         <Heading fontSize='xl' >{m.Mname}</Heading>
                                         <Text mt={4}> Mechanic number: {m.mech_id}</Text>
                                         <Text mt={4}> Works on PART: {m.part}</Text>
                                    </Box>
                                ))}
                                </HStack>
                        </>)
                    }
                    
                </Layout>
             )
        }
        else{
            return(
                <div>mech not found</div>
            )
        }
        

         
     }
     else{
        return (
            <Layout>
                
                    <label>Hello</label>
                
            </Layout>
        );
     }

    
    
    
    
    
   
}


export default withUrqlClient(createUrqlClient)(myCar)