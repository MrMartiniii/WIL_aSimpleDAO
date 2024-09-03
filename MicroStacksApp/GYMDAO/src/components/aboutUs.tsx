import React from 'react';

const AboutUs = () => {
  return (
    <div>
      <div className="container">
        <h1>About Us</h1>
        <p>
          Welcome to GYM DAO, a decentralized autonomous organization built on the Stacks blockchain.
        </p>
        <p>
          Our mission is to create a community-driven platform to build a decentralised gym for its users.
        </p>
        <p>
          Our team is comprised of blockchain enthusiasts dedicated to building a transparent and secure platform.
        </p>
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