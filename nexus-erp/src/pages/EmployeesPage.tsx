import React, { useState } from 'react';
import { EmployeesForm } from '../features/employees/EmployeesForm';
import type { Employees } from '../features/employees/employees.models';
import styles from './EmployeesPage.module.scss';

const EmployeesPage: React.FC = () => {
  const [employees, setEmployees] = useState<Employees[]>([]);

  const handleAddEmployee = (employee: Employees) => {
    setEmployees([...employees, employee]);
  };

  return (
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
          )}
        </div>
      </div>
    </div>
  );
};

export default EmployeesPage;