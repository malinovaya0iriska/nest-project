import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import { CreateMovieDTO } from 'src/movies/dto/create-movie.dto';
import { UpdateMovieDTO } from 'src/movies/dto/update-movie.dto';
import { Movie } from 'src/movies/entities/movie.entitiy';
import { MoviesService } from 'src/movies/movies.service';

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}
  @Get()
  getAll(@Res() res, @Req() req): Movie[] {
    // opportunity to get response and request, but it's unpreferred because of probability use another frameworks or libraries
    res.json();
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
