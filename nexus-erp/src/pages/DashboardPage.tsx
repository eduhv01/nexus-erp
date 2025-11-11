import React from "react";
import styles from './DashboardPage.module.scss';
const DashboardPage: React.FC = () => {
    return (
    <div className={styles.container}>
        <h2 className={styles.title}>Dashboard</h2>
        <p className={styles.text}>Bem-vindo ao seu ERP!</p>
    </div>
);
};
export default DashboardPage; 