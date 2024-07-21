import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Box, Button, FormControl, FormLabel, Input, Stack, Text, Heading, Checkbox } from "@chakra-ui/react";
import Swal from "sweetalert2";

function SignUp() {
  const [userDetails, setUserDetails] = useState({
    first_name: "",
    last_name: "",
    email: "",
    address: "",
    country: "",
    city: "",
    password: "",
    password_confirmed: "",
    terms: false
  });
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setUserDetails({
      ...userDetails,
      [name]: type === "checkbox" ? checked : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userDetails.first_name || !userDetails.last_name || !userDetails.email || !userDetails.password || !userDetails.password_confirmed) {
      Swal.fire({
        title: 'Error',
        text: 'Please fill in all required fields.',
        icon: 'error',
        confirmButtonText: 'OK'
      });
      return;
    }

    if (userDetails.password !== userDetails.password_confirmed) {
      Swal.fire({
        title: 'Error',
        text: 'Passwords do not match.',
        icon: 'error',
        confirmButtonText: 'OK'
      });
      return;
    }

    if (!userDetails.terms) {
      Swal.fire({
        title: 'Error',
        text: 'You must accept the Terms and Conditions.',
        icon: 'error',
        confirmButtonText: 'OK'
      });
      return;
    }

    try {
      // Replace with your signup logic
      Swal.fire({
        title: 'Account created',
        text: 'You can now log in.',
        icon: 'success',
        confirmButtonText: 'OK'
      });
      navigate("/login");
    } catch (error) {
      Swal.fire({
        title: 'Error',
        text: 'An error occurred while creating your account.',
        icon: 'error',
        confirmButtonText: 'OK'
      });
    }
  };

  const handleTermsClick = () => {
    Swal.fire({
      title: 'Terms and Conditions',
      text: 'Display your terms and conditions here.',
      icon: 'info',
      confirmButtonText: 'OK'
    });
  };

  return (
    <Box bg="gray.50" minH="100vh" display="flex" alignItems="center" justifyContent="center" p={6}>
      <Box bg="white" p={8} borderRadius="lg" shadow="md" maxW="md" w="full">
        <Heading as="h1" size="lg" mb={4} textAlign="center">
          Sign Up
        </Heading>
        <form onSubmit={handleSubmit}>
          <Stack spacing={4}>
            <FormControl id="first_name" isRequired>
              <FormLabel>First Name</FormLabel>
              <Input
                type="text"
                name="first_name"
                value={userDetails.first_name}
                onChange={handleInputChange}
                placeholder="First Name"
              />
            </FormControl>
            <FormControl id="last_name" isRequired>
              <FormLabel>Last Name</FormLabel>
              <Input
                type="text"
                name="last_name"
                value={userDetails.last_name}
                onChange={handleInputChange}
                placeholder="Last Name"
              />
            </FormControl>
            <FormControl id="email" isRequired>
              <FormLabel>Email Address</FormLabel>
              <Input
                type="email"
                name="email"
                value={userDetails.email}
                onChange={handleInputChange}
                placeholder="name@company.com"
              />
            </FormControl>
            <FormControl id="address">
              <FormLabel>Address</FormLabel>
              <Input
                type="text"
                name="address"
                value={userDetails.address}
                onChange={handleInputChange}
                placeholder="Address"
              />
            </FormControl>
            <FormControl id="country">
              <FormLabel>Country</FormLabel>
              <Input
                type="text"
                name="country"
                value={userDetails.country}
                onChange={handleInputChange}
                placeholder="Country"
              />
            </FormControl>
            <FormControl id="city">
              <FormLabel>City</FormLabel>
              <Input
                type="text"
                name="city"
                value={userDetails.city}
                onChange={handleInputChange}
                placeholder="City"
              />
            </FormControl>
            <FormControl id="password" isRequired>
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                name="password"
                value={userDetails.password}
                onChange={handleInputChange}
                placeholder="••••••••"
              />
            </FormControl>
            <FormControl id="password_confirmed" isRequired>
              <FormLabel>Confirm Password</FormLabel>
              <Input
                type="password"
                name="password_confirmed"
                value={userDetails.password_confirmed}
                onChange={handleInputChange}
                placeholder="••••••••"
              />
            </FormControl>
            <FormControl id="terms" isRequired>
              <Checkbox
                name="terms"
                isChecked={userDetails.terms}
                onChange={handleInputChange}
              >
                I accept the <Button variant="link" onClick={handleTermsClick}>Terms and Conditions</Button>
              </Checkbox>
            </FormControl>
            <Stack spacing={3}>
              <Button colorScheme="blue" type="submit">
                Sign Up
              </Button>
              <Text textAlign="center">
                Already have an account? <Link to="/login">Login</Link>
              </Text>
            </Stack>
          </Stack>
        </form>
      </Box>
    </Box>
  );
}

export default SignUp;
