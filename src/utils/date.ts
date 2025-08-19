export const normalizeDateForInput = (value: string): string => {
  if (!value) return "";

  const date = new Date(value);

  if (isNaN(date.getTime())) {
    // Si no se pudo parsear, lo devolvemos como está
    return value;
  }

  // Generar en formato `YYYY-MM-DDTHH:mm`
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  return `${year}-${month}-${day}T${hours}:${minutes}`;
};
