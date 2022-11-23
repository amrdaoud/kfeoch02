export function getLocaleDate(dateString: string | Date | null | undefined): Date | string{
  if(!dateString) {
    return '';
  }
  const date = new Date(dateString!);
  console.log(date);
  const result = new Date(date.setMinutes(date.getMinutes() - date.getTimezoneOffset()));
  return result;
}
