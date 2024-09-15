export interface IArticle {
  author: Author;
  body: string;
  createdAt: string;
  description: string;
  favorited: false;
  favoritesCount: number;
  slug: string;
  tagList: string[] | null[];
  title: string;
  updatedAt: string;
}

interface Author {
  username: string;
  image: string;
  following: boolean;
  bio?: string
}

export interface IArrayPagination {
  page: number;
  active: boolean;
}

export type TTime = {
  dayOfMonth : number | null,
  monthDate : number | null,
  year : number | null,
  month : string,
}

