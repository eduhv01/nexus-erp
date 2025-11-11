import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom"; 
import styles from './Sidebar.module.scss';

const Sidebar: React.FC = () => {

    const navigate = useNavigate();

    const handleLogout = () => {

      console.log("Usuário deslogado!");
      
      navigate('/login');
    };

    return (
        <nav className={styles.sidebar}>
            <div>
              <Link to="/" className={styles.logo}>
                <h3> Nexus ERP</h3>
              </Link>
              
              <ul>
                  <li>
                    <NavLink 
                      to="/" 
                      className={({ isActive }) => isActive ? styles.active : ''}
                    >
                      Dashboard
                    </NavLink>
                  </li>
                  <li>
                    <NavLink 
                      to="/clientes" 
                      className={({ isActive }) => isActive ? styles.active : ''}
                    >
                      Clientes
                    </NavLink>
                  </li>
                  <li>
                    <NavLink 
                      to="/produtos" 
                      className={({ isActive }) => isActive ? styles.active : ''}
                    >
                      Produtos
                    </NavLink>
                  </li>
                  <li>
                    <NavLink 
                      to="/funcionarios" 
                      className={({ isActive }) => isActive ? styles.active : ''}
                    >
                      Funcionários
                    </NavLink>
                  </li>
                  <li>
                    <NavLink 
                      to="/fornecedores" 
                      className={({ isActive }) => isActive ? styles.active : ''}
                    >
                      Fornecedor
                    </NavLink>
                  </li>
              </ul>
            </div>

            <div className={styles.sidebarFooter}>
                <button className={styles.logoutButton} onClick={handleLogout}>
                   <span>Sair</span>
                </button>
            </div>
        </nav>
    );
};

export default Sidebar;