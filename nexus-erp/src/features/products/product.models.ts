// Modelo de dados do Produto (todos os campos em português)
// Caso outras partes do código ainda usem os nomes antigos (name, description, price, quantity),
// será necessário atualizar esses locais para usar os novos nomes abaixo.
export interface Produto {
  id: string;          // Identificador único
  nome: string;        // Nome do produto
  descricao: string;   // Descrição do produto
  preco: number;       // Preço (em reais)
  quantidade: number;  // Quantidade em estoque
}


export type Product = Produto;
