import { validateCNPJ } from './validate-cnpj'
import { validateCPF } from './validate-cpf'

export function identifyCPFCNPJ(doc: string): string {
  const cleanNumber = doc.replace(/\D/g, '')

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
