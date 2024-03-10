import { Genre } from '@modules/books/infra/typeorm/entities/Genre';

import { IGenresRepository, ICreateGenreDTO } from '../IGenresRepository';

class GenresRepositoryInMemory implements IGenresRepository {
  genres: Genre[] = [];

  async create({ name, description }: ICreateGenreDTO): Promise<void> {
    const genre = new Genre();

    Object.assign(genre, {
      name,
      description,
    });

    this.genres.push(genre);
  }
  async findByName(name: string): Promise<Genre> {
    const genre = await this.genres.find(genre => genre.name === name);
    return genre;
  }
  async list(): Promise<Genre[]> {
    const all = this.genres;

    return all;
  }
}

export { GenresRepositoryInMemory };
