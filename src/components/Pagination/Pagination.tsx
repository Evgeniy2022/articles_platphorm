import { FC, useEffect, useState } from "react";
import styles from "./Pagination.module.css";
import { PaginationPage } from "../PaginationPage/PaginationPage";
import { IArrayPagination } from "../../types";

interface PaginationProps {
  page: number;
  setPage: (arg: number) => void;
  pagesAll: number;
}

export const Pagination: FC<PaginationProps> = ({ page, setPage, pagesAll }) => {
  const [pages, setPages] = useState(0); // количество страниц
  const [arrayPagination, setArrayPagination] = useState<IArrayPagination[]>([]);
  
  useEffect(() => {
    setPages(Math.ceil(pagesAll / 20));
  }, [pagesAll]);

  useEffect(() => {
    if (pages !== null) {
        setArrayPagination(
          Array.from({ length: pages }, (_, i) => ({
            page: i + 1,
            active: i === 0,
          }))
        );
    }
  }, [pages]);

  useEffect(() => {
    setArrayPagination(arrayPagination.map((item, index) => {
      return ({ ...item, active: index === page , })
    }))
  }, [page])

  const arrPag =  page > 2 ? arrayPagination.slice(page -2 , page + 3) : arrayPagination.slice(0, 5)
  
  return (
    <div className={styles.container}>
      <button
        className={styles.back}
        onClick={() => {
          if (page < pagesAll && page > 0) {
            setPage(page - 1);
          }
        }}
      >
        {"<"}
      </button>
      <div className={styles.body}>
        {arrPag.map((page, index) => (
          <PaginationPage
            key={index}
            page={page.page}
            setPage={setPage}
            arrayPagination={arrayPagination}
          />
        ))}
      </div>
      <button
        className={styles.next}
        onClick={() => {
          if (page < pagesAll) {
            setPage(page + 1);
          }
        }}
      >
        {">"}
      </button>
    </div>
  );
};
