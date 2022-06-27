import { ArticleRepository } from '../../../domain/port/article.repository';
import { Test, TestingModule } from '@nestjs/testing';
import { TypegooseModule } from 'nestjs-typegoose';
import { Article } from '../../../domain/model/article.model';
import { ArticleMongoRepository } from '../../../adapter/db/articleMongo.repository';

describe('ArticleMongoRepository', () => {
  let repository: ArticleRepository;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        TypegooseModule.forRoot('mongodb://localhost:27017/board'),
        TypegooseModule.forFeature([Article]),
      ],
      providers: [
        { provide: ArticleRepository, useClass: ArticleMongoRepository },
      ],
    }).compile();

    repository = module.get<ArticleRepository>(ArticleRepository);
  });

  describe('save', () => {
    it('게시물 저장 후 return', async () => {
      //Given
      const article = new Article();
      article.title = '제목';
      article.content = '본문';
      repository.save = jest.fn().mockResolvedValue(article);

      //When
      const result = await repository.save(article);

      //Then
      expect(article.title).toBe(result.title);
      expect(article.content).toBe(result.content);
    });
  });

  describe('findAll', () => {
    it('게시물 목록 조회 후 return', async () => {
      //Given
      const article1 = new Article();
      const article2 = new Article();

      article1.title = '제목1';
      article1.content = '본문1';
      article2.title = '제목2';
      article2.content = '본문2';

      const articles = [article1, article2];
      repository.findAll = jest.fn().mockResolvedValue(articles);

      //When
      const results = await repository.findAll();

      //Then
      expect(articles).toEqual(results);
    });
  });
});
