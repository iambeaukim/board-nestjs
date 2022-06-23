import { Test, TestingModule } from '@nestjs/testing';
import { ArticleService } from './article.service';
import { Article } from '../model/article.model';

describe('ArticleService', () => {
  let service: ArticleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ArticleService],
    }).compile();

    service = module.get<ArticleService>(ArticleService);
  });

  describe('게시물 등록', () => {
    it('게시물을 생성하고, 생성 된 게시물 return', async () => {
      const article = new Article();
      article.title = '제목';
      article.content = '본문';

      //const userRepositorySaveSpy = jest.spyOn(repository, 'save').mockResolvedValue(null);

      const result = await service.createArticle(article);

      expect(result.title).toBe('제목');
      expect(result.content).toBe('본문');
      expect(result.isActive).toBe(true);
    });
  });
});
