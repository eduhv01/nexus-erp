
import React from 'react';
import styles from './ClientsPage.module.scss';
import { ClientForm } from '../features/clients/ClientForm';
import type { IClient } from '../features/clients/client.models';

<<<<<<< Updated upstream
// (Futuramente, importar a ClientList aqui)
// import { ClientList } from '../features/clients/ClientList';

const ClientsPage: React.FC = () => {
  
  const handleSaveClient = (client: Omit<IClient, 'id' | 'createdAt'>) => {
    console.log('Dados do cliente para salvar:', client);
=======
import { NotificacaoToast } from '../components/common/NotificacaoToast'; 
import { useLocalList } from '../components/common/useLocalList';

const ClientsPage: React.FC = () => {

  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [toastType, setToastType] = useState<'success' | 'error'>('success');
  const { items: clients, add: addClient, removeByKey: removeClientByKey } = useLocalList<
    Omit<IClient, '_id' | 'createdAt' | 'updatedAt'>
  >('clients:list', (c) => String(c.clienteID));

  const handleSaveClient = async (client: Omit<IClient, '_id' | 'createdAt' | 'updatedAt'>) => {
    addClient(client);
    setToastMessage('Cliente salvo com sucesso!');
    setToastType('success');
    return Promise.resolve();
  };
>>>>>>> Stashed changes

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
<<<<<<< Updated upstream
        {  }
        {    }
=======
        <div className={styles.savedList}>
          <h3 className={styles.sectionTitle}>Clientes Salvos</h3>
          {clients.length === 0 ? (
            <p style={{ opacity: 0.7 }}>Nenhum cliente salvo ainda.</p>
          ) : (
            <div>
              {clients.map((c) => (
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
                    onClick={() => removeClientByKey(String(c.clienteID))}
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
>>>>>>> Stashed changes
      </div>
    </div>
  );
  
};

export default ClientsPage;