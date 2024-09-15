import { FC, useState, useEffect } from "react";
import Markdown from "react-markdown";
import { IArticle } from "../../types";
import styles from "./ArticleWithoutAuth.module.css";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { deleteArticle } from "../../api";
import { useNavigate } from "react-router-dom";
import { deleteArticleBySlag } from "../../redux/slices/articlesSlice";
import Like from "/Vector.png";
import RedLike from "/redLike.svg";
import { createPortal } from "react-dom";
import Modal from "../Modal/Modal";
import { monthOfYear } from "../../assets";
import { TTime } from "../../types";

interface ArticleWithoutAuthProps {
  slug: IArticle;
}



export const ArticleWithoutAuth: FC<ArticleWithoutAuthProps> = ({ slug }) => {
  const user = useSelector((state: RootState) => state.userSlice.user);
  const isAuth = useSelector((state: RootState) => state.userSlice.isAuth);
  const [isLike, setIsLike] = useState(false);
  const [open, setOpen] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [time, setTime] = useState<TTime>({
    dayOfMonth : null,
    monthDate : null,
    year : null,
    month : '',
  })
  
  useEffect(() => {
    const slugs = JSON.parse(localStorage.getItem("fovoriteSlugs") || '');    
    setIsLike(slugs.includes(slug.slug))
  }, [slug])
  

  useEffect(() => {
    const str = new Date(slug.createdAt);
    const dayOfMonth = str.getDate();
    const monthDate = str.getMonth() + 1;
    const year = str.getFullYear();
    let month = '';
    for (let i = 0; i < monthOfYear.length; i++) {
      if (i === monthDate) {
        month = monthOfYear[i - 1];
      }
    }
    setTime({dayOfMonth, monthDate, year, month})
  }, [slug])



  async function deleteArticleFunction() {
    const res = await deleteArticle(slug.slug);
    if (res.ok) {
      dispatch(deleteArticleBySlag(slug.slug));
      navigate("/");
    }
  }
  async function editMyArticle() {
    navigate(`/edit/${slug.slug}`);
  }

  return (
    <div className={styles.article}>
      <div className={styles.container}>
        <div className={styles.body}>
          <div className={styles.top}>
            <h1 className={styles.title}>{slug.title}</h1>
            <button className={styles.btn} disabled>
              {isLike ? (
                <img src={RedLike} alt="" />
              ) : (
                <img src={Like} alt="" />
              )}
            </button>
            <div className={styles.likes}>{slug.favoritesCount}</div>
          </div>

          <div className={styles.tags}>
            {slug.tagList ? (
              slug.tagList.map((tag, index) => {
                return (
                  <div key={index} className={styles.tag}>
                    {tag}
                  </div>
                );
              })
            ) : (
              <p></p>
            )}
          </div>
          <p className={styles.description}>{slug.description}</p>
        </div>
        <div>
          <div className={styles.card}>
            <div className={styles.user}>
              <p className={styles.name}>{slug?.author?.username}</p>
              <p
                className={styles.born}
              >{`${time.month} ${time.dayOfMonth}, ${time.year}`}</p>
            </div>
            <img className={styles.avatar} src={slug?.author?.image} alt="" />
          </div>
          {user.username === slug?.author?.username && isAuth ? (
            <div>
              <button className={styles.delete} onClick={() => setOpen(true)}>
                Delete
              </button>
              <button className={styles.edite} onClick={editMyArticle}>
                Edite
              </button>
            </div>
          ) : null}
        </div>
      </div>
      <Markdown className={styles.markbody}>{slug.body}</Markdown>
      {open &&
        createPortal(
          <Modal
            deleteArticleFunction={deleteArticleFunction}
            setOpen={setOpen}
          />,
          document.querySelector("main")!
        )}
    </div>
  );
};
