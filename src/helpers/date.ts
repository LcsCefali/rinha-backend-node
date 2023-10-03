import parse from 'date-fns/parse';
import locale from 'date-fns/locale/pt-BR';
import isValid from 'date-fns/isValid';

export const formatDateString = (date: string) => {
  return parse(date, 'yyyy-MM-dd', new Date(), { locale })
}

export const isValidDateString = (date: string) => {
  const parsed = formatDateString(date);
  return isValid(parsed);
}

export const isValidDate = (date: Date) => {
  return isValid(date);
}