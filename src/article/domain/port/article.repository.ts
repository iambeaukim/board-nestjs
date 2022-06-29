import { Article } from '../model/article.model';
import { ReturnModelType } from '@typegoose/typegoose';

export interface ArticleRepository {
  save(article: Article): Promise<Article>;
  findAll(): Promise<Article[] | null>;
  getModel(): ReturnModelType<typeof Article>;
}

/* Typescript 사용 시 Interface 를 활용하여 의존성 주입
 * 인터페이스는 Javascript 의 것이 아니므로, 런타임 시 인터페이스가 사라진다.
 * 따라서 IOC 컨테이너가 인터페이스 기반으로 의존성 주입할때, 무엇을 주입해야하는지 모름
 * 해결 방법 : Interface 를 string/symbol 로 대체한다.
 * IOC 컨테이너가 symbol 키맵을 이용하여 class 정보를 관리하는 것으로 생각된다.
 * */
export const ArticleRepository = Symbol('ArticleRepository');
