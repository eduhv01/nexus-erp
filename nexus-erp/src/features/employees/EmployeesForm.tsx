import React, { useState } from 'react';
import type { Employees } from './employees.models';
import styles from './EmployeesForm.module.scss';

interface EmployeesFormProps {
  onSubmit: (employee: Employees) => void;
}

export const EmployeesForm: React.FC<EmployeesFormProps> = ({ onSubmit }) => {
  const [codigo, setCodigo] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [cargo, setCargo] = useState('');
  const [phone, setPhone] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
     onSubmit({
      id: codigo,
      name,
      email,
      cargo,
      phone,
    });
    setCodigo('');
    setName('');
    setEmail('');
    setCargo('');
    setPhone('');
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <h3 className={styles.formTitle}></h3>
      <div className={styles.formGroup}>
        <label htmlFor="codigo">Código do Colaborador</label>
        <input
          id="codigo"
          type="text"
          value={codigo}
          onChange={(e) => setCodigo(e.target.value)}
          required
        />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="name">Nome</label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="cargo">Cargo</label>
        <input
          id="cargo"
          type="text"
          value={cargo}
          onChange={(e) => setCargo(e.target.value)}
          required
        />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="phone">Contato</label>
        <input
          id="phone"
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
      </div>
      <button type="submit" className={styles.submitButton}>
        Salvar Funcionário
      </button>
    </form>
  );
}
