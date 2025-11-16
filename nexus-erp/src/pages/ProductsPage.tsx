import React, { useState } from 'react';
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
  };

  const handleCloseToast = () => setToastMessage(null);

  return (
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