interface ICreateCarRequestDTO {
  name: string;
  description: string;
  brand: string;
  category_id: string;
  user_id: string;
}

interface ICreateCarResponseDTO {
  id: string;
  name: string;
  description: string;
  brand: string;
  category_id: string;
  user_id: string;
  created_at: Date;
}

export { ICreateCarRequestDTO, ICreateCarResponseDTO };
