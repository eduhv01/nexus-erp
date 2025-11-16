import React, { useState } from 'react';
<<<<<<< Updated upstream
import { ProductForm } from '../features/products/ProductForm';
import type { Product } from '../features/products/product.models';
import styles from './ProductsPage.module.scss';

const ProductsPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);

  const handleAddProduct = (product: Omit<Product, 'id'>) => {
    const newProduct: Product = {
      ...product,
      id: Math.random().toString(36).substr(2, 9),
    };
    setProducts([...products, newProduct]);
=======
import layoutStyles from '../styles/FormPageLayout.module.scss';

import { ProductForm } from '../features/products/ProductForm';
import type { IProduct } from '../features/products/product.models';
import { useLocalList } from '../components/common/useLocalList';
import { NotificacaoToast } from '../components/common/NotificacaoToast';

const ProductsPage: React.FC = () => {
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [toastType, setToastType] = useState<'success' | 'error'>('success');
  const { items: products, add: addProduct, removeByKey: removeProduct } = useLocalList<
    Omit<IProduct, '_id' | 'createdAt' | 'updatedAt'>
  >('products:list', (p) => String(p.produtoID));

  const handleSaveProduct = (product: Omit<IProduct, '_id' | 'createdAt' | 'updatedAt'>) => {
    addProduct(product);
    setToastMessage('Produto salvo com sucesso!');
    setToastType('success');
    return Promise.resolve();
>>>>>>> Stashed changes
  };

  const handleCloseToast = () => setToastMessage(null);

  return (
<<<<<<< Updated upstream
    <div className={styles.pageContainer}>
      <div className={styles.contentWrapper}>
          <h2 className={styles.title}>Cadastro de Produtos</h2>
        <ProductForm onSubmit={handleAddProduct} />
        <div className={styles.list}>
          <h3></h3>
          {products.length === 0 ? (
            <p></p>
          ) : (
            <ul>
              {products.map((product) => (
                <li key={product.id} className={styles.item}>
                  <strong>{product.nome}</strong> - {product.descricao} | Preço: R${product.preco.toFixed(2)} | Quantidade: {product.quantidade}
                </li>
              ))}
            </ul>
=======
    <div className={layoutStyles.pageContainer}>
      <div className={layoutStyles.contentWrapper}>
        <h2 className={layoutStyles.title}>Gerenciamento de Produtos</h2>
        <ProductForm onSubmit={handleSaveProduct} />
        <div className={layoutStyles.savedList}>
          <h3 className={layoutStyles.sectionTitle}>Produtos Salvos</h3>
          {products.length === 0 ? (
            <p style={{ opacity: 0.7 }}>Nenhum produto salvo ainda.</p>
          ) : (
            <div>
              {products.map((p) => (
                <div key={p.produtoID} className={layoutStyles.savedCard}>
                  <div className={layoutStyles.kv}>
                    <span className={layoutStyles.kvItem}>
                      <span className={layoutStyles.kvLabel}>Código (produtoID):</span>
                      <span className={layoutStyles.kvValue}>{p.produtoID}</span>
                    </span>
                    <span className={layoutStyles.kvItem}>
                      <span className={layoutStyles.kvLabel}>Nome:</span>
                      <span className={layoutStyles.kvValue}>{p.nome}</span>
                    </span>
                    <span className={layoutStyles.kvItem}>
                      <span className={layoutStyles.kvLabel}>Preço (R$):</span>
                      <span className={layoutStyles.kvValue}>{p.preco.toFixed(2)}</span>
                    </span>
                    <span className={layoutStyles.kvItem}>
                      <span className={layoutStyles.kvLabel}>Estoque:</span>
                      <span className={layoutStyles.kvValue}>{p.estoque}</span>
                    </span>
                  </div>
                  <button
                    onClick={() => removeProduct(String(p.produtoID))}
                    className={layoutStyles.dangerButton}
                    aria-label={`Excluir produto ${p.nome}`}
                  >
                    Excluir
                  </button>
                </div>
              ))}
            </div>
>>>>>>> Stashed changes
          )}
        </div>
      </div>
      {toastMessage && (
        <NotificacaoToast
          message={toastMessage}
          type={toastType}
          onClose={handleCloseToast}
        />
      )}
    </div>
  );
};

export default ProductsPage;