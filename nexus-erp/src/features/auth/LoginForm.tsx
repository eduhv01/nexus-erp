import React, { useState } from 'react';
import styles from './AuthForm.module.scss'; 
import { FiMail, FiLock } from 'react-icons/fi';

interface LoginFormProps {
  onSubmit: (data: any) => Promise<void>;
  isLoading?: boolean;
}

export const LoginForm: React.FC<LoginFormProps> = ({ onSubmit }) => {
 
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); 
    setError(null);
    setIsLoading(true);

    try {
      await onSubmit({ email, senha });
      
    } catch (apiError: any) {
      setError(apiError.message || "Email ou senha inválidos.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      
      <div className={styles.formGroup}>
        <label htmlFor="email">Email</label>
        <div className={styles.inputWrapper}>
          <FiMail className={styles.inputIcon} />
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Digite seu email de login"
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
            placeholder="Digie a sua senha"
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
        {isLoading ? <div className={styles.spinner} /> : 'Entrar'}
      </button>

      {error && <div className={styles.errorMessage}>{error}</div>}
    </form>
  );
};