// src/components/Header.tsx
import React from 'react';
import styles from '../styles/Dashboard.module.css';
import { useGlobalState } from '../GlobalState.tsx';


const Header: React.FC = () => {
  const { state, updateState } = useGlobalState();

  return (
    <header className={styles.header}>
      <h1>Dashboard</h1>
      <button onClick={() => updateState({ count: state.count + 1 })}>Current global state is {state.count}</button>
    </header>
  );
};

export default Header;
