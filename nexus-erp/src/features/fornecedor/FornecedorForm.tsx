import React, { useState } from 'react';
import type { Fornecedor } from './fornecedor.models';
import styles from './FornecedorForm.module.scss';

interface FornecedorFormProps {
  onSubmit: (fornecedor: Fornecedor) => void;
}

export const FornecedorForm: React.FC<FornecedorFormProps> = ({ onSubmit }) => {
  const [nome, setNome] = useState('');
  const [codigoFornecedor, setCodigoFornecedor] = useState('');
  const [cnpj, setCnpj] = useState('');
  const [razaoSocial, setRazaoSocial] = useState('');
  const [nomeFantasia, setNomeFantasia] = useState('');
  const [inscricaoEstadual, setInscricaoEstadual] = useState('');
  const [contato, setContato] = useState('');
  const [uf, setUf] = useState('');
  const [cidade, setCidade] = useState('');
  const [logradouro, setLogradouro] = useState('');
  const [numero, setNumero] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      id: codigoFornecedor,
      nome,
      codigoFornecedor,
      cnpj,
      razaoSocial,
      nomeFantasia,
      inscricaoEstadual,
      contato,
      uf,
      cidade,
      logradouro,
      numero,
    });
    // Limpar formulário
    setNome('');
    setCodigoFornecedor('');
    setCnpj('');
    setRazaoSocial('');
    setNomeFantasia('');
    setInscricaoEstadual('');
    setContato('');
    setUf('');
    setCidade('');
    setLogradouro('');
    setNumero('');
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <h3>Cadastro de Fornecedores</h3>
      
      <div className={styles.row}>
        <div className={styles.formGroup}>
          <label htmlFor="nome">Nome</label>
          <input
            id="nome"
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="codigoFornecedor">Código do Fornecedor</label>
          <input
            id="codigoFornecedor"
            type="text"
            value={codigoFornecedor}
            onChange={(e) => setCodigoFornecedor(e.target.value)}
            required
          />
        </div>
      </div>

      <div className={styles.row}>
        <div className={styles.formGroup}>
          <label htmlFor="cnpj">CNPJ</label>
          <input
            id="cnpj"
            type="text"
            value={cnpj}
            onChange={(e) => setCnpj(e.target.value)}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="inscricaoEstadual">Inscrição Estadual</label>
          <input
            id="inscricaoEstadual"
            type="text"
            value={inscricaoEstadual}
            onChange={(e) => setInscricaoEstadual(e.target.value)}
          />
        </div>
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="razaoSocial">Razão Social</label>
        <input
          id="razaoSocial"
          type="text"
          value={razaoSocial}
          onChange={(e) => setRazaoSocial(e.target.value)}
          required
        />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="nomeFantasia">Nome Fantasia</label>
        <input
          id="nomeFantasia"
          type="text"
          value={nomeFantasia}
          onChange={(e) => setNomeFantasia(e.target.value)}
        />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="contato">Contato</label>
        <input
          id="contato"
          type="tel"
          value={contato}
          onChange={(e) => setContato(e.target.value)}
        />
      </div>

      <div className={styles.row}>
        <div className={styles.formGroup}>
          <label htmlFor="uf">UF</label>
          <input
            id="uf"
            type="text"
            maxLength={2}
            value={uf}
            onChange={(e) => setUf(e.target.value.toUpperCase())}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="cidade">Cidade</label>
          <input
            id="cidade"
            type="text"
            value={cidade}
            onChange={(e) => setCidade(e.target.value)}
            required
          />
        </div>
      </div>

      <div className={styles.row}>
        <div className={styles.formGroup}>
          <label htmlFor="logradouro">Logradouro</label>
          <input
            id="logradouro"
            type="text"
            value={logradouro}
            onChange={(e) => setLogradouro(e.target.value)}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="numero">Número</label>
          <input
            id="numero"
            type="text"
            value={numero}
            onChange={(e) => setNumero(e.target.value)}
            required
          />
        </div>
      </div>

      <button type="submit" className={styles.submitButton}>
        Salvar Fornecedor
      </button>
    </form>
  );
};
