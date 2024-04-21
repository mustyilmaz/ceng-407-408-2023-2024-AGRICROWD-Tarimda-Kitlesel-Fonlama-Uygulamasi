import React from 'react';
import styles from './UserHome.module.css'; 

const UserHome = () => {
  

  return (
    <div className={styles.homeContainer}>
      <h1>Welcome to Your Dashboard</h1>
      <p>Here you can manage your projects, account settings, and more.</p>
      
    </div>
  );
};

export default UserHome;