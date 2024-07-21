import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import { Rings } from "react-loader-spinner";
import Swal from 'sweetalert2';
import './customTableStyles.css'; 
import {
  Box,
  Button,
  Container,
  Divider,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  VStack,
  Text,
  HStack,
} from '@chakra-ui/react';

function ViewAccounts() {
  const [documents, setDocuments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [docId, setDocId] = useState("");
  const [accountDetail, setAccountDetail] = useState({});
  const [isDepositAmount, setIsDepositAmount] = useState({ depositAmount: "0", description: "" });
  const [isWithdrawAmount, setIsWithdrawAmount] = useState({ withdrawAmount: "0", description: "" });
  const { isOpen, onOpen, onClose } = useDisclosure();

  const readDocs = async () => {
    let array = [
      { id: "1", branchCode: "001", accountNumber: "123456", fullName: "John Doe", date: "2024-07-20", accountType: "Savings", initialDeposit: "1000" },
      { id: "2", branchCode: "002", accountNumber: "789012", fullName: "Jane Doe", date: "2024-07-20", accountType: "Checking", initialDeposit: "2000" },
    ];

    setDocuments(array);
    setIsLoading(false);
  }

  useEffect(() => {
    readDocs();
  }, []);

  const handleClick = (doc) => {
    setAccountDetail(doc);
    setDocId(doc.id);
    onOpen();
  }

  const handleDelete = async () => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    });

    if (result.isConfirmed) {
      Swal.fire('Deleted!', 'Account has been deleted.', 'success');
      let newDocuments = documents.filter((object) => docId !== object.id);
      setDocuments(newDocuments);
      onClose();
    }
  }

  const handleDepositChange = e => {
    setIsDepositAmount({ ...isDepositAmount, [e.target.name]: e.target.value });
  }

  const handleWithdrawChange = e => {
    setIsWithdrawAmount({ ...isWithdrawAmount, [e.target.name]: e.target.value });
  }

  const handleDeposit = async () => {
    let newDocument = documents.find(object => docId === object.id);
    const { depositAmount } = isDepositAmount;
    const { initialDeposit } = newDocument;

    if (parseInt(depositAmount) < 0) {
      Swal.fire('Error!', 'Amount is not in correct format!', 'error');
      return;
    }

    newDocument.initialDeposit = (parseInt(initialDeposit) + parseInt(depositAmount)).toString();
    newDocument.description = isDepositAmount.description;

    let updatedArray = documents.map(object => {
      return docId === object.id ? newDocument : object;
    });
    setDocuments(updatedArray);

    Swal.fire('Success!', 'Amount Deposited Successfully!', 'success');
    onClose();
  }

  const handleWithdraw = async () => {
    let newDocument = documents.find(object => docId === object.id);
    const { withdrawAmount } = isWithdrawAmount;
    const { initialDeposit } = newDocument;

    if (parseInt(withdrawAmount) < 0) {
      Swal.fire('Error!', 'Amount is not in correct format!', 'error');
      return;
    }

    if (parseInt(withdrawAmount) > parseInt(newDocument.initialDeposit)) {
      Swal.fire('Error!', 'Your account has insufficient balance', 'error');
      return;
    }

    newDocument.initialDeposit = (parseInt(initialDeposit) - parseInt(withdrawAmount)).toString();
    newDocument.description = isWithdrawAmount.description;

    let updatedArray = documents.map(object => {
      return docId === object.id ? newDocument : object;
    });
    setDocuments(updatedArray);

    Swal.fire('Success!', 'Amount Withdrawn Successfully!', 'success');
    onClose();
  }

  return (
    <Container maxW="container.lg" py={8}>
      <Link to="/dashboard">
        <Button colorScheme="red" leftIcon={<i className="fa-solid fa-arrow-left"></i>}>
          Dashboard
        </Button>
      </Link>
      <VStack spacing={4} mt={4} align="start">
        <Text fontSize="2xl" fontWeight="bold">
          <i className="fa-solid fa-user me-1"></i> Accounts
        </Text>
        <Divider />
        {isLoading ? (
          <Box d="flex" justifyContent="center" alignItems="center" height="100px">
            <Rings />
          </Box>
        ) : documents.length < 1 ? (
          <VStack spacing={4} align="center">
            <Text>No accounts available!</Text>
            <Link to="/dashboard/createAccounts">
              <Button colorScheme="teal">Create Account</Button>
            </Link>
          </VStack>
        ) : (
          <>
            <Table className="customTable" id="customers">
              <Thead>
                <Tr>
                  <Th>Branch code</Th>
                  <Th>Account #</Th>
                  <Th>Name</Th>
                  <Th>Registered</Th>
                  <Th>Type</Th>
                  <Th>Balance</Th>
                </Tr>
              </Thead>
              <Tbody>
                {documents.map((doc, i) => (
                  <Tr key={i}>
                    <Td>{doc.branchCode}</Td>
                    <Td>
                      <Button variant="link" onClick={() => handleClick(doc)} style={{ color: 'blue' }}>
                        {doc.accountNumber}
                      </Button>
                    </Td>
                    <Td>{doc.fullName}</Td>
                    <Td>{doc.date}</Td>
                    <Td>{doc.accountType}</Td>
                    <Td>{doc.initialDeposit}</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
            {/* Account Detail Modal */}
            <Modal isOpen={isOpen} onClose={onClose}>
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>Account Details</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  <VStack spacing={4} align="start">
                    <HStack spacing={4}>
                      <Box><strong>Branch Code:</strong> {accountDetail.branchCode}</Box>
                      <Box><strong>Account Number:</strong> {accountDetail.accountNumber}</Box>
                    </HStack>
                    <HStack spacing={4}>
                      <Box><strong>Name:</strong> {accountDetail.fullName}</Box>
                      <Box><strong>Date:</strong> {accountDetail.date}</Box>
                    </HStack>
                    <HStack spacing={4}>
                      <Box><strong>Type:</strong> {accountDetail.accountType}</Box>
                      <Box><strong>Balance:</strong> {accountDetail.initialDeposit}</Box>
                    </HStack>
                    <Divider />
                    <FormControl>
                      <FormLabel>Deposit Amount</FormLabel>
                      <Input
                        type="number"
                        name="depositAmount"
                        value={isDepositAmount.depositAmount}
                        onChange={handleDepositChange}
                      />
                      <FormLabel>Description</FormLabel>
                      <Input
                        type="text"
                        name="description"
                        value={isDepositAmount.description}
                        onChange={handleDepositChange}
                      />
                      <Button mt={2} colorScheme="blue" onClick={handleDeposit}>
                        Deposit
                      </Button>
                    </FormControl>
                    <Divider />
                    <FormControl>
                      <FormLabel>Withdraw Amount</FormLabel>
                      <Input
                        type="number"
                        name="withdrawAmount"
                        value={isWithdrawAmount.withdrawAmount}
                        onChange={handleWithdrawChange}
                      />
                      <FormLabel>Description</FormLabel>
                      <Input
                        type="text"
                        name="description"
                        value={isWithdrawAmount.description}
                        onChange={handleWithdrawChange}
                      />
                      <Button mt={2} colorScheme="red" onClick={handleWithdraw}>
                        Withdraw
                      </Button>
                    </FormControl>
                  </VStack>
                </ModalBody>
                <ModalFooter>
                  <Button colorScheme="green" mr={3} onClick={handleDelete}>
                    Delete
                  </Button>
                  <Button variant="outline" onClick={onClose}>Close</Button>
                </ModalFooter>
              </ModalContent>
            </Modal>
          </>
        )}
      </VStack>
    </Container>
  );
}

export default ViewAccounts;
