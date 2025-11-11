import React, { useState } from 'react';
import type { IEmployee } from './employees.models';
import styles from './EmployeesForm.module.scss'; 

import { FiUser, FiHash, FiMail, FiBriefcase, FiPhone } from 'react-icons/fi';

interface EmployeeFormProps {
  onSubmit: (employee: Omit<IEmployee, '_id' | 'createdAt' | 'updatedAt'>) => Promise<void>;
}

export const EmployeeForm: React.FC<EmployeeFormProps> = ({ onSubmit }) => {
 
  const [nome, setNome] = useState('');
  const [funcionarioID, setFuncionarioID] = useState(0);
  const [email, setEmail] = useState('');
  const [cargo, setCargo] = useState('');
  const [contato, setContato] = useState('');

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); 
    setIsLoading(true);
    setError(null);

    try {
      await onSubmit({ nome, funcionarioID, email, cargo, contato });
      setNome('');
      setFuncionarioID(0);
      setEmail('');
      setCargo('');
      setContato('');
    } catch (apiError: any) {
      setError(apiError.message || "Falha ao salvar funcionário.");
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
              placeholder="Ex: Carla Silva"
              disabled={isLoading}
              required
            />
          </div>
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="funcionarioID">Código (funcionarioID)</label>
          <div className={styles.inputWrapper}>
            <FiHash className={styles.inputIcon} />
            <input
              id="funcionarioID"
              type="number"
              value={funcionarioID}
              onChange={(e) => setFuncionarioID(Number(e.target.value))}
              placeholder="Ex: 101"
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
              placeholder="Ex: carla.silva@nexus.com"
              disabled={isLoading}
              required
            />
          </div>
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="cargo">Cargo</label>
          <div className={styles.inputWrapper}>
            <FiBriefcase className={styles.inputIcon} />
            <input
              id="cargo"
              type="text"
              value={cargo}
              onChange={(e) => setCargo(e.target.value)}
              placeholder="Ex: Analista de RH"
              disabled={isLoading}
              required
            />
          </div>
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
          />
        </div>
      </div>

      <button 
        type="submit" 
        className={styles.submitButton}
        disabled={isLoading}
      >
        {isLoading ? <div className={styles.spinner} /> : 'Salvar Funcionário'}
      </button>
      
      {error && <div className={styles.errorMessage}>{error}</div>}
    </form>
  );
};