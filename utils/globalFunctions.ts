import { CookieValueTypes, getCookie, setCookie } from "cookies-next";
import { useEffect, useLayoutEffect } from "react";

const timeDiff = (date: Date) => {
  const now = new Date();
  date = new Date(date);
  const diff = Math.abs(now.getTime() - date.getTime());
  const diffDays = Math.floor(diff / (1000 * 3600 * 24));
  const diffHours = Math.floor(diff / (1000 * 3600));
  const diffMinutes = Math.floor(diff / (1000 * 60));
  const diffSeconds = Math.floor(diff / 1000);

  if (diffDays > 0) {
    return `${diffDays}d`;
  } else if (diffHours > 0) {
    return `${diffHours}h`;
  } else if (diffMinutes > 0) {
    return `${diffMinutes}m`;
  } else if (diffSeconds > 0) {
    return `${diffSeconds}s`;
  } else {
    return "now";
  }
};

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

const parseReadCookies = (cookie: CookieValueTypes) => {
  if (typeof cookie === "boolean") return {};
  if (!cookie) return {};
  //cookie will be in the form [id]=[amount],[id]=[amount]
  const parsedCookie = cookie.split(",");
  let parsedCookieObj = {};
  for (let i = 0; i < parsedCookie.length; i++) {
    if (parsedCookie[i] === "") continue;
    const [id, amount] = parsedCookie[i].split("=");
    if (isNaN(parseInt(amount))) continue;
    const intId = parseInt(id);
    const intAmount = parseInt(amount);
    parsedCookieObj[intId] = intAmount;
  }
  return parsedCookieObj;
};

const setReadCookies = (key: number, value: number) => {
  if (!key) return;
  const cookie = getCookie("readPosts");
  const parsedCookie = parseReadCookies(cookie);

  parsedCookie[key] = value;

  let cookieString = "";

  for (const [id, amount] of Object.entries(parsedCookie)) {
    cookieString += `${id}=${amount},`;
  }

  setCookie("readPosts", cookieString);
};

export default timeDiff;
export { useIsomorphicLayoutEffect };

export { parseReadCookies, setReadCookies };
