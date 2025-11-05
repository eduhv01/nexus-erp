export interface IClient {
  id: string;        
  name: string;
  email: string;
  phone?: string;    
  address?: string;  
  cpf: string;       
  createdAt?: Date;  
}