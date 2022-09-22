import { ArticleRequest } from '../../../interface/dto/article.request';
import { validate } from 'class-validator';

describe('ArticleRequest', () => {
  let request: ArticleRequest;

  beforeEach(async () => {
    request = new ArticleRequest();
  });

  describe('request validation', () => {
    it('if title is empty, throw error', async () => {
      //Given
      request.title = '';
      request.content = '본문';

      //When
      const errors = await validate(request);

      //Then
      expect(errors.length).not.toBe(0);
      expect(JSON.stringify(errors)).toContain('title should not be empty');

      //TODO 정상인 경우
    });
  });

  describe('toEntity ', () => {
    it('request 의 toEntity() 를 통해 Article Model return', async () => {
      //Given
      request.title = '제목';
      request.content = '본문';

      //When
      const articleModel = request.toEntity();

      //Then
      expect(request).toEqual(articleModel);
    });
  });
});
