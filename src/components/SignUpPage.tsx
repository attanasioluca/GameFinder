import { ChangeEvent, FormEvent, useState } from "react";
import {
    Flex,
    Heading,
    Input,
    Button,
    InputGroup,
    Stack,
    InputLeftElement,
    chakra,
    Box,
    Link,
    Avatar,
    FormControl,
    FormHelperText,
    InputRightElement,
    Select,
} from "@chakra-ui/react";
import { FaUserAlt, FaLock } from "react-icons/fa";
import { AtSignIcon, LockIcon } from "@chakra-ui/icons";
import usePost from "../hooks/usePost";
import MainPage from "./MainPage";
import { useNavigate } from "react-router-dom";

const CFaUserAlt = chakra(FaUserAlt);

interface FormData {
    email: string;
    password: string;
    username: string;
    user_type: string;
}

const App = () => {
    const [showPassword, setShowPassword] = useState(false);
    const handleShowClick = () => setShowPassword(!showPassword);
    const navigate = useNavigate();
    const [formData, setFormData] = useState<FormData>({ email: '', password: '', username: '', user_type: ''});
    const { data: signupData, error: signupError, post: postSignup } = usePost(
        "http://localhost:3000/signup"
    );

    if(signupError){
        console.log(signupError);
        
    }

    if(signupData){
        localStorage.setItem('token', signupData as string);
        navigate("/")
    }

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        console.log(name, value);
        
        setFormData(prevState => ({
          ...prevState,
          [name]: value,
        }));
      };

      const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setFormData({...formData, user_type: event.target.value });
      };

      const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(formData);
        
        try {
            await postSignup({
                email: formData.email,
                username: formData.username,
                password: formData.password,
                user_type: formData.user_type,
            });
            
        } catch (err) {
            console.error("Error logging in", err);
        }
    };    

    const isFormValid = () => {
        const { email, password, username, user_type } = formData;
        return email && password && username && user_type;
    };

    return (
        <Flex
            flexDirection="column"
            width="100wh"
            height="100vh"
            backgroundColor="gray.900"
            justifyContent="center"
            alignItems="center"
        >
            <Stack
                flexDir="column"
                mb="2"
                justifyContent="center"
                alignItems="center"
            >
                <Avatar bg="purple.500" />
                <Heading color="purple.500">Welcome</Heading>
                <Box minW={{ base: "90%", md: "468px" }}>
                    <form onSubmit={handleSubmit}>
                        <Stack
                            spacing={4}
                            p="1rem"
                            backgroundColor="gray.700"
                            boxShadow="md"
                            borderRadius={"20px"}
                        >
                            <FormControl>
                                <InputGroup>
                                    <InputLeftElement
                                        pointerEvents="none"
                                        children={
                                            <AtSignIcon color="purple.500" />
                                        }
                                    />
                                    <Input
                                        name="email"
                                        type="email"
                                        placeholder="email address"
                                        onChange={handleInputChange}
                                    />
                                </InputGroup>
                            </FormControl>
                            <FormControl>
                                <InputGroup>
                                    <InputLeftElement
                                        pointerEvents="none"
                                        children={
                                            <CFaUserAlt color="purple.500" />
                                        }
                                    />
                                    <Input
                                        name="username"
                                        type="username"
                                        placeholder="username"
                                        onChange={handleInputChange}
                                    />
                                </InputGroup>
                            </FormControl>
                            <FormControl>
                                <InputGroup>
                                    <InputLeftElement
                                        pointerEvents="none"
                                        color="gray.700"
                                        children={
                                            <LockIcon color="purple.500" />
                                        }
                                    />
                                    <Input
                                        name="password"
                                        type={
                                            showPassword ? "text" : "password"
                                        }
                                        placeholder="Password"
                                        onChange={handleInputChange}
                                    />
                                    <InputRightElement width="4.5rem">
                                        <Button
                                            h="1.75rem"
                                            size="sm"
                                            onClick={handleShowClick}
                                        >
                                            {showPassword ? "Hide" : "Show"}
                                        </Button>
                                    </InputRightElement>
                                </InputGroup>
                            </FormControl>
                            <Select placeholder="Livello" name="tier" onChange={handleSelectChange}>
                                <option value="basic">Standard</option>
                                <option value="premum">Premium</option>
                                <option value="admin">Amministratore</option>
                            </Select>
                            <Button
                                borderRadius={0}
                                type="submit"
                                variant="solid"
                                backgroundColor="purple.500"
                                width="full"
                                isDisabled={!isFormValid()}
                            >
                                Sign Up
                            </Button>
                        </Stack>
                    </form>
                </Box>
            </Stack>
        </Flex>
    );
};

export default App;
