export const pageValidator = (param) => {
  const paramToINT = parseInt(param, 10); // zmiana ze stringa na intiger w systemie dziesietnym
  if (param > 0 && !Number.isNaN(paramToINT)) return true;
  return false;
};
