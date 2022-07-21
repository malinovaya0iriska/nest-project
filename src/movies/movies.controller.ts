import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { Movie } from 'src/movies/entities/movie.entitiy';
import { MoviesService } from 'src/movies/movies.service';

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}
  @Get()
  getAll(): Movie[] {
    return this.moviesService.getAll();
  }

  @Get('search')
  search(@Query('year') searchingYear: string) {
    return this.moviesService.getChosen(searchingYear);
  }

  @Get(':id')
  getChosen(@Param('id') movieID: string): Movie {
    return this.moviesService.getChosen(movieID);
  }

  @Delete(':id')
  remove(@Param('id') movieID: string) {
    return this.moviesService.remove(movieID);
  }

  @Patch('/:id')
  update(@Param('id') movieID: string, @Body() updatedData) {
    return this.moviesService.patch(movieID, updatedData);
  }

  @Post()
  createNew(@Body() movieData) {
    return this.moviesService.create(movieData);
  }
}
