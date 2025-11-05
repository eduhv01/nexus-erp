import React from "react";
import { Link } from "react-router-dom";
import styles from './Sidebar.module.scss';

const Sidebar: React.FC = () => {
    return (
        <nav className={styles.sidebar}>
            <h3> Nexus ERP</h3>
            <ul>
                <li><Link to="/">Dashboard</Link></li>
                <li><Link to="/clientes">Clientes</Link></li>
                <li><Link to="/produtos">Produtos</Link></li>
                <li><Link to="/funcionarios">Funcionários</Link></li>
                <li><Link to="/agenda">Agenda</Link></li>
            </ul>
        </nav>
    );
};

export default Sidebar;