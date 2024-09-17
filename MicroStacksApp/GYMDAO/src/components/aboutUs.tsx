import React from 'react';

const AboutUs = () => {
  return (
    <div>
      <div className="container">
        <h1>About Us</h1>
      </div>
      <div className="container">
      <h2>Our Misson</h2>
        <p>
        At WEGYM, we’re not just redefining gym management — we’re using cutting-edge technology to create a revolutionary governance system. Our platform is built on Stacks, a layer that integrates with Bitcoin, providing unmatched security and transparency. By leveraging Stacks, we can bring smart contract functionality to Bitcoin, which is the most secure and time-tested blockchain in existence. This allows us to harness Bitcoin’s decentralization while offering modern features like voting and decision-making capabilities.
        </p>
        <p>
        We’ve chosen Clarity as our programming language, a unique smart contract language that prioritizes predictability and security. Unlike other languages that may be prone to bugs or exploits, Clarity’s design ensures that code is more readable and auditable, reducing risks. By building our DAO with these technologies, we empower our gym members with a platform that operates seamlessly, transparently, and securely — all while being backed by the proven reliability of the Bitcoin network. At WEGYM, technology is at the heart of our mission to give members control over their gym.
        </p>
        <h2>Our Technology</h2>
      </div>
      <div className="container">
      <h2>Meet the Team</h2>
        <ul>
          <li>
            <h3>Thomas Lincoln</h3>
            <p>Project Manager, Client Liason</p>
          </li>
          <li>
            <h3>Eric Martin</h3>
            <p>Lead Developer, Secretary</p>
          </li>
          <li>
            <h3>Rohan Parker</h3>
            <p>Business Analyst, Researcher </p>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default AboutUs;