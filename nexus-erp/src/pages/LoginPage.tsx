import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, reset } from '../features/auth/authSlice'; // CHAVE: Importa o reset
import type { RootState } from '../store/store';

import layoutStyles from '../styles/FormPageLayout.module.scss';
import { LoginForm } from '../features/auth/LoginForm';
import authStyles from '../features/auth/AuthForm.module.scss';
import { NotificacaoToast } from '../components/common/NotificacaoToast';

const LoginPage: React.FC = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const { user, isLoading, isAuthenticated, isError, message } = useSelector((state: RootState) => state.auth);

	const [toastMessage, setToastMessage] = useState<string | null>(null);
	const [toastType, setToastType] = useState<'success' | 'error'>('success');

	useEffect(() => {
		if (isAuthenticated && user) {
			setToastMessage("Login bem-sucedido! Redirecionando...");
			setToastType('success');
			setTimeout(() => {
				navigate('/');
			}, 1500);
		} 
		else if (isError) {
			setToastMessage(message || 'Erro no login. Verifique suas credenciais.');
			setToastType('error');
			dispatch(reset()); 
		}
	}, [isAuthenticated, user, isError, message, navigate, dispatch]);

	const handleLoginSubmit = async (data: any) => {
		setToastMessage(null); 
		dispatch(loginUser(data) as any); 
	};

	return (
		<div className={layoutStyles.pageContainer}>
			<div className={layoutStyles.contentWrapper}>
				<h2 className={layoutStyles.title}>Nexus ERP</h2>
				<LoginForm onSubmit={handleLoginSubmit} isLoading={isLoading} /> 
				<div className={authStyles.switchFormLink}>
					<p>
						Não tem uma conta? <Link to="/register">Registre-se aqui</Link>
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

export default LoginPage;