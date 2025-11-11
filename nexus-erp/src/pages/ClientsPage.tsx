import React, { useState } from 'react';
import styles from '../styles/FormPageLayout.module.scss';
import { ClientForm } from '../features/clients/ClientForm';
import type { IClient } from '../features/clients/client.models';

import { NotificacaoToast } from '../components/common/NotificacaoToast'; 

const ClientsPage: React.FC = () => {

  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [toastType, setToastType] = useState<'success' | 'error'>('success');
  const handleSaveClient = async (client: Omit<IClient, '_id' | 'createdAt' | 'updatedAt'>) => {
    console.log('Dados do cliente para salvar:', client);
    
    return new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        const success = Math.random() > 0.1;
        if (success) {
          console.log("Cliente salvo com sucesso!");
          setToastMessage("Cliente salvo com sucesso!");
          setToastType('success');
          resolve();
        } else {
          console.error("Falha ao salvar cliente (simulado).");
          setToastMessage("Erro ao salvar cliente. Tente novamente.");
          setToastType('error');
          reject(new Error("Erro interno do servidor."));
        }
      }, 1500);
    });
  };

  const handleCloseToast = () => {
    setToastMessage(null);
  };

  return (
    <div className={styles.pageContainer}>
      <div className={styles.contentWrapper}>
        <h2 className={styles.title}>Cadastro de Clientes</h2>
        
        <ClientForm onSubmit={handleSaveClient} />
        
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