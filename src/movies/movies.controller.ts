import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateMovieDTO } from './dto/create-movie.dto';
import { UpdateMovieDTO } from './dto/update-movie.dto';
import { Movie } from './entities/movie.entity';
import { MoviesService } from './movies.service';

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}
  @Get()
  getAll(): Movie[] {
    return this.moviesService.getAll();
  }

  @Get(':id')
  getChosen(@Param('id') movieID: number): Movie {
    return this.moviesService.getChosen(movieID);
  }

  @Delete(':id')
  remove(@Param('id') movieID: number) {
    return this.moviesService.remove(movieID);
  }

  @Patch('/:id')
  update(@Param('id') movieID: number, @Body() updatedData: UpdateMovieDTO) {
    return this.moviesService.patch(movieID, updatedData);
  }

  @Post()
  createNew(@Body() movieData: CreateMovieDTO) {
    return this.moviesService.create(movieData);
  }
}
