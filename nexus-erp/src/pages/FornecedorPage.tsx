import React, { useState } from 'react';
<<<<<<< Updated upstream
import { FornecedorForm } from '../features/fornecedor/FornecedorForm';
import type { Fornecedor } from '../features/fornecedor/fornecedor.models';
import styles from './FornecedorPage.module.scss';

const FornecedorPage: React.FC = () => {
  const [fornecedores, setFornecedores] = useState<Fornecedor[]>([]);

  const handleAddFornecedor = (fornecedor: Fornecedor) => {
    setFornecedores([...fornecedores, fornecedor]);
=======
import layoutStyles from '../styles/FormPageLayout.module.scss'; 
import { FornecedorForm } from '../features/fornecedor/FornecedorForm';
import type { IFornecedor } from '../features/fornecedor/fornecedor.models';
import { useLocalList } from '../components/common/useLocalList';
import { NotificacaoToast } from '../components/common/NotificacaoToast';

const FornecedorPage: React.FC = () => {
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [toastType, setToastType] = useState<'success' | 'error'>('success');
  const { items: fornecedores, add: addFornecedor, removeByKey: removeFornecedor } = useLocalList<
    Omit<IFornecedor, '_id' | 'createdAt' | 'updatedAt'>
  >('fornecedores:list', (f) => String(f.fornecedorID));

  const handleSaveFornecedor = (fornecedor: Omit<IFornecedor, '_id' | 'createdAt' | 'updatedAt'>) => {
    addFornecedor(fornecedor);
    setToastMessage('Fornecedor salvo com sucesso!');
    setToastType('success');
    return Promise.resolve();
>>>>>>> Stashed changes
  };

  const handleCloseToast = () => setToastMessage(null);

  return (
<<<<<<< Updated upstream
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
=======
    <div className={layoutStyles.pageContainer}>
      <div className={layoutStyles.contentWrapper}>
        <h2 className={layoutStyles.title}>Gerenciamento de Fornecedores</h2>
        <FornecedorForm onSubmit={handleSaveFornecedor} />
        <div className={layoutStyles.savedList}>
          <h3 className={layoutStyles.sectionTitle}>Fornecedores Salvos</h3>
          {fornecedores.length === 0 ? (
            <p style={{ opacity: 0.7 }}>Nenhum fornecedor salvo ainda.</p>
          ) : (
            <div>
              {fornecedores.map((f) => (
                <div key={f.fornecedorID} className={layoutStyles.savedCard}>
                  <div className={layoutStyles.kv}>
                    <span className={layoutStyles.kvItem}>
                      <span className={layoutStyles.kvLabel}>Código (fornecedorID):</span>
                      <span className={layoutStyles.kvValue}>{f.fornecedorID}</span>
                    </span>
                    <span className={layoutStyles.kvItem}>
                      <span className={layoutStyles.kvLabel}>Nome (Fantasia):</span>
                      <span className={layoutStyles.kvValue}>{f.nome}</span>
                    </span>
                    <span className={layoutStyles.kvItem}>
                      <span className={layoutStyles.kvLabel}>Razão Social:</span>
                      <span className={layoutStyles.kvValue}>{f.razaoSocial}</span>
                    </span>
                    <span className={layoutStyles.kvItem}>
                      <span className={layoutStyles.kvLabel}>CNPJ:</span>
                      <span className={layoutStyles.kvValue}>{f.cnpj}</span>
                    </span>
                    <span className={layoutStyles.kvItem}>
                      <span className={layoutStyles.kvLabel}>Contato:</span>
                      <span className={layoutStyles.kvValue}>{f.contato}</span>
                    </span>
                    <span className={layoutStyles.kvItem}>
                      <span className={layoutStyles.kvLabel}>Cidade:</span>
                      <span className={layoutStyles.kvValue}>{f.cidade}</span>
                    </span>
                    <span className={layoutStyles.kvItem}>
                      <span className={layoutStyles.kvLabel}>Número/Complemento:</span>
                      <span className={layoutStyles.kvValue}>{f.numero}</span>
                    </span>
                  </div>
                  <button
                    onClick={() => removeFornecedor(String(f.fornecedorID))}
                    className={layoutStyles.dangerButton}
                    aria-label={`Excluir fornecedor ${f.nome}`}
                  >
                    Excluir
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
>>>>>>> Stashed changes
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

export default FornecedorPage;