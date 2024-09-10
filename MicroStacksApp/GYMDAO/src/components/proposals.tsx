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

  const [newProposal, setNewProposal] = useState({
    title: '',
    description: '',
  });

  const [post, setPost] = useState('');
  const [postVal, setPostVal] = useState(0);

  const handleMessageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPost(event.target.value);
  };

  const handleValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPostVal(parseInt(event.target.value, 10));
  };

  const handleOpenContractCall = () => {
    // TO DO: implement contract call logic
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const newProposalId = proposals.length + 1;
    const newProposalData: Proposal = {
      id: newProposalId,
      title: newProposal.title,
      description: newProposal.description,
      votes: 0,
      status: 'Active',
    };
    setProposals([...proposals, newProposalData]);
    setNewProposal({ title: '', description: '' });
  };

  return (
    <div>
    <div className="container">
      <h1 className="title">Proposals</h1>
      <header className="header">
      </header>
      <p className="description">Create or vote on a policy</p>
      <details className="collapsible">
        <summary>Create a Policy</summary>
        <p>
          <form action="" id="policyInput" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Description"
              value={newProposal.title}
              onChange={(event) => setNewProposal({ ...newProposal, title: event.target.value })}
            />
            <input
              type="text"
              placeholder="Title"
              value={newProposal.description}
              onChange={(event) => setNewProposal({ ...newProposal, description: event.target.value })}
            />
            <input type="submit" />
          </form>
        </p>
      </details>
      <div className="Vote">
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
    </div>
    </div>
  );
};

export default Proposals;