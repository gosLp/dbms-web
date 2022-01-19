import { Box, Button, FormControl, FormLabel } from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";
import { withUrqlClient } from "next-urql";
import { useRouter } from "next/router";
import React from "react";
import { InputField } from "../components/InputField";
import { Layout } from "../components/Layout";
import { useCreateContractMutation } from "../generated/graphql";
import { createUrqlClient } from "../utils/createUrqlClient";
import { useIsAuth } from "../utils/useIsAuth";
// import { Layout } from "../components/Layout";



export enum ContractType {
  Driver = 'DRIVER',
  Engineer = 'ENGINEER',
  Mangaement = 'MANGAEMENT',
  Mechanic = 'MECHANIC'

}

 const CreateContract: React.FC<{}> = ({}) => {
  // const [startDate, setStartDate] = useState<Date | null>(new Date())
  const router = useRouter();
  useIsAuth();
 
  const [, createContract] = useCreateContractMutation();
  return(
    <Layout variant="small">
      <Formik initialValues={{
        Driver: 10,
        duration: new Date().toJSON().slice(0,10),
        type: ContractType.Driver,
        value: 200000
      }} 
            onSubmit={async (values, {setErrors}) =>{
                console.log(values);
                console.log(typeof(values.Driver));
                const {error} =await createContract({ options: {duration : values.duration, type: values.type, value: values.value}, typeId:  parseInt(values.Driver.toLocaleString())})
                if(!error){
                  router.push("/");
                }
                
            }}>
                {({isSubmitting}) => (
                    <Form>
                        <InputField name = 'Driver'placeholder = 'ID'label="Driver" type="number"/>
                        <Box mt = {4}>
                            <InputField name = 'duration'placeholder = {new Date().toJSON().slice(0,10)} label="duration" type="date"/>
                        </Box>
                        
                        
                        <Box mt= {4}>
                            <InputField name= 'value' label="value" type='number' min={200000} max={20000000}>
                            
                            </InputField>
                        </Box>
                        <Box mt={4}>
                        <FormControl>
                          <FormLabel htmlFor="type"> Type</FormLabel>
                          <Field as= "select" name = 'type' variant = 'filled' placeholder = {ContractType.Driver}>
                            <option value={ContractType.Driver}>Driver Contract</option>
                            <option value={ContractType.Engineer}>Engineer Contract</option>
                            <option value={ContractType.Mechanic}>Mechanic Contract</option>
                            <option value = {ContractType.Mangaement}>Management Contract</option>
                          </Field>
                        </FormControl>
                        </Box>
                        

                        <Button mt={4} type="submit" isLoading={isSubmitting} colorScheme ="teal">CreateContract</Button>
                    </Form>
                )

                }
                
            </Formik>
    </Layout>
  );



   
      
}


export default withUrqlClient(createUrqlClient)(CreateContract);