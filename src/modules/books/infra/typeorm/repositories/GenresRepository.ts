import { Repository } from 'typeorm';

import { dataSource } from '@shared/infra/typeorm/data-source';

import {
  IGenresRepository,
  ICreateGenreDTO,
} from '../../../repositories/IGenresRepository';
import { Genre } from '../entities/Genre';

class GenresRepository implements IGenresRepository {
  private repository: Repository<Genre>;

  constructor() {
    this.repository = dataSource.getRepository(Genre);
  }

  async create({ name, description }: ICreateGenreDTO): Promise<void> {
    const genre = this.repository.create({
      name,
      description,
    });
    await this.repository.save(genre);
  }

  async findByName(name: string): Promise<Genre> {
    const genre = await this.repository.findOneBy({ name });
    return genre;
  }

  async list(): Promise<Genre[]> {
    const genres = this.repository.find();
    return genres;
  }
}

export { GenresRepository };
