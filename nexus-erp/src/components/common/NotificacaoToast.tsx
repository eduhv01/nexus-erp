import React, { useEffect } from 'react';
import styles from './NotificacaoToast.module.scss'; 
import { FiCheckCircle, FiAlertCircle, FiX } from 'react-icons/fi';

interface NotificacaoToastProps {
  message: string;
  type?: 'success' | 'error' | 'info' | 'warning';
  duration?: number;
  onClose: () => void;
}

export const NotificacaoToast: React.FC<NotificacaoToastProps> = ({ 
  message,
  type = 'success',
  duration = 3000,
  onClose,
}) => {
  const [isVisible, setIsVisible] = React.useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onClose, 500); 
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const handleCloseClick = () => {
    setIsVisible(false);
    setTimeout(onClose, 300);
  };

  return (
    <div 
      className={`${styles.toast} ${styles[type]} ${isVisible ? styles.visible : styles.hidden}`}
    >
      {type === 'success' && <FiCheckCircle className={styles.icon} />}
      {type === 'error' && <FiAlertCircle className={styles.icon} />}
      <span className={styles.message}>{message}</span>
      <button className={styles.closeButton} onClick={handleCloseClick}>
        <FiX />
      </button>
    </div>
  );
};