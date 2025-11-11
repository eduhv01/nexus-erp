import React, { useState } from 'react';
import type { Product } from './product.models';
import styles from './ProductForm.module.scss';

interface ProductFormProps {
  onSubmit: (product: Omit<Product, 'id'>) => void;
}

export const ProductForm: React.FC<ProductFormProps> = ({ onSubmit }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState<number | ''>('');
  const [quantity, setQuantity] = useState<number | ''>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && description && price !== '' && quantity !== '') {
     
      onSubmit({
        nome: name,
        descricao: description,
        preco: Number(price),
        quantidade: Number(quantity),
      } as unknown as Omit<Product, 'id'>);
      setName('');
      setDescription('');
      setPrice('');
      setQuantity('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <h3></h3>
      <div className={styles.formGroup}>
        <label htmlFor="name">Nome do Produto</label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="description">Descrição</label>
        <input
          id="description"
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>
      <div className={styles.row}>
        <div className={styles.formGroup}>
          <label htmlFor="price">Preço</label>
          <input
            id="price"
            type="number"
            min="0"
            step="0.01"
            value={price}
            onChange={(e) => setPrice(e.target.value === '' ? '' : Number(e.target.value))}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="quantity">Quantidade</label>
          <input
            id="quantity"
            type="number"
            min="0"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value === '' ? '' : Number(e.target.value))}
            required
          />
        </div>
      </div>
      <button type="submit" className={styles.submitButton}>
        Salvar Produto
      </button>
    </form>
  );
}
