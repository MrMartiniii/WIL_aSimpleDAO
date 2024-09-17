import React, { FC, SetStateAction, useCallback, useState, useEffect } from 'react';
import { useAuth } from '@micro-stacks/react';
import { FungibleConditionCode, makeStandardSTXPostCondition, callReadOnlyFunction } from 'micro-stacks/transactions';
import { StacksMocknet } from 'micro-stacks/network';
import '../App.css';
import { useOpenContractCall } from '@micro-stacks/react';
import { intCV, standardPrincipalCV, stringUtf8CV } from 'micro-stacks/clarity';
import {useInterval} from 'react-use';

import * as MicroStacks from '@micro-stacks/react';

interface Proposal {
  id: number;
  title: string;
  description: string;
  votes: number;
  status: string;
}

const Proposals = () => {

  


  const [proposals, setProposals] = useState<Proposal[]>([
    {
      id: 1,
      title: 'Proposal A',
      description: 'This is proposal A',
      votes: 200,
      status: 'Active',
    },
    {
      id: 2,
      title: 'Proposal B',
      description: 'This is proposal B',
      votes: 150,
      status: 'Completed',
    },
    {
      id: 3,
      title: 'Proposal C',
      description: 'This is proposal C',
      votes: 300,
      status: 'Active',
    },
    {
      id: 4,
      title: 'Proposal D',
      description: 'This is proposal D',
      votes: 50,
      status: 'Rejected',
    },
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
  const [contractAddress, setContractAddress] = useState("ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM")

  const handleMessageChange = (e: { target: {value: SetStateAction<string>; }; }) => {
    setPost(e.target.value);
  }
  const handleValueChange = (e: {target: {value: SetStateAction<string>; }; }) => {
    setPostVal(e.target.value);
    console.log(e.target.value)
  }

  const handleOpenContractCall = async () => {
    const functionArgs = [
      stringUtf8CV(post),
      intCV(postVal),
      console.log("Hello")
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
        setPostedMessage(result.value.data)
      }
    }
  }, []);

  return (
    <div>
    <div className="container">
      <h1>Proposals</h1>
      <header className="header">
      </header>
      <p className="description">Create or vote on a policy</p>
      <details className="collapsible">
        <summary>Create a Policy</summary>
          <form action="" id="policyInput" onSubmit={() => handleOpenContractCall()}>
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
              placeholder="Title"
              //value={newProposal.description}
              onChange={((handleValueChange))}
            />
            <input type="submit" />
          </form>
      </details>
      <div className="Vote">
        <h2>Place a Vote</h2>
        <button>Yes</button>
        <button>No</button>
      </div>
    </div>

    <div className="container">
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
          {proposals.map((proposal) => (
            <tr key={proposal.id}>
              <td>{proposal.id}</td>
              <td>{proposal.title}</td>
              <td>{proposal.votes}</td>
              <td>{proposal.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h2>Ongoing Proposals</h2>
    </div>
    </div>
  );
};

export default Proposals;

//(event) => setNewProposal({ ...newProposal, title: event.target.value })