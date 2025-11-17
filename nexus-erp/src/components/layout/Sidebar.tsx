import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../features/auth/authSlice';
import type { RootState } from '../../store/store';
import styles from './Sidebar.module.scss';

const Sidebar: React.FC = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user } = useSelector((state: RootState) => state.auth);

    const handleLogout = () => {
      dispatch(logout() as any);
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
                      to="/clients"
                      className={({ isActive }) => isActive ? styles.active : ''}
                    >
                      Clientes
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/products"
                      className={({ isActive }) => isActive ? styles.active : ''}
                    >
                      Produtos
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/employees"
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
                <div className={styles.userInfo}>
                    <p>Olá, {user?.nome || 'Usuário'}!</p>
                </div>
                <button className={styles.logoutButton} onClick={handleLogout}>
                   <span>Sair</span>
                </button>
            </div>
        </nav>
    );
};

export default Sidebar;