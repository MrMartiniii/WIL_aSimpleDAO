import React from 'react';
import stacksLogo from '../assets/stacks-logo.png';

const Governance = () => {
  return (
    <div>
      <div className="container">
      <img src={stacksLogo} alt="Stacks Logo" className='stacksLogo'/>
        <h1>Governance</h1>
        <h2>Introduction to Stacks</h2>
        <p>
          Stacks is a decentralized blockchain network that enables the creation of decentralized applications (dApps) and smart contracts on the Bitcoin blockchain.
        </p>
      </div>

      <div className="container">
      <p>
          The Stacks Governance Forum is a platform for the community to discuss and propose changes to the Stacks network. Here are the links to the Stacks Forum, GitHub, and Discord Server.
        </p>
      <h2>Governance Forum</h2>
        <ul>
          <li><a href="https://forum.stacks.org/c/Working-Groups/governance/">Stacks Forum: Governance Working Group</a></li>
          <li><a href="https://github.com/stacksgov/pm/labels/mtg-agenda">Stacks GitHub</a></li>
          <li><a href="https://discordapp.com/invite/ny6wGkx">Stacks Discord Server</a></li>
        </ul>


      </div>

      <div className="container">
        <h2>Governance Process of the DAO</h2>
        <p>
          The Stacks Governance Process is a community-driven initiative that enables the community to propose, discuss, and vote on changes to the Stacks network. The process involves:
        </p>
        <ol>
          <li>Proposal submission: Gym members can submit proposals for changes to the WeGym DAO.</li>
          <li>Voting: The community votes on the proposal on the Proposals page</li>
          <li>Implementation: If the proposal is succcessful, it is implemented by the WeGym smart contract.</li>
        </ol>
      </div>
    </div>
  );
};

export default Governance;