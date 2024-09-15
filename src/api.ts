export function getPost(page: number) {
  return fetch(
    `https://blog.kata.academy/api/articles?offset=${page * 20}`
  ).then((res) => {
    if (res.ok) {
      return res.json();
    }
  });
}

export function getArticleBySlug(slug: string | undefined) {
  return fetch(`https://blog.kata.academy/api/articles/${slug}`).then((res) => {
    if (res.ok) {
      return res.json();
    }
  });
}

export function loginUser(email: string, password: string) {
  return fetch(`https://blog.kata.academy/api/users/login`, {
    method: "POST",
    body: JSON.stringify({ user: { email, password } }),
    headers: {
      "Content-Type": "application/json",
    },
  })
}

export function registratiomNewUser(
  username: string,
  email: string,
  password: string
) {
  return fetch(`https://blog.kata.academy/api/users`, {
    method: "POST",
    body: JSON.stringify({ user: { username, email, password } }),
    headers: {
      "Content-Type": "application/json",
    },
  })
}

export function getUser(token: string) {
  return fetch(`https://blog.kata.academy/api/user`, {
    method: "GET",
    headers: {
      Authorization: `Token ${token}`,
    },
  }).then((res) => {
    return res.json();
  });
}

export function editingUserData(
  username: string,
  email: string,
  password: string,
  image: string
) {
  return fetch(`https://blog.kata.academy/api/user`, {
    method: "PUT",
    body: JSON.stringify({ user: { username, email, password, image } }),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${JSON.parse(localStorage.getItem("token") || "")}`,
    },
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
  });
}

export function createArticle(
  title: string,
  description: string,
  body: string,
  tagList: string[]
) {
  return fetch(`https://blog.kata.academy/api/articles `, {
    method: "POST",
    body: JSON.stringify({ article: { title, description, body, tagList } }),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${JSON.parse(localStorage.getItem("token") || "")}`,
    },
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
  });
}

export function deleteArticle(slug: string) {
  return fetch(`https://blog.kata.academy/api/articles/${slug}`, {
    method: "DELETE",
    headers: {
      Authorization: `Token ${JSON.parse(localStorage.getItem("token") || "")}`,
    },
  });
}

export function editMyArticle(
  slug: string,
  title: string,
  description: string,
  body: string
) {
  return fetch(`https://blog.kata.academy/api/articles/${slug}`, {
    method: "PUT",
    body: JSON.stringify({ article: { title, description, body } }),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${JSON.parse(localStorage.getItem("token") || "")}`,
    },
  }).then((res)=>res.json())
}

export function favoriteSlugArticle(
  slug: string,
) {
  return fetch(`https://blog.kata.academy/api/articles/${slug}/favorite `, {
    method: "POST",
    headers: {
      Authorization: `Token ${JSON.parse(localStorage.getItem("token") || "")}`,
    },
  })
}

export function deleteSlugArticle(slug: string) {
  return fetch(`https://blog.kata.academy/api/articles/${slug}/favorite `, {
    method: "DELETE",
    headers: {
      Authorization: `Token ${JSON.parse(localStorage.getItem("token") || "")}`,
    },
  });
}
