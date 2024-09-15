import { FC, useState } from "react";
import { ArticlePsot } from "../components/ArticlePsot/ArticlePsot";
import { Pagination } from "../components/Pagination/Pagination";
import { AticleType } from "../articleType";

interface ArticlesProps {
  articles: AticleType[];
  page: number;
  setPage: (arg: number) => void;
  pagesAll: number;
}
const storageItem = localStorage.getItem("fovoriteSlugs")
  ? JSON.parse(localStorage.getItem("fovoriteSlugs") || "")
  : "";

export const Articles: FC<ArticlesProps> = ({
  articles,
  page, // текущая страница
  setPage,
  pagesAll, // количество articles
}) => {
  const [saveSlugs, setSaveSlugs] = useState(storageItem);
  
  
  return (
    <>
      {articles.map((article, index) => {
        return (
          <ArticlePsot
            key={index}
            article={article}
            saveSlugs={saveSlugs}
            setSaveSlugs={setSaveSlugs}
          />
        );
      })}
      <Pagination page={page} setPage={setPage} pagesAll={pagesAll} />
    </>
  );
};
