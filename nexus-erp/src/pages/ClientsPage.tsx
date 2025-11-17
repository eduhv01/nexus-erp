import React, { useState } from 'react';
import styles from '../styles/FormPageLayout.module.scss';
import { ClientForm } from '../features/clients/ClientForm';
import type { IClient } from '../features/clients/client.models';

import { NotificacaoToast } from '../components/common/NotificacaoToast'; 
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { addClient, deleteClient } from '../store/slices/clientsSlice';

const ClientsPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const clients = useAppSelector((state) => state.clients.items);

  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [toastType, setToastType] = useState<'success' | 'error'>('success');

  const handleSaveClient = async (client: Omit<IClient, '_id' | 'createdAt' | 'updatedAt'>) => {
    dispatch(addClient(client));
    setToastMessage('Cliente salvo com sucesso!');
    setToastType('success');
    return Promise.resolve();
  };

  const handleCloseToast = () => {
    setToastMessage(null);
  };

  return (
    <div className={styles.pageContainer}>
      <div className={styles.contentWrapper}>
        <h2 className={styles.title}>Cadastro de Clientes</h2>
        
        <ClientForm onSubmit={handleSaveClient} />
        <div className={styles.savedList}>
          <h3 className={styles.sectionTitle}>Clientes Salvos</h3>
          {clients.length === 0 ? (
            <p style={{ opacity: 0.7 }}>Nenhum cliente salvo ainda.</p>
          ) : (
            <div>
              {clients.map((c: Omit<IClient, '_id' | 'createdAt' | 'updatedAt'>) => (
                <div key={c.clienteID} className={styles.savedCard}>
                  <div className={styles.kv}>
                    <span className={styles.kvItem}>
                      <span className={styles.kvLabel}>Código (clienteID):</span>
                      <span className={styles.kvValue}>{c.clienteID}</span>
                    </span>
                    <span className={styles.kvItem}>
                      <span className={styles.kvLabel}>Nome:</span>
                      <span className={styles.kvValue}>{c.nome}</span>
                    </span>
                    <span className={styles.kvItem}>
                      <span className={styles.kvLabel}>Email:</span>
                      <span className={styles.kvValue}>{c.email}</span>
                    </span>
                    <span className={styles.kvItem}>
                      <span className={styles.kvLabel}>Contato:</span>
                      <span className={styles.kvValue}>{c.contato}</span>
                    </span>
                    <span className={styles.kvItem}>
                      <span className={styles.kvLabel}>Endereço:</span>
                      <span className={styles.kvValue}>{c.endereco}</span>
                    </span>
                    <span className={styles.kvItem}>
                      <span className={styles.kvLabel}>Cidade:</span>
                      <span className={styles.kvValue}>{c.cidade}</span>
                    </span>
                  </div>
                  <button
                    onClick={() => dispatch(deleteClient(c.clienteID))}
                    className={styles.dangerButton}
                    aria-label={`Excluir cliente ${c.nome}`}
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

export default ClientsPage;