export const getToken = (key: string): string | null => {
  const cookies = document.cookie.split("; ");
  const token = cookies.find((row) => row.startsWith(`${key}=`));
  return token ? token.split("=")[1] : null;
};
