import { Box, HStack, Spacer, Textarea, VStack } from '@chakra-ui/react'
import React, { useState } from 'react'

interface params {
    username: string
    password: string
}
const LoginPage = () => {
    const [loginData, setLoginData] = useState<params>({} as params)
  return (
    <VStack h="100%">
        <Spacer/>
        <HStack w="100%">
            <Spacer/>
            <Spacer/>
        </HStack>
        <Spacer/>
    </VStack>
  )
}

export default LoginPage