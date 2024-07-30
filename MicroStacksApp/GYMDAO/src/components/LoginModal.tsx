import React, { useState, useEffect } from 'react';
import { useAccount } from '@micro-stacks/react';
import  Modal  from './Modal'; // Assuming you have a Modal component
import { WalletConnectButton } from './wallet-connect-button';
const LoginModal: React.FC = () => {
  const { stxAddress } = useAccount(); // Get stxAddress from useAccount hook
  const [isOpen, setIsOpen] = useState<boolean>(false); // Modal starts open


  useEffect(() => {
    console.log("THIS USE EFFECT WORKS")
    if (!stxAddress) {
      setIsOpen(true); // Open modal if user is logged in
    }
    else{
      setIsOpen(false); //Close model if no user stacks address is found
    }
  }, [stxAddress]); // Dependency added to update when stxAddress changes

  const handleLogin = () => {
    // Add logic here to handle login action via Xverse
    console.log('Login process via Xverse');
  };

  return (
    <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
      <h2>Login to Xverse</h2>
      <p>Please login using Xverse to continue.</p>
      <WalletConnectButton />
    </Modal>
  );
};

export default LoginModal;
