// src/pages/LoginPage.tsx
import React, { useState } from 'react'; 
import { Link, useNavigate } from 'react-router-dom'; 
import layoutStyles from '../styles/FormPageLayout.module.scss'; 
import { LoginForm } from '../features/auth/LoginForm'; 
import authStyles from '../features/auth/AuthForm.module.scss'; 
import { NotificacaoToast } from '../components/common/NotificacaoToast'; 

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleLoginSubmit = async (data: any) => {
    console.log('Dados de Login:', data);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000)); 
      
      setToastMessage("Login bem-sucedido! Redirecionando...");

      setTimeout(() => {
        navigate('/'); 
      }, 2000); 

    } catch (error: any) {
      console.error("Erro no login:", error);
      throw new Error(error.message || "Credenciais inválidas. Tente novamente.");
    }
  };

  return (
    <div className={layoutStyles.pageContainer}>
      <div className={layoutStyles.contentWrapper}>
        <h2 className={layoutStyles.title}>Nexus ERP</h2>
        <LoginForm onSubmit={handleLoginSubmit} />
        <div className={authStyles.switchFormLink}>
          <p>
            Não tem uma conta? <Link to="/register">Registre-se aqui</Link>
          </p>
        </div>
      </div>

      {toastMessage && (
        <NotificacaoToast
          message={toastMessage}
          type="success"
          onClose={() => setToastMessage(null)} 
        />
      )}
    </div>
  );
};

export default LoginPage;