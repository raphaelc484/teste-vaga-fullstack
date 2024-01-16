export function validateCPF(cpf: string): boolean {
  cpf = cpf.replace(/\D/g, '')

  if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) {
    return false
  }

  let soma = 0
  for (let i = 0; i < 9; i++) {
    soma += parseInt(cpf[i]) * (10 - i)
  }

  const resto = soma % 11
  const digito1 = resto < 2 ? 0 : 11 - resto

  soma = 0
  for (let i = 0; i < 10; i++) {
    soma += parseInt(cpf[i]) * (11 - i)
  }

  const resto2 = soma % 11
  const digito2 = resto2 < 2 ? 0 : 11 - resto2

  return cpf.slice(-2) === digito1.toString() + digito2.toString()
}
