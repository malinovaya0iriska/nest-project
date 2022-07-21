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

@Controller('movies')
export class MoviesController {
  @Get()
  getAll() {
    return 'all films';
  }

  @Get('search')
  search(@Query('year') searchingYear: string) {
    return `I'm looking for film of ${searchingYear}`;
  }

  @Get(':id')
  getChosen(@Param('id') movieID: string) {
    return `get ${movieID}`;
  }

  @Delete(':id')
  remove(@Param('id') movieID: string) {
    return `DELETE ${movieID}`;
  }

  @Patch('/:id')
  update(@Param('id') movieID: string, @Body() updateData) {
    return {
      updatedMovie: movieID,
      ...updateData,
    };
  }

  @Post()
  createNew(@Body() movieData) {
    console.log(movieData);

    return `Create`;
  }
}
