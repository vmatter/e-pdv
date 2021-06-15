export function currencyFormatter(value: any) {
  if (!Number(value)) return 'R$ 0,00';

  const amount = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);

  return amount;
}
