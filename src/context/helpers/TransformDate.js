export default function TransformDate(date) {
  
    const selectedDate = new window.Date(date);
  const getFullYear = selectedDate.getFullYear();
  const getMonth = (selectedDate.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-indexed, so we add 1
  const getDay = selectedDate.getDate().toString().padStart(2, '0'); // Ensure day is two digits
  return `${getFullYear}-${getMonth}-${getDay}`;

}
