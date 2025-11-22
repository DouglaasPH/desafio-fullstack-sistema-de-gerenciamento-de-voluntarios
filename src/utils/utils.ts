import { AsYouType } from "libphonenumber-js";

export const validateEmail = (value: string) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(value);
};

export function validateTelefone(phone: string): boolean {
  // Remove qualquer formatação
  const digits = phone.replace(/\D/g, "");

  // Deve ter exatamente 11 dígitos
  if (digits.length !== 11) return false;

  // Pega o número nacional sem o país
  const national = digits.slice(2); // ex: 936258427

  // Deve ter 9 dígitos (9 número)
  if (national.length !== 9) return false;

  // O número deve começar com 9 (móvel)
  if (!national.startsWith("9")) return false;

  return true;
}

export function formatTelefone(value: string) {
  const formatter = new AsYouType("BR");
  return formatter.input(value);
}

export function formatData(dataString: string) {
  const date = new Date(dataString);

  // Pega os valores corrigindo o offset de timezone
  const day = String(date.getUTCDate()).padStart(2, "0");
  const month = String(date.getUTCMonth() + 1).padStart(2, "0");
  const year = date.getUTCFullYear();

  return `${day}/${month}/${year}`;
}
