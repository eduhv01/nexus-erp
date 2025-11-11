import React from 'react';
import layoutStyles from '../styles/FormPageLayout.module.scss'; 
import { FornecedorForm } from '../features/fornecedor/FornecedorForm';
import type { IFornecedor } from '../features/fornecedor/fornecedor.models';

const FornecedorPage: React.FC = () => {
  const handleSaveFornecedor = (fornecedor: Omit<IFornecedor, '_id' | 'createdAt' | 'updatedAt'>) => {
    console.log('Dados do fornecedor para salvar:', fornecedor);
  };

  return (
    <div className={layoutStyles.pageContainer}>
      <div className={layoutStyles.contentWrapper}>
        <h2 className={layoutStyles.title}>Gerenciamento de Fornecedores</h2>
        <FornecedorForm onSubmit={handleSaveFornecedor} />
      </div>
    </div>
  );
};

export default FornecedorPage;