import React, { useState, useEffect } from 'react';
import { useAuth } from '@micro-stacks/react';
import { callReadOnlyFunction } from 'micro-stacks/transactions';
import { StacksMocknet } from 'micro-stacks/network';
import '../App.css';

interface Proposal {
  id: number;
  title: string;
  description: string;
  votes: number;
  status: string;
}

const Proposals = () => {
  const [proposals, setProposals] = useState<Proposal[]>([]);
  const { stxAddress } = useAuth();

  useEffect(() => {
    const fetchProposals = async () => {
      const network = new StacksMocknet();
      const result = await callReadOnlyFunction({
        contractAddress: 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM',
        contractName: 'CreatePolicy',
        functionName: 'get-proposals',
        functionArgs: [],
        network,
      });
      const proposals = result.value.data.map((proposal: any) => ({
        id: proposal.id,
        title: proposal.title,
        description: proposal.description,
        votes: proposal.votes,
        status: proposal.status,
      }));
      setProposals(proposals);
    };
    fetchProposals();
  }, [stxAddress]);

  return (
    <div className='container'>
      <h1>Proposals</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Description</th>
            <th>Votes</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {proposals.map((proposal) => (
            <tr key={proposal.id}>
              <td>{proposal.id}</td>
              <td>{proposal.title}</td>
              <td>{proposal.description}</td>
              <td>{proposal.votes}</td>
              <td>{proposal.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Proposals;