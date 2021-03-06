import React from "react";
import {Form, Formik} from "formik";
import { Box, Button } from "@chakra-ui/react";
import { Wrapper } from "../components/Wrapper"
import { InputField } from "../components/InputField";
// import { useMutation } from "urql";
import { useLoginMutation} from "../generated/graphql";
import { toErrormap } from "../utils/toErrorMap";
import { useRouter } from "next/router";
import { createUrqlClient } from "../utils/createUrqlClient";
import {withUrqlClient} from 'next-urql';




export const Login: React.FC<{}> = ({}) => {
    const router = useRouter();
    console.log(router);
    const [{},login] = useLoginMutation();
    return (
        <Wrapper variant="small">
            <Formik initialValues={{username:"", password:""}} 
            onSubmit={async (values, {setErrors}) =>{
                console.log(values);
                const response = await login(values);
                if(response.data?.login.errors){
                        setErrors(toErrormap(response.data.login.errors));

                }
                else if(response.data?.login.user){
                    //worked 
                    if(typeof router.query.next == "string"){
                        router.push(router.query.next)

                    }
                    else{
                        router.push("/");
                    }
                }
                
            }}>
                {({isSubmitting}) => (
                    <Form>
                        <InputField name = 'username'placeholder = 'username'label="username"/>
                        <Box mt = {4}>
                            <InputField name = 'password'placeholder = 'password'label="password" type='password'/>
                        </Box>
                        <Button mt={4} type="submit" isLoading={isSubmitting} colorScheme ="teal">Login</Button>
                    </Form>
                )

                }
                
            </Formik>
        </Wrapper>
        
    );
}

export default withUrqlClient(createUrqlClient)(Login);