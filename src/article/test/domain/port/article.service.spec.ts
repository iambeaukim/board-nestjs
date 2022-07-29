import { Test, TestingModule } from '@nestjs/testing';
import { GeneralArticleService } from '../../../domain/port/general-article.service';
import { Article } from '../../../domain/model/article.model';
import { ArticleRepository } from '../../../domain/port/article.repository';
import { ArticleMongoRepository } from '../../../adapter/db/articleMongo.repository';
import { TypegooseModule } from 'nestjs-typegoose';
import * as XLSX from 'xlsx';
import { v4 as uuid } from 'uuid';

describe('ArticleService', () => {
  let service: GeneralArticleService;
  let repository: ArticleRepository;
  let article1: Article;
  let article2: Article;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [TypegooseModule.forRoot('mongodb://localhost:27017/board'), TypegooseModule.forFeature([Article])],
      providers: [GeneralArticleService, { provide: ArticleRepository, useClass: ArticleMongoRepository }],
    }).compile();

    service = module.get<GeneralArticleService>(GeneralArticleService);
    repository = module.get<ArticleRepository>(ArticleRepository);
    article1 = new Article();
    article2 = new Article();
  });

  afterEach(async () => {
    article1 = new Article();
    article2 = new Article();
  });

  describe('게시물 등록', () => {
    it('게시물을 생성하고, 생성 된 게시물 return', async () => {
      //Given
      article1._id = uuid();
      article1.title = '제목';
      article1.content = '본문';

      //jest.spyOn 으로 repository save 함수 호출을 모의하고, 이 모의된 함수는 mockResolvedValue 를 사용해서 모의 저장된 Article 반환
      const repositorySaveSpy = jest.spyOn(repository, 'save').mockResolvedValue(article1);

      //When
      const result = await service.createArticle(article1);

      //Then
      expect(repositorySaveSpy).toHaveBeenCalledWith(article1); // 모의 함수가 특정 인수로 호출되었는지 확인하는 데 사용
      expect(result._id).toBe(article1._id);
      expect(result.title).toBe(article1.title);
      expect(result.content).toBe(article1.content);
    });
  });

  describe('게시물 엑셀 다운로드', () => {
    it('게시물 목록을 조회하고, 조회 된 결과를 엑셀 파일로 return', async () => {
      //Given
      article1.title = '제목1';
      article1.content = '본문1';

      article2.title = '제목2';
      article2.content = '본문2';

      const existingArticles = [article1, article2];

      //jest.spyOn 으로 repository findAll 함수 호출을 모의하고, 이 모의된 함수는 mockResolvedValue 를 사용해서 existingArticles 반환
      const repositoryFindAllSpy = jest.spyOn(repository, 'findAll').mockResolvedValue(existingArticles);

      //When
      const result = await service.downloadExcel();

      //Then
      const workbook = XLSX.read(result);
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];

      expect(repositoryFindAllSpy).toBeCalled();
      expect(sheetName).toBe('게시물');
      expect(XLSX.utils.sheet_to_json(sheet)).toEqual(existingArticles);
    });
  });

  describe('게시물 목록 조회', () => {
    it('게시물 목록을 조회하고, 조회 된 결과를 return', async () => {
      //Given
      article1.title = '제목1';
      article1.content = '본문1';

      article2.title = '제목2';
      article2.content = '본문2';

      const existingArticles = [article1, article2];

      //jest.spyOn 으로 repository findAll 함수 호출을 모의하고, 이 모의된 함수는 mockResolvedValue 를 사용해서 existingArticles 반환
      const repositoryFindAllSpy = jest.spyOn(repository, 'findAll').mockResolvedValue(existingArticles);

      //When
      const results = await service.getArticles();

      //Then
      expect(repositoryFindAllSpy).toBeCalled(); // 모의 함수가 호출되었는지 확인하는 데 사용
      expect(results).toEqual(existingArticles);
    });
  });
});
