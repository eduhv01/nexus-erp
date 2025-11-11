import React from 'react';
import layoutStyles from '../styles/FormPageLayout.module.scss'; 

const DashboardPage: React.FC = () => {
  return (
    <div className={layoutStyles.pageContainer}>
      <div className={layoutStyles.contentWrapper}>
        <h2 className={layoutStyles.title}>Dashboard Principal</h2>
        <p>Bem-vindo ao Nexus ERP. Aqui ficarão seus gráficos e atalhos.</p>
      </div>
    </div>
  );
};

export default DashboardPage;