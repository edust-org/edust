export default () => {
  const isData = localStorage.getItem("gjsProject");

  if (!isData) return null;

  const data = JSON.parse(isData || "{}");
  let check = data?.pages;

  if (!check) return null;

  check = check[0]?.frames;

  if (!check) return null;

  check = check[0];

  if (!check) return null;

  check = check?.component.components;

  if (!check) return null;

  return data;
};
