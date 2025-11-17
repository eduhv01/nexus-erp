import React, { useState } from 'react';
import layoutStyles from '../styles/formPageLayout.module.scss'; 

import { EmployeeForm } from '../features/employees/EmployeeForm';
import type { IEmployee } from '../features/employees/employees.models';
import { NotificacaoToast } from '../components/common/NotificacaoToast';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { addEmployee, deleteEmployee } from '../store/slices/employeesSlice';

const EmployeesPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const employees = useAppSelector((state) => state.employees.items);

  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [toastType, setToastType] = useState<'success' | 'error'>('success');

  const handleSaveEmployee = (employee: Omit<IEmployee, '_id' | 'createdAt' | 'updatedAt'>) => {
    dispatch(addEmployee(employee));
    setToastMessage('Funcionário salvo com sucesso!');
    setToastType('success');
    return Promise.resolve();
  };

  const handleCloseToast = () => setToastMessage(null);

  return (
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
              {employees.map((e: Omit<IEmployee, '_id' | 'createdAt' | 'updatedAt'>) => (
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
                    onClick={() => dispatch(deleteEmployee(e.funcionarioID))}
                    className={layoutStyles.dangerButton}
                    aria-label={`Excluir funcionário ${e.nome}`}
                  >
                    Excluir
                  </button>
                </div>
              ))}
            </div>
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