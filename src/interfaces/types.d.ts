export interface User {
  id: number;
  attributes: {
    numero_de_identificacion: number;
    fecha_de_nacimiento: Date;
    nombre: string;
    createdAt: Date;
    updatedAt: Date;
    publishedAt: Date;
  };
}
