import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { MoviesService } from './movies.service';

describe('MoviesService', () => {
  let service: MoviesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MoviesService],
    }).compile();

    service = module.get<MoviesService>(MoviesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('Testing of method getAll', () => {
    it('Array must be returned', () => {
      const result = service.getAll();
      expect(result).toBeInstanceOf(Array);
    });
  });

  describe('Testing of method getChosen', () => {
    it('Movie with asked ID must be returned', () => {
      service.create({
        title: 'Test Movie',
        genres: ['Test Genre'],
        year: 2020,
      });
      const movie = service.getChosen(1);
      expect(movie).toBeDefined();
    });

    it("Testing of NotFoundException if parametrs aren't valid", () => {
      try {
        service.getChosen(9999);
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
      }
    });
  });

  describe('Testing of method remove', () => {
    it('The move with given ID is removed', () => {
      service.create({
        title: 'Test Movie',
        genres: ['Test Genre'],
        year: 2010,
      });
      const allMovies = service.getAll().length;
      service.remove(1);
      const afterRemove = service.getAll().length;
      expect(afterRemove).toBeLessThan(allMovies);
    });

    it("Testing of NotFoundException if id isn't exist or valide", () => {
      try {
        service.remove(9999);
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
      }
    });
  });

  describe('Testing of method create', () => {
    it('Movie is created', () => {
      const beforeCreate = service.getAll().length;
      service.create({
        title: 'Test Movie',
        genres: ['Test Genre'],
        year: 2000,
      });
      const afterCreate = service.getAll().length;
      expect(afterCreate).toBeGreaterThan(beforeCreate);
    });
  });

  describe('Testing of method patch', () => {
    it('Movie was edited', () => {
      service.create({
        title: 'Test Movie',
        genres: ['Test Genre'],
        year: 2015,
      });
      service.patch(1, { title: "Updated Movie's title" });
      const movie = service.getChosen(1);
      expect(movie.title).toEqual("Updated Movie's title");
    });

    it("Testing of NotFoundException if id isn't exist or valide", () => {
      try {
        service.patch(9999, { title: '' });
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
      }
    });
  });
});
