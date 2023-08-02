export const API_END_POINT = "https://kdt-frontend.programmers.co.kr";

const request = async (url, options = {}) => {
  try {
    const res = await fetch(`${API_END_POINT}${url}`, {
      ...options,
    });

    if (res.ok) return await res.json();
    throw new Error("API 처리 중 오류가 발생하였습니다!");
  } catch (e) {
    console.error(e);
  }
};

const headers = (username) => {
  return { "x-username": username, "Content-Type": "application/json" };
};

export const getApi = async (username, id = "") => {
  return await request(`/documents/${id}`, {
    headers: headers(username),
  });
};

export const postApi = async (username, id = null) => {
  return await request(`/documents`, {
    headers: headers(username),
    method: "POST",
    body: JSON.stringify({
      title: "새 문서",
      parent: id,
    }),
  });
};

export const putApi = async (username, id, title, content) => {
  return await request(`/documents/${id}`, {
    headers: headers(username),
    method: "PUT",
    body: JSON.stringify({
      title,
      content,
    }),
  });
};

export const deleteApi = async (username, id) => {
  return await request(`/documents/${id}`, {
    headers: headers(username),
    method: "DELETE",
  });
};
