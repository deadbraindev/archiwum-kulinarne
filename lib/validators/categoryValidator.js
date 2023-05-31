export const categoryArray = [
  'ciasta',
  'slodkie',
  'salatki',
  'soki',
  'obiadowe',
  'przetwory',
  'ryby',
  'drinki',
  'lody',
  'fastfood',
];

export const categoryValidator = (param) => {
  if (
    param === null ||
    param === undefined ||
    param === '' ||
    !categoryArray.includes(param)
  )
    return false;
  return true;
};
