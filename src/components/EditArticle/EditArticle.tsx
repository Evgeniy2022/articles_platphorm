import { FC, useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { RootState } from "../../redux/store";
import { useForm } from "react-hook-form";

import styles from "./EditArticle.module.css";
import { editingArticle } from "../../redux/slices/articlesSlice";
import { editMyArticle } from "../../api";

interface IEditArticle {
  slug: string;
  title: string;
  description: string;
  body: string;
}

export const EditArticle: FC = () => {
  const params = useParams();

  const slug: string = params.slug ? params.slug : "";

  const editArticle = useSelector(
    (state: RootState) => state.articleSlice.articles
  ).find((item) => item.slug === slug);

  const [editInputData, setEditInputData] = useState({
    title: "",
    description: "",
    body: "",
  });
  const [tags, setTags] = useState<string[]>([]);
  useEffect(() => {
    if (editArticle) {
      setEditInputData({
        title: editArticle.title,
        description: editArticle.description,
        body: editArticle.body,
      });
      setTags(editArticle.tagList);
    }
  }, [editArticle]);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<IEditArticle>();
  const inputRef = useRef<HTMLInputElement>(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function hanleSubmitEditForm(data: IEditArticle) {
    try {
      const res = await editMyArticle(
        slug,
        data.title,
        data.description,
        data.body
      );
      dispatch(editingArticle(res.article));
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  }

  function addTagByEditing() {
    if (inputRef.current) {
      const input = inputRef.current;
      if (input.value.trim() !== "") {
        setTags([...tags, input.value]);
        input.value = "";
      }
    }
  }

  function cleanInputValue() {
    if (inputRef.current) inputRef.current.value = "";
  }

  return (
    <>
      <div className={styles.body}>
        <div className={styles.container}>
          <h1 className={styles.title}>Create new article</h1>
          <form onSubmit={handleSubmit(hanleSubmitEditForm)}>
            <div className={styles.createTitle}>
              <label className={styles.labTitle} htmlFor="title">
                Title
              </label>
              <input
                value={editInputData.title}
                className={styles.inputTitle}
                type="text"
                id="title"
                placeholder="Title"
                {...register("title", {
                  required: true,
                  onChange: (e) =>
                    setEditInputData({
                      ...editInputData,
                      title: e.target.value,
                    }),
                })}
              />
              {errors.title ? (
                <>
                  {errors.title.type === "pattern" && (
                    <p
                      style={{
                        transform: "translateY(-10px)",
                        color: "rgba(245, 34, 45, 1)",
                        fontSize: "14px",
                      }}
                    >
                      {errors.title.message}
                    </p>
                  )}
                </>
              ) : null}
            </div>
            <div className={styles.createDesc}>
              <label className={styles.labDesc} htmlFor="description">
                Short description
              </label>
              <input
                value={editInputData.description}
                className={styles.inputDesc}
                type="text"
                id="description"
                placeholder="Description"
                {...register("description", {
                  required: true,
                  onChange: (e) =>
                    setEditInputData({
                      ...editInputData,
                      description: e.target.value,
                    }),
                })}
              />
              {errors.description ? (
                <>
                  {errors.description.type === "pattern" && (
                    <p
                      style={{
                        transform: "translateY(-10px)",
                        color: "rgba(245, 34, 45, 1)",
                        fontSize: "14px",
                      }}
                    >
                      {errors.description.message}
                    </p>
                  )}
                </>
              ) : null}
            </div>
            <div className={styles.createText}>
              <label className={styles.labText} htmlFor="text">
                Text
              </label>
              <textarea
                value={editInputData.body}
                className={styles.areaText}
                id="text"
                placeholder="Text"
                {...register("body", {
                  required: true,
                  onChange: (e) =>
                    setEditInputData({
                      ...editInputData,
                      body: e.target.value,
                    }),
                })}
              ></textarea>
              {errors.body ? (
                <>
                  {errors.body.type === "pattern" && (
                    <p
                      style={{
                        transform: "translateY(-10px)",
                        color: "rgba(245, 34, 45, 1)",
                        fontSize: "14px",
                      }}
                    >
                      {errors.body.message}
                    </p>
                  )}
                </>
              ) : null}
            </div>
            <div className={styles.createTags}>
              <h2 className={styles.tags}>Tags</h2>
              {tags.map((item, index) => (
                <div key={index}>
                  <input
                    readOnly
                    value={item}
                    className={styles.cerateTag}
                    type="text"
                    placeholder="Tag"
                  />
                  <button
                    type="button"
                    className={styles.delete}
                    onClick={() =>
                      setTags(tags.filter((_item, i) => i !== index))
                    }
                  >
                    Delete
                  </button>
                </div>
              ))}
              <input
                ref={inputRef}
                className={styles.cerateTag}
                type="text"
                placeholder="Tag"
              />

              <button
                type="button"
                className={styles.delete}
                onClick={cleanInputValue}
              >
                Delete
              </button>
              <button
                type="button"
                className={styles.add}
                onClick={addTagByEditing}
              >
                Add tag
              </button>
            </div>
            <button className={styles.send}>Send</button>
          </form>
        </div>
      </div>
    </>
  );
};
