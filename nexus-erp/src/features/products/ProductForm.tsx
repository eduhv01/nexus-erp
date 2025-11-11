import React, { useState } from 'react';
import type { IProduct } from './product.models';
import styles from './ProductForm.module.scss'; 
import { FiPackage, FiDollarSign, FiHash, FiClipboard } from 'react-icons/fi';

interface ProductFormProps {
  onSubmit: (product: Omit<IProduct, '_id' | 'createdAt' | 'updatedAt'>) => Promise<void>;
}

export const ProductForm: React.FC<ProductFormProps> = ({ onSubmit }) => {
 
  const [nome, setNome] = useState('');
  const [produtoID, setProdutoID] = useState(0);
  const [preco, setPreco] = useState(0);
  const [estoque, setEstoque] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); 
    setIsLoading(true);
    setError(null);
    try {
      await onSubmit({ nome, produtoID, preco, estoque });
      setNome('');
      setProdutoID(0);
      setPreco(0);
      setEstoque(0);
    } catch (apiError: any) {
      setError(apiError.message || "Falha ao salvar produto.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.row}>
        <div className={styles.formGroup}>
          <label htmlFor="nome">Nome do Produto</label>
          <div className={styles.inputWrapper}>
            <FiPackage className={styles.inputIcon} />
            <input
              id="nome"
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              placeholder="Ex: Smartphone Nexus 10"
              disabled={isLoading}
              required
            />
          </div>
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="produtoID">Código (produtoID)</label>
          <div className={styles.inputWrapper}>
            <FiHash className={styles.inputIcon} />
            <input
              id="produtoID"
              type="number"
              value={produtoID}
              onChange={(e) => setProdutoID(Number(e.target.value))}
              placeholder="Ex: 1001"
              disabled={isLoading}
              required
            />
          </div>
        </div>
      </div>
      <div className={styles.row}>
        <div className={styles.formGroup}>
          <label htmlFor="preco">Preço (R$)</label>
          <div className={styles.inputWrapper}>
            <FiDollarSign className={styles.inputIcon} />
            <input
              id="preco"
              type="number"
              step="0.01"
              value={preco}
              onChange={(e) => setPreco(Number(e.target.value))}
              placeholder="Ex: 150.00"
              disabled={isLoading}
              required
            />
          </div>
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="estoque">Estoque (Unid.)</label>
          <div className={styles.inputWrapper}>
            <FiClipboard className={styles.inputIcon} />
            <input
              id="estoque"
              type="number"
              value={estoque}
              onChange={(e) => setEstoque(Number(e.target.value))}
              placeholder="Ex: 50"
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
        {isLoading ? <div className={styles.spinner} /> : 'Salvar Produto'}
      </button>

      {error && <div className={styles.errorMessage}>{error}</div>}
    </form>
  );
};