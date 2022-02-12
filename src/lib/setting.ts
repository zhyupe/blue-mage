export const loadSetting = <T>(key: string): T | undefined => {
  let text;
  if (localStorage) {
    text = localStorage.getItem(key);
  } else {
    const cookie = document.cookie;
    let pos = cookie.indexOf(key + "=");
    if (pos >= 0) {
      pos += key.length + 1;
      const endPos = cookie.indexOf(";", pos);
      text = cookie.substr(pos, endPos === -1 ? undefined : endPos - pos);
    }
  }

  if (!text) return;

  try {
    return JSON.parse(text);
  } catch (e) {
    return;
  }
};

export const saveSetting = <T>(key: string, value: T) => {
  const text = JSON.stringify(value);

  if (localStorage) {
    localStorage.setItem(key, text);
  } else {
    const expire = new Date();
    expire.setFullYear(expire.getFullYear() + 10);
    document.cookie = `${key}=${text};expires=${expire.toUTCString()};path=/`;
  }
};
