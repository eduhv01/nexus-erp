import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import styles from "./MainLayout.module.scss";

const MainLayout: React.FC = () => {
    return (
        <div className={styles.layout}>
            <Sidebar />
            <main className={styles.content}>
                <Outlet />
            </main>
        </div>
    );
};
export default MainLayout;