import { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { IArticle } from "../types";
import { getArticleBySlug } from "../api";
import { ArticleWithoutAuth } from "../components/ArticleWithoutAuth/ArticleWithoutAuth";

export const Article: FC = () => {
  const params = useParams();
  const [slug, setSlug] = useState<IArticle>({
    author: {
      username: "",
      image: "",
      following: false,
      bio: "",
    },
    body: "",
    createdAt: "",
    description: "",
    favorited: false,
    favoritesCount: 0,
    slug: "",
    tagList: [],
    title: "",
    updatedAt: "",
  });

  useEffect(() => {
    getArticleBySlug(params.slug).then((data) => setSlug(data.article));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <ArticleWithoutAuth slug={slug} />;
};
