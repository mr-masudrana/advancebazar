export const taka = (n: number) => `৳${new Intl.NumberFormat("en-US").format(n)}`;

export function whatsappUrl(phone: string, message: string) {
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}