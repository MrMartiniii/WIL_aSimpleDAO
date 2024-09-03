import reactLogo from './assets/react.svg';
import './App.css';
import dropDown from './components/dropdown-list';
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar';
import Proposals from './components/proposals';
import Governance from './components/governance';
import AboutUs from './components/aboutUs';

import * as MicroStacks from '@micro-stacks/react';
import { WalletConnectButton } from './components/wallet-connect-button';
import { UserCard } from './components/user-card';
import { Logo } from './components/ustx-logo';
import { FC, SetStateAction, useCallback, useEffect, useState } from 'react';
import LoginModal from './components/LoginModal';
import Modal from './components/Modal';
import './components/Modal.css'

import { FungibleConditionCode, makeStandardSTXPostCondition, callReadOnlyFunction } from 'micro-stacks/transactions';
import { useOpenContractCall } from '@micro-stacks/react';
import { useAuth } from '@micro-stacks/react';
import { StacksMocknet } from "micro-stacks/network";
import { intCV, standardPrincipalCV, stringUtf8CV } from 'micro-stacks/clarity';
import {useInterval} from 'react-use';


function Contents() {

  

  const { openContractCall, isRequestPending } = useOpenContractCall();
  const { stxAddress } = MicroStacks.useAccount();
  const [response, setResponse] = useState(null);
  const { openAuthRequest, signOut, isSignedIn } = useAuth();
  const [post, setPost] = useState('');
  const [postedMessage, setPostedMessage] = useState("none");
  const [postVal, setPostVal] = useState('');
  const [postedValue, setPostedValue] =useState("none");
  const [contractAddress, setContractAddress] = useState("ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM")

  const handleMessageChange = (e: { target: {value: SetStateAction<string>; }; }) => {
    setPost(e.target.value);
  }
  const handleValueChange = (e: {target: {value: SetStateAction<string>; }; }) => {
    setPostVal(e.target.value);
  }

  const handleOpenContractCall = async () => {
    const functionArgs = [
      stringUtf8CV(post),
      intCV(postVal),
    ];

    const postConditions = [
      makeStandardSTXPostCondition(stxAddress!, FungibleConditionCode.LessEqual, '1000000'),
    ];

    await openContractCall({
      contractAddress: contractAddress,
      contractName: 'CreatePolicy',
      functionName: 'create-policy',
      functionArgs,
      postConditions,
      attachment: 'this is an attachment',
      onFinish: async data => {
        console.log('finished contract call', data);
        setResponse(data);
      },
      onCancel: () => {
        console.log('popup closed')
      },
    });
  };

  const getPost = useCallback(async () => {

    if  (isSignedIn) {
      const functionArgs = [
        standardPrincipalCV(`${stxAddress}`)
      ]

      const network = new StacksMocknet();
      const result = await callReadOnlyFunction({
        contractAddress: contractAddress,
        contractName: 'CreatePolicy',
        functionName: 'create-policy',
        functionArgs,
        network
      });
      console.log("getting result", result);
      if (result.value) {
        console.log(result.value.data)
        //setPostedMessage(result.value.data)
      }
    }
  }, []);

  useEffect( () => {
    console.log('In UseEffect')
    getPost()
  }, [isSignedIn])

  useInterval(getPost, 10000);


  return (
    <>
    <div className="container">
        <h1 className="title">Welcome to GYM DAO</h1>
        <header className='header'>
      <UserCard />
      <WalletConnectButton />
      </header>
        <p className="description">Create or vote on a policy</p> 
        <details className='collapsible'>
          <summary>Create a Policy</summary>
          <p>
            <form action="" id='policyInput' onSubmit={() => handleOpenContractCall()}>
              <input type="text" placeholder='Description' value={post} onChange={handleMessageChange}/>
              <input type="number" placeholder='Amount' value={postVal} onChange={handleValueChange}/>
              <input type="submit" />
            </form>
          </p>
        </details>
        <div className='Vote'>
          <h2>Place a Vote</h2>

          <button>Yes</button>
          <button>No</button>
        </div> 
      </div>


    <div className="container">
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
};
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
  const network = new StacksMocknet();

  return (
    <MicroStacks.ClientProvider
      appName={'React + micro-stacks'}
      appIconUrl={reactLogo}
      network={network}
    >
      <BrowserRouter>
        <LoginModal />
        <NavBar />
        <Routes>
          <Route path="/" element={<Contents />} />
          <Route path="/proposals" element={<Proposals />} />
          <Route path="/governance" element={<Governance />} />
          <Route path="/about-us" element={<AboutUs />} />
        </Routes>
      </BrowserRouter>
    </MicroStacks.ClientProvider>
  );
}



