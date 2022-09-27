export class Page<T> {
  pageSize: number;
  totalCounts: number;
  pageNumber: number;
  totalPages: number;
  items: T[];

  constructor(totalCount: number, pageSize: number, pageNumber: number, items: T[]) {
    this.totalCounts = totalCount;
    this.pageSize = pageSize;
    this.pageNumber = pageNumber;
    this.totalPages = Math.ceil(totalCount / pageSize);
    this.items = items;
  }
}
