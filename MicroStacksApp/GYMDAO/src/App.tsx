import reactLogo from './assets/react.svg';
import './App.css';
import dropDown from './components/dropdown-list';

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
import { standardPrincipalCV, stringUtf8CV } from 'micro-stacks/clarity';
import {useInterval} from 'react-use';


function Contents() {

  const { openContractCall, isRequestPending } = useOpenContractCall();
  const { stxAddress } = MicroStacks.useAccount();
  const [response, setResponse] = useState(null);
  const { openAuthRequest, signOut, isSignedIn } = useAuth();
  const [post, setPost] = useState('');
  const [postedMessage, setPostedMessage] = useState("none");
  const [contractAddress, setContractAddress] = useState("ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM")

  const handleMessageChange = (e: { target: {value: SetStateAction<string>; }; }) => {
    setPost(e.target.value);
  }

  const handleOpenContractCall = async () => {
    const functionArgs = [
      stringUtf8CV(post),
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
        setPostedMessage(result.value.data)
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
          <div className='proposalCreate'>
            <h2>Create a Proposal</h2>
            <form


            
            
            />
          </div>
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
      <LoginModal />
      <Contents />
    </MicroStacks.ClientProvider>
  );
}



