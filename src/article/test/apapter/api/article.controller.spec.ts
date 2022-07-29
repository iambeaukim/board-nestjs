import { Test, TestingModule } from '@nestjs/testing';
import { GeneralArticleService } from '../../../domain/port/general-article.service';
import { ArticleController } from '../../../adapter/api/article.controller';
import { ArticleRequest } from '../../../adapter/dto/article.request';
import { ArticleResponse } from '../../../adapter/dto/article.response';
import { ArticleRepository } from '../../../domain/port/article.repository';
import { ArticleMongoRepository } from '../../../adapter/db/articleMongo.repository';
import { TypegooseModule } from 'nestjs-typegoose';
import { Article } from '../../../domain/model/article.model';
import * as httpMocks from 'node-mocks-http';

describe('ArticleController', () => {
  let controller: ArticleController;
  let service: GeneralArticleService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [TypegooseModule.forRoot('mongodb://localhost:27017/board'), TypegooseModule.forFeature([Article])],
      controllers: [ArticleController],
      providers: [GeneralArticleService, { provide: ArticleRepository, useClass: ArticleMongoRepository }],
    }).compile();

    controller = module.get<ArticleController>(ArticleController);
    service = module.get<GeneralArticleService>(GeneralArticleService);
  });

  describe('게시물 등록 API', () => {
    it('게시물을 생성하고, 생성 된 게시물 return', async () => {
      //Given
      const request = new ArticleRequest();
      request.title = '제목';
      request.content = '본문';

      //jest.spyOn 으로 repository save 함수 호출을 모의하고, 이 모의된 함수는 mockResolvedValue 를 사용해서 모의 저장된 Article 반환
      const serviceCreateSpy = jest.spyOn(service, 'createArticle').mockResolvedValue(ArticleResponse.fromEntity(request.toEntity()));

      //When
      const result = await controller.createArticle(request);

      //Then
      expect(serviceCreateSpy).toHaveBeenCalledWith(request); // 모의 함수가 특정 인수로 호출되었는지 확인하는 데 사용
      expect(request).toEqual(result);
    });
  });

  describe('엑셀 다운로드 API', () => {
    it('게시물을 조회하고, 생성 된 엑셀파일 return', async () => {
      //Given
      const response = httpMocks.createResponse();
      const buffer = Buffer.alloc(15, 0, 'base64');
      const serviceDownloadExcelSpy = jest.spyOn(service, 'downloadExcel').mockResolvedValue(buffer);

      //When
      await controller.downloadExcel(response);

      //Then
      expect(serviceDownloadExcelSpy).toBeCalledTimes(1);
      expect(response.statusCode).toEqual(200);
      expect(buffer).toEqual(response._getData());
    });
  });
});
