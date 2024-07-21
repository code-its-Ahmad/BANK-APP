import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Box, Button, FormControl, FormLabel, Input, Stack, Text, Heading } from "@chakra-ui/react";
import Swal from "sweetalert2";

function Login() {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!credentials.email || !credentials.password) {
      Swal.fire({
        title: 'Error',
        text: 'Please fill in all fields.',
        icon: 'error',
        confirmButtonText: 'OK'
      });
      setLoading(false);
      return;
    }

    try {
      // Replace with your login logic
      Swal.fire({
        title: 'Login successful',
        icon: 'success',
        confirmButtonText: 'OK'
      });
      navigate("/dashboard");
    } catch (error) {
      Swal.fire({
        title: 'Login failed',
        text: 'Incorrect email or password.',
        icon: 'error',
        confirmButtonText: 'OK'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box bg="gray.50" minH="50vh" d="flex" alignItems="center" justifyContent="center" p={6} >
      <Box bg="white" p={8} borderRadius="lg" shadow="md" maxW="md" w="full">
        <Heading as="h1" size="lg" mb={4} textAlign="center">
          Login
        </Heading>
        <form onSubmit={handleLogin}>
          <Stack spacing={4}>
            <FormControl id="email" isRequired>
              <FormLabel>Email address</FormLabel>
              <Input
                type="email"
                name="email"
                value={credentials.email}
                onChange={handleInputChange}
                placeholder="name@company.com"
              />
            </FormControl>
            <FormControl id="password" isRequired>
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                name="password"
                value={credentials.password}
                onChange={handleInputChange}
                placeholder="••••••••"
              />
            </FormControl>
            <Stack spacing={3}>
              <Button colorScheme="blue" type="submit" isLoading={loading}>
                Login
              </Button>
              <Text textAlign="center">
                Not registered? <Link to="/signup">Create an account</Link>
              </Text>
            </Stack>
          </Stack>
        </form>
      </Box>
    </Box>
  );
}

export default Login;
