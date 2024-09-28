// src/components/Layout.tsx

import React from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import { Outlet } from 'react-router-dom';
import styles from '../styles/Layout.module.css';

const Layout: React.FC = () => {
  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.body}>
        <Sidebar />
        <main className={styles.mainContent}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
