import React, { FC, SetStateAction, useCallback, useState, useEffect } from 'react';
import { useAuth } from '@micro-stacks/react';
import { FungibleConditionCode, makeStandardSTXPostCondition, callReadOnlyFunction } from 'micro-stacks/transactions';
import { StacksMocknet } from 'micro-stacks/network';
import '../App.css';
import { useOpenContractCall } from '@micro-stacks/react';
import { uintCV, intCV, standardPrincipalCV, stringUtf8CV, cvToTrueValue } from 'micro-stacks/clarity';
import {useInterval} from 'react-use';
import refreshIcon from '../assets/Refresh.png';

import * as MicroStacks from '@micro-stacks/react';

interface Proposal {
  id: number;
  description: string;
  amount: string;
  status: string;
}

let showProp = false;

const Proposals = () => {
  const [proposals, setProposals] = useState<Proposal[]>([
    
  ]);

  const fakeProposals = []

  const { openContractCall, isRequestPending } = useOpenContractCall();
  const { stxAddress } = MicroStacks.useAccount();
  const [response, setResponse] = useState(null);
  const { openAuthRequest, signOut, isSignedIn } = useAuth();
  const [post, setPost] = useState('');
  const [postedMessage, setPostedMessage] = useState("none");
  const [postVal, setPostVal] = useState('');
  const [postedValue, setPostedValue] =useState("none");
  const [stxBalance, setStxBalance] =useState('none')
  const [contractAddress, setContractAddress] = useState("ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM")
  

  const handleMessageChange = (e: { target: {value: SetStateAction<string>; }; }) => {
    setPost(e.target.value);
  }
  const handleValueChange = (e: {target: {value: SetStateAction<string>; }; }) => {
    setPostVal(e.target.value);
  }

  const addProposal = (newProposal: Proposal) => {
    if(postedValue){
      setProposals((prevProposals) => [...prevProposals, newProposal]); // Spread existing proposals and add the new one
      setPostedMessage('');
        setPostedValue('');
    }
    
  };


  //Create Proposal
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
        showProp = true;
      },
      onCancel: () => {
        console.log('popup closed')
      },
    });
  };

  //Add money to DAO
  const fundDao = async () => {
    const functionArgs = [
      uintCV(20)
    ];

    const postConditions = [
      makeStandardSTXPostCondition(stxAddress!, FungibleConditionCode.LessEqual, '1000000'),
    ];

    await openContractCall({
      contractAddress: contractAddress,
      contractName: 'CreatePolicy',
      functionName: 'deposit',
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


  //Display Current Proposal
  const getPost = useCallback(async () => {

    if  (isSignedIn) {
      const args = [
        standardPrincipalCV(`${stxAddress}`)
      ]!

      const network = new StacksMocknet();
      const result = await callReadOnlyFunction({
        contractAddress: contractAddress,
        contractName: 'CreatePolicy',
        functionName: 'get-one-policy',
        functionArgs: args,
        network
      });


      console.log("getting result");
      if (result.value) {
        setPostedMessage(result.value.data.message.data)
        setPostedValue(result.value.data.amount.value.toString())
      }
    }
  }, []);

  //Get Value of DAO
  const getBalance = useCallback(async () => {
    if  (isSignedIn) {
      const args = []!

      const network = new StacksMocknet();
      const result = await callReadOnlyFunction({
        contractAddress: contractAddress,
        contractName: 'CreatePolicy',
        functionName: 'dao-balance',
        functionArgs: args,
        network
      });


      console.log("getting result", result.value);
      if (result.value) {
        setStxBalance(result.value.toString());
      }
    }
  }, []);


  useEffect( () => {
    console.log('In UseEffect')
    if (!showProp) {
      setPostedMessage('');
      setPostedValue('');
    }
    getBalance()
  }, [isSignedIn])


    useInterval(getBalance, 10000);  
  
  


  return (
    
    <div>
      
    <div className="container">
      <h1>Proposals</h1>
      <header className="header">
      </header>
      <p className="description">Create or vote on a policy</p>
      <details className="collapsible">
        <summary>Create a Policy</summary>
          <form action="" id="policyInput" onSubmit={(e) => {
            e.preventDefault();
            handleOpenContractCall();}}>
            <input
              id='description'
              type="text"
              placeholder="Description"
              //value={newProposal.title}
              onChange={(handleMessageChange)}
            />
            <input
              id='value'
              type="text"
              placeholder="Cost"
              //value={newProposal.description}
              onChange={((handleValueChange))}
            />
            <input type="submit" />
          </form>
      </details>
      <div className="Vote">
        <h2>Current DAO Balance</h2>
        <h3 className='balance'>{stxBalance} STX</h3>
        <button onClick={fundDao}>Add to DAO fund</button>
      </div>
    </div>
    <div>
    
    </div>
    <div className="container">
      <h2>Previous Proposal</h2>
      <h2>Current Proposal <button onClick={getPost} className='refresh'><p>Refresh</p></button></h2> 
      
      
      
      <table className="proposals-table">
        <thead>
          <tr>
            <th>Proposal Title</th>
            <th>Amount</th>
            <th>Status</th>

          </tr>
        </thead>
        <tbody>
          {proposals.map((proposal) => (
            <tr key={proposal.description}>
              <td>{proposal.description}</td>
              <td>{proposal.amount}</td>
              <td>{proposal.status}</td>

            </tr>
          ))}
        </tbody>
      </table>
      <table className="proposals-table">
        <thead>
          <tr>
            <th>Description</th>
            <th>Amount</th>
            <th>Vote</th>
          </tr>
        </thead>
        <tbody>
        <tr>              
            <td>{postedMessage}</td>
            <td>{postedValue}</td>
            <td>
              <button onClick={() => addProposal({
            id: proposals.length + 1,
            description: postedMessage,
            amount: postedValue,
            status: 'Passed',
          })
        }>Yes</button>
              <button onClick={() => addProposal({
            id: proposals.length + 1,
            description: postedMessage,
            amount: postedValue,
            status: 'Rejected',
          })
        }>No</button>
            </td>                 
          </tr>          
        </tbody>
      </table>
    </div>
    
    </div>
  );
};

export default Proposals;

//(on) => setNewProposal({ ...newProposal, title: event.target.value })