// src/features/auth/RegisterForm.tsx
import React, { useState } from 'react';
import styles from './AuthForm.module.scss'; 
import { FiUser, FiMail, FiLock } from 'react-icons/fi';

interface RegisterFormProps {
  onSubmit: (data: any) => Promise<void>; 
}

export const RegisterForm: React.FC<RegisterFormProps> = ({ onSubmit }) => {
 
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); 
    setError(null);

    if (senha !== confirmarSenha) {
      setError('As senhas não conferem.');
      return;
    }

    setIsLoading(true);

    try {
      await onSubmit({ nome, email, senha });
    } catch (apiError: any) {
      setError(apiError.message || "Falha ao registrar. Tente outro email.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      
      <div className={styles.formGroup}>
        <label htmlFor="name">Nome Completo</label>
        <div className={styles.inputWrapper}>
          <FiUser className={styles.inputIcon} />
          <input
            id="name"
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            placeholder="Nome Completo"
            disabled={isLoading}
            required
          />
        </div>
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="email">Email</label>
        <div className={styles.inputWrapper}>
          <FiMail className={styles.inputIcon} />
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Digite seu email"
            disabled={isLoading}
            required
          />
        </div>
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="senha">Senha</label>
        <div className={styles.inputWrapper}>
          <FiLock className={styles.inputIcon} />
          <input
            id="senha"
            type="password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            placeholder="Digite uma Senha"
            disabled={isLoading}
            required
          />
        </div>
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="confirmarSenha">Confirmar Senha</label>
        <div className={styles.inputWrapper}>
          <FiLock className={styles.inputIcon} />
          <input
            id="confirmarSenha"
            type="password"
            value={confirmarSenha}
            onChange={(e) => setConfirmarSenha(e.target.value)}
            placeholder="Repita a senha"
            disabled={isLoading}
            required
          />
        </div>
      </div>
      
      <button 
        type="submit" 
        className={styles.submitButton}
        disabled={isLoading}
      >
        {isLoading ? <div className={styles.spinner} /> : 'Criar Conta'}
      </button>

      {error && <div className={styles.errorMessage}>{error}</div>}
    </form>
  );
};