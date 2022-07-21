import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMovieDTO } from 'src/movies/dto/create-movie.dto';
import { UpdateMovieDTO } from 'src/movies/dto/update-movie.dto';
import { Movie } from 'src/movies/entities/movie.entity';

@Injectable()
export class MoviesService {
  private movies: Movie[] = [];
  getAll(): Movie[] {
    return this.movies;
  }

  getChosen(queryID: number): Movie {
    const movie = this.movies.find(({ id }) => id === queryID);
    if (!movie) {
      throw new NotFoundException(`Film with id: ${queryID} not found`);
    }
    return movie;
  }

  remove(queryID: number) {
    this.getChosen(queryID);
    console.log(queryID);
    this.movies = this.movies.filter(({ id }: Movie) => id !== queryID);
  }

  create(movieData: CreateMovieDTO): void {
    this.movies.push({
      id: this.movies.length + 1,
      ...movieData,
    });
  }

  patch(id: number, updatedData: UpdateMovieDTO) {
    const movie = this.getChosen(id);
    this.remove(id);
    this.movies.push({ ...movie, ...updatedData });
  }
}
