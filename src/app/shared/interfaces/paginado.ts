export class Paginado<T> {

  total: number;
  page: number;
  pages: number;
  items: T[];

  constructor () {
    this.total = 0;
    this.page = 1;
    this.pages = 1;
    this.items = [];
  }

}