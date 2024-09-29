// src/components/Layout.tsx

import React from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import { Outlet } from 'react-router-dom';
import styles from '../styles/Layout.module.css';
import Landing from '../pages/Landing';

import { useGlobalState } from "../GlobalState.tsx";


const Layout: React.FC = () => {
  const { state } = useGlobalState();

  return (
<div>
    {state.isLanding ? 
      <Landing />
    :
    <div className={styles.container}>
      <Header />
      <div className={styles.body}>
        <Sidebar />
        <main className={styles.mainContent}>
          <Outlet />
        </main>
      </div>
    </div>
    }
    </div>
  );
};

export default Layout;
