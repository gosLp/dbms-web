import React from "react";
import {Form, Formik} from "formik";
import { Box, Button  } from "@chakra-ui/react";
import { Wrapper } from "../components/Wrapper"
import { InputField } from "../components/InputField";
// import { useMutation } from "urql";
import { useRegisterMutation } from "../generated/graphql";
import { toErrormap } from "../utils/toErrorMap";
import { useRouter } from "next/router";
import {withUrqlClient} from 'next-urql'
import { createUrqlClient } from "../utils/createUrqlClient";


interface registerProps{}


export const Register: React.FC<registerProps> = ({}) => {
    const router = useRouter();

    const [,register] = useRegisterMutation();
    return (
        <Wrapper variant="small">
            <Formik initialValues={{username:"", password:""}} 
            onSubmit={async (values, {setErrors}) =>{
                console.log(values);
                const response = await register(values);
                if(response.data?.register.errors){
                        setErrors(toErrormap(response.data.register.errors));

                }
                else if(response.data?.register.user){
                    //worked 
                    router.push("/");
                }
                
            }}>
                {({isSubmitting}) => (
                    <Form>
                        <InputField name = 'username'placeholder = 'username'label="username"/>
                        <Box mt = {4}>
                            <InputField name = 'password'placeholder = 'password'label="password" type='password'/>
                        </Box>
                        <Button mt={4} type="submit" isLoading={isSubmitting} colorScheme ="teal">register</Button>
                    </Form>
                )

                }
                
            </Formik>
        </Wrapper>
        
    );
}

export default withUrqlClient(createUrqlClient)(Register);