import { Injectable, NotFoundException } from '@nestjs/common';
import { Movie } from 'src/movies/entities/movie.entitiy';

@Injectable()
export class MoviesService {
  private movies: Movie[] = [];
  getAll(): Movie[] {
    return this.movies;
  }

  getChosen(queryID: string): Movie {
    const movie = this.movies.find(({ id }) => id === parseInt(queryID));
    if (!movie) {
      throw new NotFoundException(`Film with id: ${queryID} not found`);
    }
    return movie;
  }

  remove(queryID: string) {
    this.getChosen(queryID);
    console.log(queryID);
    this.movies = this.movies.filter(({ id }: Movie) => id !== +queryID);
  }

  create(movieData): void {
    this.movies.push({
      id: this.movies.length + 1,
      ...movieData,
    });
  }

  patch(id: string, updatedData) {
    const movie = this.getChosen(id);
    this.remove(id);
    this.movies.push({ ...movie, ...updatedData });
  }
}
