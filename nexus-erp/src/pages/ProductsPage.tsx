import React, { useState } from 'react';
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
  };

  return (
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
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;