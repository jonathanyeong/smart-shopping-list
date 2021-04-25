export const normalizedItem = (item) => {
  return item
    .trim()
    .toLowerCase()
    .replace(/[^\w\s]/g, '');
};

export const validItem = (item) => {
  return item.trim().length > 0;
};
