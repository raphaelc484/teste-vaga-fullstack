export function formatedCoinBRL(valor: number): string {
  const optionFormat = {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }

  const formatBRL = new Intl.NumberFormat('pt-BR', optionFormat)
  return formatBRL.format(valor)
}
