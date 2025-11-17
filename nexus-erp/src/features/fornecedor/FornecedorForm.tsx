import React, { useState } from 'react';
import type { IFornecedor } from './fornecedor.models';
import styles from './FornecedorForm.module.scss'; 
import { FiHash, FiFileText, FiPhone, FiMapPin, FiTruck, FiGlobe } from 'react-icons/fi';

interface FornecedorFormProps {
  onSubmit: (fornecedor: Omit<IFornecedor, '_id' | 'createdAt' | 'updatedAt'>) => Promise<void>;
}

export const FornecedorForm: React.FC<FornecedorFormProps> = ({ onSubmit }) => {
 
  const [nome, setNome] = useState('');
  const [fornecedorID, setFornecedorID] = useState(0);
  const [cnpj, setCnpj] = useState('');
  const [razaoSocial, setRazaoSocial] = useState('');
  const [contato, setContato] = useState('');
  const [cidade, setCidade] = useState('');
  const [numero, setNumero] = useState('');

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); 
    setIsLoading(true);
    setError(null);
    
    try {
      await onSubmit({ nome, fornecedorID, cnpj, razaoSocial, contato, cidade, numero });
      setNome('');
      setFornecedorID(0);
      setCnpj('');
      setRazaoSocial('');
      setContato('');
      setCidade('');
      setNumero('');
    } catch (apiError: any) {
      setError(apiError.message || "Falha ao salvar fornecedor.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.row}>
        <div className={styles.formGroup}>
          <label htmlFor="nome">Nome (Fantasia)</label>
          <div className={styles.inputWrapper}>
            <FiTruck className={styles.inputIcon} />
            <input
              id="nome"
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              placeholder="Ex: Peças & Cia"
              disabled={isLoading}
              required
            />
          </div>
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="fornecedorID">Código (fornecedorID)</label>
          <div className={styles.inputWrapper}>
            <FiHash className={styles.inputIcon} />
            <input
              id="fornecedorID"
              type="number"
              value={fornecedorID}
              onChange={(e) => setFornecedorID(Number(e.target.value))}
              placeholder="Ex: 501"
              disabled={isLoading}
              required
            />
          </div>
        </div>
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="razaoSocial">Razão Social</label>
        <div className={styles.inputWrapper}>
          <FiFileText className={styles.inputIcon} />
          <input
            id="razaoSocial"
            type="text"
            value={razaoSocial}
            onChange={(e) => setRazaoSocial(e.target.value)}
            placeholder="Ex: Peças de Teste LTDA"
            disabled={isLoading}
            required
          />
        </div>
      </div>
      <div className={styles.row}>
        <div className={styles.formGroup}>
          <label htmlFor="cnpj">CNPJ</label>
          <div className={styles.inputWrapper}>
            <FiFileText className={styles.inputIcon} />
            <input
              id="cnpj"
              type="text"
              value={cnpj}
              onChange={(e) => setCnpj(e.target.value)}
              placeholder="00.000.000/0001-00"
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
          <label htmlFor="cidade">Cidade</label>
          <div className={styles.inputWrapper}>
            <FiGlobe className={styles.inputIcon} />
            <input
              id="cidade"
              type="text"
              value={cidade}
              onChange={(e) => setCidade(e.target.value)}
              placeholder="Ex: Campina Grande"
              disabled={isLoading}
              required
            />
          </div>
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="numero">Número/Complemento</label>
          <div className={styles.inputWrapper}>
            <FiMapPin className={styles.inputIcon} />
            <input
              id="numero"
              type="text"
              value={numero}
              onChange={(e) => setNumero(e.target.value)}
              placeholder="Ex: 123A, S/N"
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
        {isLoading ? <div className={styles.spinner} /> : 'Salvar Fornecedor'}
      </button>

      {error && <div className={styles.errorMessage}>{error}</div>}
    </form>
  );
};