import React, { useState, useEffect } from 'react';
import {  Outlet } from 'react-router-dom';
import {
  Box,
  Button,
  Heading,
  Text,
  Container,
  Flex,
  Spinner,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure
} from '@chakra-ui/react';
import ViewTransactions from './viewTransactions/ViewTransactions';
import ViewAccounts from './viewAccounts/ViewAccounts';
import CreateAccounts from './accounts/CreateAccounts';

function Dashboard() {
  const [totalAccounts, setTotalAccounts] = useState(0);
  const [totalTransactions, setTotalTransactions] = useState(0);
  const [totalCredit, setTotalCredit] = useState(0);
  const [totalDebit, setTotalDebit] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const { isOpen: isTransactionsOpen, onOpen: onOpenTransactions, onClose: onCloseTransactions } = useDisclosure();
  const { isOpen: isAccountsOpen, onOpen: onOpenAccounts, onClose: onCloseAccounts } = useDisclosure();
  const { isOpen: isCreateAccountOpen, onOpen: onOpenCreateAccount, onClose: onCloseCreateAccount } = useDisclosure(); // Add this line

  const fetchData = async () => {
    await new Promise(resolve => setTimeout(resolve, 2000));
    const mockAccounts = [
      { id: 1, createdBy: { uid: 'user1' } },
      { id: 2, createdBy: { uid: 'user1' } }
    ];

    const mockTransactions = [
      { id: 1, type: 'credit', amount: '100' },
      { id: 2, type: 'debit', amount: '50' },
      { id: 3, type: 'credit', amount: '200' }
    ];

    let credit = 0;
    let debit = 0;
    mockTransactions.forEach(transaction => {
      if (transaction.type === 'credit') {
        credit += parseInt(transaction.amount);
      } else {
        debit += parseInt(transaction.amount);
      }
    });

    setTotalAccounts(mockAccounts.length);
    setTotalTransactions(mockTransactions.length);
    setTotalCredit(credit);
    setTotalDebit(debit);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <Container maxW="container.xl" py={5}>
        <Flex wrap="wrap" gap={4} className="flex flex-wrap gap-4">
          <Box w="full" lg="48%" p={4} borderWidth={1} borderRadius="md" boxShadow="md" className="w-full lg:w-1/2 p-4 border border-gray-200 rounded-md shadow-md">
            <Heading size="md" mb={4} textAlign="center">
              <i className="fa-solid fa-money-bill-1"></i> Transactions
            </Heading>
            <Button colorScheme="blue" mb={4} leftIcon={<i className="fa-solid fa-eye"></i>} onClick={onOpenTransactions}>
              View All Transactions
            </Button>
            <hr />
            {isLoading ? (
              <Flex justify="center" align="center" h="full" p={4}>
                <Spinner size="xl" />
              </Flex>
            ) : (
              <Box textAlign="center" mt={4}>
                <Text fontSize="2xl" mb={2}>
                  {totalTransactions}
                </Text>
                <Flex justify="space-between" px={4}>
                  <Text fontSize="lg" color="green.500">
                    Total Credits Rs: {totalCredit}
                  </Text>
                  <Text fontSize="lg" color="red.500">
                    Total Debits Rs: {totalDebit}
                  </Text>
                </Flex>
              </Box>
            )}
          </Box>
          <Box w="full" lg="48%" p={4} borderWidth={1} borderRadius="md" boxShadow="md" className="w-full lg:w-1/2 p-4 border border-gray-200 rounded-md shadow-md">
            <Heading size="md" mb={4} textAlign="center">
              <i className="fa-solid fa-user"></i> Accounts
            </Heading>
            <Flex direction="column" align="center" mb={4}>
              <Button colorScheme="green" mb={2} leftIcon={<i className="fa-solid fa-plus"></i>} onClick={onOpenCreateAccount}>
                Add New Account
              </Button>
              <Button colorScheme="blue" onClick={onOpenAccounts} leftIcon={<i className="fa-solid fa-eye"></i>}>
                View All Accounts
              </Button>
            </Flex>
            <hr />
            {isLoading ? (
              <Flex justify="center" align="center" h="full" p={4}>
                <Spinner size="xl" />
              </Flex>
            ) : (
              <Text fontSize="2xl" textAlign="center" mt={4}>
                {totalAccounts}
              </Text>
            )}
          </Box>
        </Flex>
      </Container>

      <Modal isOpen={isTransactionsOpen} onClose={onCloseTransactions} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>All Transactions</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <ViewTransactions showModal={false} />
          </ModalBody>
        </ModalContent>
      </Modal>

      <Modal isOpen={isAccountsOpen} onClose={onCloseAccounts} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>All Accounts</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <ViewAccounts />
          </ModalBody>
        </ModalContent>
      </Modal>

      <Modal isOpen={isCreateAccountOpen} onClose={onCloseCreateAccount} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create New Account</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <CreateAccounts /> 
          </ModalBody>
        </ModalContent>
      </Modal>

      <Outlet />
    </>
  );
}

export default Dashboard;
