
import React, { useState } from 'react';
import type { IClient } from './client.models';
import styles from './ClientForm.module.scss';


interface ClientFormProps {
  
  onSubmit: (client: Omit<IClient, 'id' | 'createdAt'>) => void;
}

export const ClientForm: React.FC<ClientFormProps> = ({ onSubmit }) => {
 
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [cpf, setCpf] = useState('');
  const [address, setAddress] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); 

    

    
    onSubmit({ name, email, phone, cpf, address });

   
    setName('');
    setEmail('');
    setPhone('');
    setCpf('');
    setAddress('');
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <h3>Novo Cliente</h3>
      <div className={styles.formGroup}>
        <label htmlFor="name">Nome Completo</label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className={styles.row}>
        <div className={styles.formGroup}>
          <label htmlFor="cpf">CPF</label>
          <input
            id="cpf"
            type="text"
            value={cpf}
            onChange={(e) => setCpf(e.target.value)}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="phone">Telefone (Opcional)</label>
          <input
            id="phone"
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="address">Endereço (Opcional)</label>
        <input
          id="address"
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
      </div>
      <button type="submit" className={styles.submitButton}>
        Salvar Cliente
      </button>
    </form>
  );
};