import { auth } from "../firebase";

export const getRequest = async (url: string) => {
  const token = await auth.currentUser?.getIdToken(true);

  const response = await fetch("http://127.0.0.1:5173/" + url, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      authorization: "Bearer " + token!,
    },
  });
  return response;
};

export const postRequest = async (url: string, content: any) => {
  const token = await auth.currentUser?.getIdToken(true);

  let requestInit = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      authorization: "Bearer " + token!,
    },
    body: JSON.stringify(content),
  };

  const response = await fetch("http://127.0.0.1:5173/" + url, requestInit);
  return response;
};

export const putRequest = async (url: string, content: any) => {
  const token = await auth.currentUser?.getIdToken(true);

  const response = await fetch("http://127.0.0.1:5173/" + url, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      authorization: "Bearer " + token!,
    },
    body: JSON.stringify(content),
  });
  return response;
};

export const deleteRequest = async (url: string) => {
  const token = await auth.currentUser?.getIdToken(true);

  const response = await fetch("http://127.0.0.1:5173/" + url, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      authorization: "Bearer " + token!,
    },
  });
  return response;
};
