import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'; 
import { useNavigate } from 'react-router-dom';
import { RegisterForm } from '../features/auth/RegisterForm'; 
import { NotificacaoToast } from '../components/common/NotificacaoToast'; 
import layoutStyles from '../styles/FormPageLayout.module.scss';
import authStyles from '../features/auth/AuthForm.module.scss';

// Ações do Redux e estado
import { register, reset } from '../features/auth/authSlice'; 
import type { RootState } from '../store/store';

const RegisterPage: React.FC = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { user, isLoading, isError, isSuccess, message } = useSelector(
        (state: RootState) => state.auth
    );

    const [toastMessage, setToastMessage] = useState<string | null>(null);
    const [toastType, setToastType] = useState<'success' | 'error' | 'info' | 'warning'>('success');

    useEffect(() => {
        dispatch(reset());
    }, [dispatch]);

    useEffect(() => {
        if (isError) {
            setToastMessage(message || 'Erro no registro.');
            setToastType('error');
        }
        if (isSuccess) {
            setToastMessage('Registro efetuado com sucesso! Faça login.');
            setToastType('success');
            setTimeout(() => {
                navigate('/login'); 
            }, 1500);
        }

        const timeout = setTimeout(() => {
            dispatch(reset());
        }, 5000);

        return () => clearTimeout(timeout); 
    }, [isError, isSuccess, message, navigate, dispatch]);


    const onSubmitRegister = (userData: any) => {
        dispatch(register(userData) as any);
    };

    return (
        <div className={layoutStyles.pageContainer}>
            <div className={layoutStyles.contentWrapper}>
                <h2 className={layoutStyles.title}>Nexus ERP</h2>
                <RegisterForm onSubmit={onSubmitRegister} isLoading={isLoading} /> 
                <div className={authStyles.switchFormLink}>
                    <p>
                        Já tem uma conta? <a href="/login">Faça Login</a>
                    </p>
                </div>
            </div>
            {toastMessage && (
                <NotificacaoToast
                    message={toastMessage}
                    type={toastType}
                    onClose={() => {
                        setToastMessage(null);
                    }}
                />
            )}
        </div>
    );
};

export default RegisterPage;