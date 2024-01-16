import { validateCNPJ } from './validate-cnpj'
import { validateCPF } from './validate-cpf'

export function identifyCPFCNPJ(doc: string): string {
  const cleanNumber = cleanNonNumericCharacters(doc)

  if (cleanNumber.length === 11) {
    if (!validateCPF(cleanNumber)) {
      return 'CPF inválido'
    }
    return cleanNumber
  } else if (cleanNumber.length === 14) {
    if (!validateCNPJ(cleanNumber)) {
      return 'CNPJ inválido'
    }
    return cleanNumber
  } else {
    return 'Inválido'
  }
}

export function formatCpfCnpj(input: string): string {
  const cleanedInput = cleanNonNumericCharacters(input)

  if (cleanedInput.length === 11) {
    return cleanedInput.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4')
  } else if (cleanedInput.length === 14) {
    return cleanedInput.replace(
      /(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/,
      '$1.$2.$3/$4-$5',
    )
  } else {
    return input
  }
}

export function cleanNonNumericCharacters(input: string): string {
  return input.replace(/\D/g, '')
}
