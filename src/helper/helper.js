export const formatDate = (isoDate) => {
    if(!isoDate) return null;
  const date = new Date(isoDate);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

export function formatIndianNumber(price) {
  const number = Number(price);
  if (isNaN(number)) return String(price);
  return number.toLocaleString("en-IN").toString();
}
