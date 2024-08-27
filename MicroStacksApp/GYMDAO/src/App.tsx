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
import './components/Modal.css'


function Contents() {
  return (
    <>
    <nav className="navbar">
    <ul className="navbar-list">
      <li className="navbar-item"><a href="#home">Home</a></li>
      <li className="navbar-item"><a href="#proposals">Proposals</a></li>
      <li className="navbar-item"><a href="#governance">Governance</a></li>
      <li className="navbar-item"><a href="#about-us">About Us</a></li>
    </ul>
  </nav>
    <div className="container">
        <img src="WeGyGymDO.png" alt="Site Logo" className="logo"></img>
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
    <div className="OngoingProposals">
      <h2>Ongoing Proposals</h2>
      <table className="proposals-table">
      <thead>
        <tr>
          <th>Proposal ID</th>
          <th>Proposal Title</th>
          <th>Votes</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>1</td>
          <td>Proposal A</td>
          <td>200</td>
          <td>Active</td>
        </tr>
        <tr>
          <td>2</td>
          <td>Proposal B</td>
          <td>150</td>
          <td>Completed</td>
        </tr>
        <tr>
          <td>3</td>
          <td>Proposal C</td>
          <td>300</td>
          <td>Active</td>
        </tr>
        <tr>
          <td>4</td>
          <td>Proposal D</td>
          <td>50</td>
          <td>Rejected</td>
        </tr>
      </tbody>
    </table>
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
      <LoginModal />
      <Contents />
    </MicroStacks.ClientProvider>
  );
}



