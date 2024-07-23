import reactLogo from './assets/react.svg';
import './App.css';
import dropDown from './components/dropdown-list';

import * as MicroStacks from '@micro-stacks/react';
import { WalletConnectButton } from './components/wallet-connect-button';
import { UserCard } from './components/user-card';
import { Logo } from './components/ustx-logo';
import { FC, useState } from 'react';
import LoginModal from './components/LoginModal';
import Modal from './components/Modal';


function Contents() {
  return (
    <>
    <div className="container">
        <img src="placeholder.png" alt="Site Logo" className="logo"></img>
        <h1 className="title">Welcome to GYM DAO</h1>
        <header className='header'>
      <UserCard />
      <WalletConnectButton />
      </header>
        <p className="description">Join our Decentralized Autonomous Organization and participate in the future of decentralized governance. Connect your wallet to get started.</p> 
          <div className='Vote'>
            <h2>Place a Vote</h2>
            
            <button>Yes</button>
            <button>No</button>
          </div>
    </div>
   
    </>
  );
}
export function Dashboard(): ReturnType<FC> {
  const [showModal, setShowModal] = useState<boolean>(false);

  function toggleModal() {
    setShowModal(!showModal);
  }

  return (
    <>
      <h1>Dashboard</h1>
      <div className="card">
      <span>Toggle Card</span>
      <button type="button" className="btn" onClick={toggleModal}>Open Modal
      </button>
      </div>
      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
      </Modal>
    </>
    
  );
}

export default function App() {
  return (
    <MicroStacks.ClientProvider
      appName={'React + micro-stacks'}
      appIconUrl={reactLogo}
      network="testnet"
    >
      <Contents />
    </MicroStacks.ClientProvider>
  );
}



