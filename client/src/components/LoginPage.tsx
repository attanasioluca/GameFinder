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
} from "@chakra-ui/react";
import { FaUserAlt, FaLock } from "react-icons/fa";
import usePost from "../hooks/usePost";
import MainPage from "./MainPage";
import { useNavigate } from "react-router-dom";
import useGoogleAuth from "../hooks/useGoogleAuth";

const CFaUserAlt = chakra(FaUserAlt);
const CFaLock = chakra(FaLock);

interface FormData {
    email: string;
    password: string;
}

const App = () => {
    const navigate = useNavigate();
    if(localStorage.getItem("token")) {
        navigate("/");
    }
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState<FormData>({
        email: "",
        password: "",
    });
    const handleShowClick = () => setShowPassword(!showPassword);
    
    const {
        data: loginData,
        error: loginError,
        post: postLogin,
    } = usePost("http://localhost:3000/login");

    if (loginError) {
        console.error("Error logging in", loginError);
    }

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            await postLogin({
                email: formData.email,
                password: formData.password,
            });
        } catch (err) {
            console.error("Error logging in", err);
        }
    };

    if (loginData) {
        localStorage.setItem("token", loginData as string);
        navigate("/");
    }

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
                                            <CFaUserAlt color="purple.500" />
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
                                        color="gray.700"
                                        children={
                                            <CFaLock color="purple.500" />
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

                            <Button
                                borderRadius={0}
                                type="submit"
                                variant="solid"
                                backgroundColor="purple.500"
                                width="full"
                            >
                                Login
                            </Button>
                            <button>
                                <a href="http://localhost:3000/auth/google">
                                    entra con google
                                </a>
                            </button>
                        </Stack>
                    </form>
                </Box>
            </Stack>
            <Box>
                New to us?{" "}
                <Link color="purple.500" href="/signup">
                    Sign Up
                </Link>
            </Box>
        </Flex>
    );
};

export default App;
