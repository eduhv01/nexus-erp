import React, { useState } from 'react';
import { FornecedorForm } from '../features/fornecedor/FornecedorForm';
import type { Fornecedor } from '../features/fornecedor/fornecedor.models';
import styles from './FornecedorPage.module.scss';

const FornecedorPage: React.FC = () => {
  const [fornecedores, setFornecedores] = useState<Fornecedor[]>([]);

  const handleAddFornecedor = (fornecedor: Fornecedor) => {
    setFornecedores([...fornecedores, fornecedor]);
  };

  return (
    <div className={styles.pageContainer}>
      <div className={styles.contentWrapper}>
        <h2 className={styles.title}>Cadastro de Fornecedores</h2>
        <FornecedorForm onSubmit={handleAddFornecedor} />
        {fornecedores.length > 0 && (
          <div className={styles.list}>
            <h3>Lista de Fornecedores</h3>
            <ul>
              {fornecedores.map((fornecedor) => (
                <li key={fornecedor.id} className={styles.item}>
                  <strong>{fornecedor.nome}</strong> - {fornecedor.razaoSocial} | CNPJ: {fornecedor.cnpj} | {fornecedor.cidade}/{fornecedor.uf}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default FornecedorPage;