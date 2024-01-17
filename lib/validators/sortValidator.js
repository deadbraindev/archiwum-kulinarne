export const sortArray = ['', 'on', 'no', 'za'];

export const sortValidator = (param) => {
  if (param === null || param === undefined || !sortArray.includes(param))
    return false;
  return true;
};
