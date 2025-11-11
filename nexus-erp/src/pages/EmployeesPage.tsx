import React from 'react';
import layoutStyles from '../styles/formPageLayout.module.scss'; 

import { EmployeeForm } from '../features/employees/EmployeeForm';
import type { IEmployee } from '../features/employees/employees.models';

const EmployeesPage: React.FC = () => {
  
  const handleSaveEmployee = (employee: Omit<IEmployee, '_id' | 'createdAt' | 'updatedAt'>) => {
    console.log('Dados do funcionário para salvar:', employee);
  };

  return (
    <div className={layoutStyles.pageContainer}>
      <div className={layoutStyles.contentWrapper}>
        <h2 className={layoutStyles.title}>Gerenciamento de Funcionários</h2>
        <EmployeeForm onSubmit={handleSaveEmployee} />
      </div>
    </div>
  );
};

export default EmployeesPage;