import { FC, useEffect, useState } from "react";
import styles from "./ArticlePsot.module.css";
import { useNavigate } from "react-router-dom";
import { AticleType } from "../../articleType";
import Like from "/Vector.png";
import RedLike from "/redLike.svg";
import { deleteSlugArticle, favoriteSlugArticle } from "../../api";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { editingArticle } from "../../redux/slices/articlesSlice";
import { monthOfYear } from "../../assets";
import { TTime } from "../../types";

interface ArticlePsotsProps {
  article: AticleType;
  saveSlugs: string[];
  setSaveSlugs: (arg: string[]) => void;
}

export const ArticlePsot: FC<ArticlePsotsProps> = ({
  article,
  saveSlugs,
  setSaveSlugs,
}) => {
  const articleSlug = useSelector(
    (state: RootState) => state.articleSlice.articles
  ).find((item) => item.slug === article.slug);

  const slug: string = articleSlug?.slug ? articleSlug.slug : "";
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [time, setTime] = useState<TTime>({
    dayOfMonth: null,
    monthDate: null,
    year: null,
    month: "",
  });

  useEffect(() => {
    const str = new Date(article.createdAt);
    const dayOfMonth = str.getDate();
    const monthDate = str.getMonth() + 1;
    const year = str.getFullYear();
    let month = "";
    for (let i = 0; i < monthOfYear.length; i++) {
      if (i === monthDate) {
        month = monthOfYear[i - 1];
      }
    }
    setTime({ dayOfMonth, monthDate, year, month });
  }, []);

  useEffect(() => {
    localStorage.setItem("fovoriteSlugs", JSON.stringify(saveSlugs));
  }, [saveSlugs]);

  async function favoriteWithSlug() {
    if (slug && !saveSlugs.includes(slug)) {
      const res = await favoriteSlugArticle(slug);
      if (res.ok) {
        setSaveSlugs([...saveSlugs, slug]);
        dispatch(
          editingArticle({
            ...article,
            favoritesCount: article.favoritesCount + 1,
          })
        );
      }
    } else {
      const res = await deleteSlugArticle(slug);
      if (res.ok) {
        setSaveSlugs(saveSlugs.filter((item) => item != slug));
        dispatch(
          editingArticle({
            ...article,
            favoritesCount: article.favoritesCount - 1,
          })
        );
      }
    }
  }

  return (
    <div className={styles.article}>
      <div className={styles.body}>
        <div className={styles.top}>
          <h1
            className={styles.title}
            onClick={() => navigate(`/articles/${article.slug}`)}
          >
            {article.title}
          </h1>
          <button className={styles.btn} onClick={favoriteWithSlug}>
            {saveSlugs.includes(article.slug) ? (
              <img src={RedLike} alt="" />
            ) : (
              <img src={Like} alt="" />
            )}
          </button>
          <div className={styles.likes}>{article.favoritesCount}</div>
        </div>

        <div className={styles.tags}>
          {article.tagList.map((tag, index) => {
            return (
              <div key={index} className={styles.tag}>
                {tag}
              </div>
            );
          })}
        </div>
        <p className={styles.description}>{article.description}</p>
      </div>
      <div className={styles.card}>
        <div className={styles.user}>
          <p className={styles.name}>{article.author.username}</p>
          <p className={styles.born}>
            {`${time.month} ${time.dayOfMonth}, ${time.year}`}{" "}
          </p>
        </div>
        <img className={styles.avatar} src={article.author.image} alt="" />
      </div>
    </div>
  );
};
