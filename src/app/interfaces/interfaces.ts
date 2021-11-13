
export interface Componente {
    icon: string;
    name: string;
    redirectTo: string;
}

export interface User {
    nombre: string;
    categoria: Categoria;
    tiempo: number;
    acertadas: number;
}
export interface Quiz {
  category: string;
  correctAnswer: string;
  id: number;
  incorrectAnswers: string[];
  question: string;
  type: string;
}
export interface Awnser{
  name: string;
  iscorrect: boolean;
}
export interface Categoria {
  nombre: string;
  url: string;
}