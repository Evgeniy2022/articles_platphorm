import { FC, useRef, useState,  } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import styles from "./NewArticle.module.css";
import { createArticle } from "../../api";
import { createNewArticle } from "../../redux/slices/articlesSlice";
import { useDispatch } from "react-redux";


interface ICreateArticle {
  title: string;
  description: string;
  body: string;
  tags: string[];
}

export const NewArticle: FC = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<ICreateArticle>();

  const [tags, setTags] = useState<string[]>([]);

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const inputRef = useRef<HTMLInputElement>(null);

  async function hanleSubmitCreateForm(data: ICreateArticle) {
    try {
      const res = await createArticle(
        data.title,
        data.description,
        data.body,
        tags
      );
		dispatch(createNewArticle(res.article))
		navigate("/");
    } catch (err) {
      console.error(err);
    }
  }

  function addTagToArray() {
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
    <div className={styles.body}>
      <div className={styles.container}>
        <h1 className={styles.title}>Create new article</h1>
        <form onSubmit={handleSubmit(hanleSubmitCreateForm)}>
          <div className={styles.createTitle}>
            <label className={styles.labTitle} htmlFor="title">
              Title
            </label>
            <input
              className={styles.inputTitle}
              type="text"
              id="title"
              placeholder="Title"
              {...register("title", {
                required: true,
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
              className={styles.inputDesc}
              type="text"
              id="description"
              placeholder="Description"
              {...register("description", {
                required: true,
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
              className={styles.areaText}
              id="text"
              placeholder="Text"
              {...register("body", {
                required: true,
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
              onClick={addTagToArray}
            >
              Add tag
            </button>
          </div>
          <button className={styles.send}>Send</button>
        </form>
      </div>
    </div>
  );
};
