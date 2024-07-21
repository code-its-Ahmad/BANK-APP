import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import dayjs from 'dayjs';
import {
  FormControl,
  FormLabel,
  Input,
  Select,
  Button,
  Spinner,
  Box,
  Heading,
  VStack,
  HStack,
  Icon,
  useDisclosure
} from "@chakra-ui/react";
import { FaUser, FaIdCard, FaBuilding, FaInfoCircle, FaMoneyBill } from 'react-icons/fa';
import { AuthenticatedContext } from '../../../Context/AuthContext';

const initialState = {
  fullName: "",
  CNIC: "",
  branchCode: "",
  accountNumber: "",
  accountType: "",
  initialDeposit: "",
  date: "",
  time: "",
  userId: "",
  id: "",
  description: "Initial Amount"
}

function CreateAccounts({ onClose }) {
  const [isLoading, setIsLoading] = useState(false);
  const [state, setState] = useState(initialState);
  const { user } = useContext(AuthenticatedContext);
  const navigate = useNavigate();

  const handleChange = e => {
    setState(s => ({ ...s, [e.target.name]: e.target.value }));
  }

  const handleSubmit = async e => {
    e.preventDefault();

    if (state.fullName.trim() === "") {
      Swal.fire('Error', 'Your Name field is empty and that is not acceptable.', 'error');
      return;
    }
    if (state.CNIC.length !== 13) {
      Swal.fire('Error', 'CNIC length should be 13', 'error');
      return;
    }
    if (state.branchCode < 1 || state.branchCode > 99) {
      Swal.fire('Error', 'Branch code should be between 1 and 99.', 'error');
      return;
    }
    if (state.accountNumber.length !== 9) {
      Swal.fire('Error', 'Account number length should be 9', 'error');
      return;
    }
    if (Number(state.initialDeposit) < 500) {
      Swal.fire('Error', 'Initial Deposit must be at least 500 PKR.', 'error');
      return;
    }

    if (!user) {
      Swal.fire('Error', 'User not authenticated. Please log in.', 'error');
      return;
    }

    setIsLoading(true);
    const date = dayjs().format('DD/MM/YYYY');
    const time = dayjs().format('hh:mm:ss A');

    const accountData = {
      ...state,
      date,
      time,
      userId: user.uid,
      id: Math.random().toString(36).slice(2),
      createdBy: {
        email: user.email,
        uid: user.uid
      }
    };

    console.log(accountData);

    // Simulating success
    setTimeout(() => {
      setIsLoading(false);
      Swal.fire('Success', `Dear ${accountData.fullName}, your account has been created against Account # ${accountData.accountNumber}`, 'success');
      navigate("/dashboard/viewAccounts");
      if (onClose) onClose(); // Close the modal after successful submission
    }, 1000);

    setState(initialState);
  }

  return (
    <Box p={4}>
      <Heading as="h2" size="lg" mb={4}>Create New Account</Heading>
      <form onSubmit={handleSubmit}>
        <VStack spacing={4}>
          <HStack w="full">
            <Icon as={FaUser} boxSize={6} />
            <FormControl isRequired>
              <FormLabel>Full Name</FormLabel>
              <Input type="text" name="fullName" value={state.fullName} onChange={handleChange} />
            </FormControl>
          </HStack>
          <HStack w="full">
            <Icon as={FaIdCard} boxSize={6} />
            <FormControl isRequired>
              <FormLabel>CNIC Number (length should be 13)</FormLabel>
              <Input type="text" name="CNIC" value={state.CNIC} onChange={handleChange} />
            </FormControl>
          </HStack>
          <HStack w="full">
            <Icon as={FaBuilding} boxSize={6} />
            <FormControl isRequired>
              <FormLabel>Branch Code (1 - 99)</FormLabel>
              <Input type="text" name="branchCode" value={state.branchCode} onChange={handleChange} />
            </FormControl>
          </HStack>
          <HStack w="full">
            <Icon as={FaUser} boxSize={6} />
            <FormControl isRequired>
              <FormLabel>Account Number (length should be 9)</FormLabel>
              <Input type="text" name='accountNumber' value={state.accountNumber} onChange={handleChange} />
            </FormControl>
          </HStack>
          <HStack w="full">
            <Icon as={FaInfoCircle} boxSize={6} />
            <FormControl isRequired>
              <FormLabel>Choose Account Type</FormLabel>
              <Select name="accountType" value={state.accountType} onChange={handleChange}>
                <option value="Saving">Saving</option>
                <option value="Current">Current</option>
              </Select>
            </FormControl>
          </HStack>
          <HStack w="full">
            <Icon as={FaMoneyBill} boxSize={6} />
            <FormControl isRequired>
              <FormLabel>Initial Deposit (Minimum 500 Rs.)</FormLabel>
              <Input type="text" name="initialDeposit" value={state.initialDeposit} onChange={handleChange} />
            </FormControl>
          </HStack>
          <Box w="full" textAlign="end">
            <Button type='submit' isLoading={isLoading} colorScheme="green">
              { !isLoading ? "Create Account" : <Spinner size="sm" /> }
            </Button>
          </Box>
        </VStack>
      </form>
    </Box>
  );
}

export default CreateAccounts;
