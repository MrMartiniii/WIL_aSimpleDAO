import { FC, ReactElement } from "react";
import reactLogo from './assets/react.svg';
import './App.css';
import dropDown from './components/dropdown-list';

import * as MicroStacks from '@micro-stacks/react';
import { WalletConnectButton } from './components/wallet-connect-button';
import { UserCard } from './components/user-card';
import { Logo } from './components/ustx-logo';
import { useState } from 'react';

interface ModalProps {
    open: boolean;
    onClose: () => void;
    children: ReactElement;
  }
  
  export default function Modal(props: ModalProps): ReturnType<FC> {
    return (
      <div
        className={`${"modal"} ${props.open ? "display-block" : "display-none"}`}
      >
        <div className="modal-main">
          <div className="modal-head">
            <h1>Modal</h1>
          </div>
          <div>
      <header className='header'>
      <UserCard />
      <WalletConnectButton />
      </header>
    </div>
          <div className="modal-body">{props.children}</div>
          <div className="btn-container">
            <button type="button" className="btn" onClick={props.onClose}>
              Close
            </button>
          </div>
        </div>
      </div>
    );
  }