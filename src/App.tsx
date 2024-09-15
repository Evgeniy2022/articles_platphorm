import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { SignIn } from "./pages/SignIn";
import { SignUp } from "./pages/SignUp";
import { Profile } from "./pages/Profile";
import { Articles } from "./pages/Articles";
import { NotFound } from "./pages/NotFound";
import { Article } from "./pages/Article";
import { UseAuth } from "./hooks/UseAuth";

import "./App.css";
import { getPost } from "./api";
import { PageNewArticle } from "./pages/PageNewArticle";
import { Header } from "./components/Header/Header";
import { useDispatch, useSelector } from "react-redux";
import { setArticles } from "./redux/slices/articlesSlice";
import { RootState } from "./redux/store";
import { EditArticle } from "./components/EditArticle/EditArticle";

function App() {
  const articles = useSelector(
    (state: RootState) => state.articleSlice.articles
  );

  const [page, setPage] = useState(0);
  const [pagesAll, setPagesAll] = useState(0);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const auth = UseAuth();
  
  useEffect(() => {
    getPost(page)
      .then((data) => {
        setPagesAll(data.articlesCount);
        dispatch(setArticles(data.articles));
      })
      .catch((err) => {
        throw new Error(err);
      });
  }, [page]);

  useEffect(() => {
    auth()
      .then(() => {})
      .catch(() => navigate("/sign-in"));
  }, [navigate]);

  

  return (
    <>
      <Header />
      <main className="main">
        <Routes>
          <Route
            path="/"
            element={
              <Articles
                articles={articles}
                page={page}
                setPage={setPage}
                pagesAll={pagesAll}
              />
            }
          />
          <Route path="/articles/:slug" element={<Article />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/edit/:slug" element={<EditArticle />} />
          <Route path="/new-article" element={<PageNewArticle />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
