import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cN(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: string | Date): string {
  return new Intl.DateTimeFormat('fi-FI', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(new Date(date));
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[åäö]/g, (match) => {
      const map: { [key: string]: string } = { 'å': 'a', 'ä': 'a', 'ö': 'o' };
      return map[match] || match;
    })
    .replace(/[^a-z0-9 -]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}