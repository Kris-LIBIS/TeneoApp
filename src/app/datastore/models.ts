import * as _ from 'lodash';

export interface IPageInfo {
  current: number;
  next?: number;
  pages: number;
  count?: number;
  per_page?: number;
}

export function newPageInfo(): IPageInfo {
  return {
    current: 0,
    pages: 1,
    per_page: 1
  }
}

export function meta2PageInfo(meta: any): IPageInfo {
  const info: IPageInfo = {
    current: meta.current_page,
    next: meta.next_page,
    pages: meta.total_pages,
    count: meta.total_count,
    per_page: meta.per_page
  };

  return <IPageInfo>_.omitBy(info, (value, key) => !value);
}
