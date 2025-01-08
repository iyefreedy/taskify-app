export const formatDate = (date: string) => {
  const d = new Date(date);
  return d.toLocaleString("id-ID", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};
