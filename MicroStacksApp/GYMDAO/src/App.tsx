import reactLogo from './assets/react.svg';
import './assets/background.png';
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
      </header>
    </div>
    <div className="container">
      <p>At WeGym, we're not just a gym — we're a community where you have the power to shape the gym's future. Using cutting-edge blockchain technology, we've created a system that lets members directly manage and make decisions through our unique DAO (Decentralized Autonomous Organization). This means that every vote you cast on gym-related matters, whether it's new equipment, classes, or other improvements, is secure, transparent, and tamper-proof. No one can alter or manipulate the results, ensuring that every voice is heard fairly and openly.</p>
      <h2>What Is WeGym?</h2>
    </div>
    <div className="container">
      <h2>What Can I do?</h2>
      <p>What's more, our system operates 24/7, so no matter your schedule, you can always take part. You can even earn tokens by getting involved in decision-making, rewarding you for shaping your gym experience. WEGYM is more than just a place to work out — it's a gym managed by the community, for the community, and we're excited for you to be part of it!</p>
    </div>
    <div className="container">
      <p>Simple! You want new equipment, classes, or gym features? Write a proposal, everyone in the community has an opportunity to vote on it, and if the majority of the community like your idea, it'll pass. If you linked a product, it will be automatically purchased with the WEGYM members fund. Once it rocks up, our team at the gym will set it up and you can begin enjoying YOUR new addition to OUR gym!</p>
      <h2>How Does it Work tho, Actually?</h2>
    </div>
    <div className="container">
      <h2>Why Bother with Blockchain?</h2>
      <p>Blockchain, specifically built on top of Bitcoin, is the perfect fit for WEGYM because it provides a secure, transparent, and decentralized way for members to manage the gym. Leveraging Bitcoin's robust and time-tested network, every member's vote is immutably recorded and protected from tampering, ensuring that decisions are fully transparent and verifiable. This fosters trust, as no one can alter the results, and every action is backed by Bitcoin's unmatched security. With 24/7 operation, members can participate in decision-making at their convenience, all without needing intermediaries. This gives the WEGYM community full control and ownership over their gym experience, powered by Bitcoin's blockchain.</p>
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



