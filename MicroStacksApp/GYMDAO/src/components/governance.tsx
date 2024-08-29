import React, { useState, useEffect } from 'react';
import { useAuth } from '@micro-stacks/react';
import { callReadOnlyFunction } from 'micro-stacks/transactions';
import { StacksMocknet } from 'micro-stacks/network';

interface GovernanceData {
  totalVotes: number;
  totalProposals: number;
  totalMembers: number;
}

const Governance = () => {
  const [governanceData, setGovernanceData] = useState<GovernanceData | null>(null);
  const { stxAddress } = useAuth();

  useEffect(() => {
    const fetchGovernanceData = async () => {
      const network = new StacksMocknet();
      const result = await callReadOnlyFunction({
        contractAddress: 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM',
        contractName: 'CreatePolicy',
        functionName: 'get-governance-data',
        functionArgs: [],
        network,
      });
      const governanceData = result.value.data;
      setGovernanceData(governanceData);
    };
    fetchGovernanceData();
  }, [stxAddress]);

  return (
    <div>
      <h1>Governance</h1>
      {governanceData ? (
        <div>
          <p>Total Votes: {governanceData.totalVotes}</p>
          <p>Total Proposals: {governanceData.totalProposals}</p>
          <p>Total Members: {governanceData.totalMembers}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Governance;