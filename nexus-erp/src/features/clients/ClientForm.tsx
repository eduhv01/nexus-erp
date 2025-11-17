import React, { useState } from 'react';
import type { IClient } from './client.models'; 
import styles from './ClientForm.module.scss'; 
import { FiUser, FiHash, FiMail, FiPhone, FiMapPin, FiGlobe } from 'react-icons/fi';

interface ClientFormProps {
  onSubmit: (client: Omit<IClient, '_id' | 'createdAt' | 'updatedAt'>) => Promise<void>;
}

export const ClientForm: React.FC<ClientFormProps> = ({ onSubmit }) => {
 
  const [nome, setNome] = useState('');
  const [clienteID, setClienteID] = useState(0); 
  const [email, setEmail] = useState('');
  const [contato, setContato] = useState(''); 
  const [endereco, setEndereco] = useState(''); 
  const [cidade, setCidade] = useState(''); 

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); 
    setIsLoading(true);
    setError(null);
    try {
      await onSubmit({ nome, clienteID, email, contato, endereco, cidade });
      setNome('');
      setClienteID(0);
      setEmail('');
      setContato('');
      setEndereco('');
      setCidade('');
    } catch (apiError: any) {
      setError(apiError.message || "Falha ao salvar cliente.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>

      <div className={styles.row}>
        <div className={styles.formGroup}>
          <label htmlFor="nome">Nome Completo</label>
          <div className={styles.inputWrapper}>
            <FiUser className={styles.inputIcon} />
            <input
              id="nome"
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              placeholder="Ex: Ana Souza"
              disabled={isLoading}
              required
            />
          </div>
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="clienteID">Código (clienteID)</label>
          <div className={styles.inputWrapper}>
            <FiHash className={styles.inputIcon} />
            <input
              id="clienteID"
              type="number"
              value={clienteID}
              onChange={(e) => setClienteID(Number(e.target.value))}
              placeholder="Ex: 201"
              disabled={isLoading}
              required
            />
          </div>
        </div>
      </div>
      <div className={styles.row}>
        <div className={styles.formGroup}>
          <label htmlFor="email">Email</label>
          <div className={styles.inputWrapper}>
            <FiMail className={styles.inputIcon} />
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="ana.souza@exemplo.com"
              disabled={isLoading}
              required
            />
          </div>
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="contato">Contato (Telefone)</label>
          <div className={styles.inputWrapper}>
            <FiPhone className={styles.inputIcon} />
            <input
              id="contato"
              type="tel"
              value={contato}
              onChange={(e) => setContato(e.target.value)}
              placeholder="(00) 00000-0000"
              disabled={isLoading}
              required
            />
          </div>
        </div>
      </div>
      <div className={styles.row}>
        <div className={styles.formGroup}>
          <label htmlFor="endereco">Endereço Completo</label>
          <div className={styles.inputWrapper}>
            <FiMapPin className={styles.inputIcon} />
            <input
              id="endereco"
              type="text"
              value={endereco}
              onChange={(e) => setEndereco(e.target.value)}
              placeholder="Rua Exemplo, 123 - Bairro"
              disabled={isLoading}
              required
            />
          </div>
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="cidade">Cidade</label>
          <div className={styles.inputWrapper}>
            <FiGlobe className={styles.inputIcon} />
            <input
              id="cidade"
              type="text"
              value={cidade}
              onChange={(e) => setCidade(e.target.value)}
              placeholder="Ex: São Paulo"
              disabled={isLoading}
              required
            />
          </div>
        </div>
      </div>

      <button 
        type="submit" 
        className={styles.submitButton}
        disabled={isLoading}
      >
        {isLoading ? <div className={styles.spinner} /> : 'Salvar Cliente'}
      </button>

      {error && <div className={styles.errorMessage}>{error}</div>}
    </form>
  );
};