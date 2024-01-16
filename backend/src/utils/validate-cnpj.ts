export function validateCNPJ(cnpj: string): boolean {
  cnpj = cnpj.replace(/\D/g, '')

  if (cnpj.length !== 14 || /^(\d)\1+$/.test(cnpj)) {
    return false
  }

  let soma = 0
  const pesos = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]
  for (let i = 0; i < 12; i++) {
    soma += parseInt(cnpj[i]) * pesos[i]
  }

  const resto = soma % 11
  const digito1 = resto < 2 ? 0 : 11 - resto

  soma = 0
  const pesos2 = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]
  for (let i = 0; i < 13; i++) {
    soma += parseInt(cnpj[i]) * pesos2[i]
  }

  const resto2 = soma % 11
  const digito2 = resto2 < 2 ? 0 : 11 - resto2

  return cnpj.slice(-2) === digito1.toString() + digito2.toString()
}
