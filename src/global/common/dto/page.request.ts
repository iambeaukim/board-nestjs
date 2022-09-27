import { IsOptional } from 'class-validator';

export abstract class PageRequest {
  @IsOptional()
  pageNumber?: number;

  @IsOptional()
  pageSize?: number;

  getOffset(): number {
    return (this.pageNumber - 1) * this.pageSize;
  }

  getLimit(): number {
    return this.pageSize;
  }
}
