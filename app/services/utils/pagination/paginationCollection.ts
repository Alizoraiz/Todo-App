import PaginationOptions from './paginationOptions';

class PaginatedCollection<T> {
  data: T[];
  totalItems: number;
  perPage: number;
  currentPage: number;
  totalPages: any;
  hasNextPage: any;

  constructor(
    paginationOptions: PaginationOptions,
    totalItems: number,
    items: T[]
  ) {
    this.perPage = paginationOptions.perpage;
    this.currentPage = paginationOptions.page;
    this.totalItems = totalItems;
    this.data = items;
  }

  getTotalPages(): number {
    return Math.ceil(this.totalItems / this.perPage);
  }

  hasNext(): boolean {
    return this.currentPage < this.getTotalPages();
    }

  getPaginatedData() {
    const paginatedData = {
      totalItems: this.totalItems,
      totalPages: this.getTotalPages(),
      currentPage: this.currentPage,
      perPage: this.perPage,
      hasNext: this.hasNext(),
      data: this.data,
    };
    return paginatedData;
  }
}

export default PaginatedCollection;