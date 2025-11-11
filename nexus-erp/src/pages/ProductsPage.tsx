import React from 'react';
import layoutStyles from '../styles/FormPageLayout.module.scss';

import { ProductForm } from '../features/products/ProductForm';
import type { IProduct } from '../features/products/product.models';

const ProductsPage: React.FC = () => {
  
  const handleSaveProduct = (product: Omit<IProduct, '_id' | 'createdAt' | 'updatedAt'>) => {
    console.log('Dados do produto para salvar:', product);
  };

  return (
    <div className={layoutStyles.pageContainer}>
      <div className={layoutStyles.contentWrapper}>
        <h2 className={layoutStyles.title}>Gerenciamento de Produtos</h2>
        <ProductForm onSubmit={handleSaveProduct} />
      </div>
    </div>
  );
};

export default ProductsPage;