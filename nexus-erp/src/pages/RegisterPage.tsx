import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import layoutStyles from '../styles/FormPageLayout.module.scss'; 
import { RegisterForm } from '../features/auth/RegisterForm'; 
import { NotificacaoToast } from '../components/common/NotificacaoToast';
import authStyles from '../features/auth/AuthForm.module.scss'; 

const RegisterPage: React.FC = () => {
  const navigate = useNavigate(); 
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleRegisterSubmit = async (data: any) => {
    console.log('Dados de Registro:', data);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setToastMessage("Registro bem-sucedido! Faça o login.");

      setTimeout(() => {
        navigate('/login');
      }, 2000); 

    } catch (error: any) {
      console.error("Erro no registro:", error);
      throw new Error(error.message || "Falha ao registrar. Tente novamente.");
    }
  };

  return (
    <div className={layoutStyles.pageContainer}>
      <div className={layoutStyles.contentWrapper}>
        <h2 className={layoutStyles.title}>Criar Nova Conta</h2>
        
        <RegisterForm onSubmit={handleRegisterSubmit} />

        <div className={authStyles.switchFormLink}>
          <p>
            Já tem uma conta? <Link to="/login">Faça o login</Link>
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

export default RegisterPage;