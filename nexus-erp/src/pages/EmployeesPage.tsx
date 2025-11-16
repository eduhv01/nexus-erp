import React, { useState } from 'react';
<<<<<<< Updated upstream
import { EmployeesForm } from '../features/employees/EmployeesForm';
import type { Employees } from '../features/employees/employees.models';
import styles from './EmployeesPage.module.scss';

const EmployeesPage: React.FC = () => {
  const [employees, setEmployees] = useState<Employees[]>([]);

  const handleAddEmployee = (employee: Employees) => {
    setEmployees([...employees, employee]);
=======
import layoutStyles from '../styles/formPageLayout.module.scss'; 

import { EmployeeForm } from '../features/employees/EmployeeForm';
import type { IEmployee } from '../features/employees/employees.models';
import { useLocalList } from '../components/common/useLocalList';
import { NotificacaoToast } from '../components/common/NotificacaoToast';

const EmployeesPage: React.FC = () => {
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [toastType, setToastType] = useState<'success' | 'error'>('success');
  const { items: employees, add: addEmployee, removeByKey: removeEmployee } = useLocalList<
    Omit<IEmployee, '_id' | 'createdAt' | 'updatedAt'>
  >('employees:list', (e) => String(e.funcionarioID));

  const handleSaveEmployee = (employee: Omit<IEmployee, '_id' | 'createdAt' | 'updatedAt'>) => {
    addEmployee(employee);
    setToastMessage('Funcionário salvo com sucesso!');
    setToastType('success');
    return Promise.resolve();
>>>>>>> Stashed changes
  };

  const handleCloseToast = () => setToastMessage(null);

  return (
<<<<<<< Updated upstream
    <div className={styles.pageContainer}>
      <div className={styles.contentWrapper}>
        <h2 className={styles.title}>Cadastro de Funcionários</h2>
        <EmployeesForm onSubmit={handleAddEmployee} />
        <div className={styles.list}>
          <h3>Lista de Funcionários</h3>
          {employees.length === 0 ? (
            <p>Nenhum funcionário cadastrado.</p>
          ) : (
            <ul>
              {employees.map((employee) => (
                <li key={employee.id} className={styles.item}>
                  <strong>{employee.name}</strong> - {employee.email} | Cargo: {employee.cargo} | Contato: {employee.phone}
                </li>
              ))}
            </ul>
=======
    <div className={layoutStyles.pageContainer}>
      <div className={layoutStyles.contentWrapper}>
        <h2 className={layoutStyles.title}>Gerenciamento de Funcionários</h2>
        <EmployeeForm onSubmit={handleSaveEmployee} />
        <div className={layoutStyles.savedList}>
          <h3 className={layoutStyles.sectionTitle}>Funcionários Salvos</h3>
          {employees.length === 0 ? (
            <p style={{ opacity: 0.7 }}>Nenhum funcionário salvo ainda.</p>
          ) : (
            <div>
              {employees.map((e) => (
                <div key={e.funcionarioID} className={layoutStyles.savedCard}>
                  <div className={layoutStyles.kv}>
                    <span className={layoutStyles.kvItem}>
                      <span className={layoutStyles.kvLabel}>Código (funcionarioID):</span>
                      <span className={layoutStyles.kvValue}>{e.funcionarioID}</span>
                    </span>
                    <span className={layoutStyles.kvItem}>
                      <span className={layoutStyles.kvLabel}>Nome:</span>
                      <span className={layoutStyles.kvValue}>{e.nome}</span>
                    </span>
                    <span className={layoutStyles.kvItem}>
                      <span className={layoutStyles.kvLabel}>Email:</span>
                      <span className={layoutStyles.kvValue}>{e.email}</span>
                    </span>
                    <span className={layoutStyles.kvItem}>
                      <span className={layoutStyles.kvLabel}>Cargo:</span>
                      <span className={layoutStyles.kvValue}>{e.cargo}</span>
                    </span>
                    <span className={layoutStyles.kvItem}>
                      <span className={layoutStyles.kvLabel}>Contato:</span>
                      <span className={layoutStyles.kvValue}>{e.contato}</span>
                    </span>
                  </div>
                  <button
                    onClick={() => removeEmployee(String(e.funcionarioID))}
                    className={layoutStyles.dangerButton}
                    aria-label={`Excluir funcionário ${e.nome}`}
                  >
                    Excluir
                  </button>
                </div>
              ))}
            </div>
>>>>>>> Stashed changes
          )}
        </div>
      </div>
      {toastMessage && (
        <NotificacaoToast
          message={toastMessage}
          type={toastType}
          onClose={handleCloseToast}
        />
      )}
    </div>
  );
};

export default EmployeesPage;