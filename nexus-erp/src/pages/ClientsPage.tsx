
import React from 'react';
import styles from './ClientsPage.module.scss';
import { ClientForm } from '../features/clients/ClientForm';
import type { IClient } from '../features/clients/client.models';

// (Futuramente, importar a ClientList aqui)
// import { ClientList } from '../features/clients/ClientList';

const ClientsPage: React.FC = () => {
  
  const handleSaveClient = (client: Omit<IClient, 'id' | 'createdAt'>) => {
    console.log('Dados do cliente para salvar:', client);

    //PRÓXIMOS PASSOS 
    
    // 1. Chamar o Redux 
    // 2. O Redux vai chamar o nosso 'clientService'
    // 3. O clientService vai fazer o POST para o backend
    // 4. O backend vai salvar no MongoDB
  };

  return (
    <div className={styles.pageContainer}>
      <div className={styles.contentWrapper}>
        <h2 className={styles.title}>Cadastro de Clientes</h2>
        {/* 1. O Formulário de Cadastro */}
        <ClientForm onSubmit={handleSaveClient} />
        {  }
        {    }
      </div>
    </div>
  );
  
};

export default ClientsPage;