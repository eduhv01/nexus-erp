import React, { useState } from 'react';
import layoutStyles from '../styles/FormPageLayout.module.scss'; 
import { FornecedorForm } from '../features/fornecedor/FornecedorForm';
import type { IFornecedor } from '../features/fornecedor/fornecedor.models';
import { NotificacaoToast } from '../components/common/NotificacaoToast';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { addFornecedor, deleteFornecedor } from '../store/slices/fornecedoresSlice';

const FornecedorPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const fornecedores = useAppSelector((state) => state.fornecedores.items);

  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [toastType, setToastType] = useState<'success' | 'error'>('success');

  const handleSaveFornecedor = (fornecedor: Omit<IFornecedor, '_id' | 'createdAt' | 'updatedAt'>) => {
    dispatch(addFornecedor(fornecedor));
    setToastMessage('Fornecedor salvo com sucesso!');
    setToastType('success');
    return Promise.resolve();
  };

  const handleCloseToast = () => setToastMessage(null);

  return (
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
              {fornecedores.map((f: Omit<IFornecedor, '_id' | 'createdAt' | 'updatedAt'>) => (
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
                    onClick={() => dispatch(deleteFornecedor(f.fornecedorID))}
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