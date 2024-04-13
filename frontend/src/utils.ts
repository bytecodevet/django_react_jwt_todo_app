import React from "react";
import { SetStateFunction, Token } from "./types";

export const onChange = (
  event: React.FormEvent<HTMLInputElement>,
  setValueFunction: (value: string) => void
) => {
  setValueFunction(event.currentTarget.value);
}

interface objectToFormDataProp {
  [key: string]: string | boolean;
}

export function objectToFormData(obj: objectToFormDataProp): FormData {
  const formData = new FormData();
  for (let key in obj) {
    formData.append(key, JSON.stringify(obj[key]));
  }
  return formData;
}

export function refreshTokenFunction(
  refresh: string,
  setAccess: SetStateFunction
) {
  fetch(`${baseUrl}/api/user/token/refresh/`, {
    method: "POST",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({refresh}),
  }).then(response => response.json() as Promise<Token>)
  .then(json => {
    console.log('Refresh');
    console.log(json.access);
    setAccess(json.access);
  })
}

export const baseUrl = process.env.baseUrl ?? '';