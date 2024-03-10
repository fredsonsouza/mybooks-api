import { Genre } from '../infra/typeorm/entities/Genre';

interface ICreateGenreDTO {
  name: string;
  description: string;
}

interface IGenresRepository {
  create({ name, description }: ICreateGenreDTO): Promise<void>;
  findByName(name: string): Promise<Genre>;
  list(): Promise<Genre[]>;
}

export { IGenresRepository, ICreateGenreDTO };
