import { Info } from '@prisma/client'

export function validatePaymentConsistency(info: Info): boolean {
  const vlTotal = Number(info.vlTotal)
  const qtPrestacoes = Number(info.qtPrestacoes)
  const vlPresta = Number(info.vlPresta)
  const vlMovimento = Number(info.vlMovimento)
  const vlPag = Number(info.vlPag)
  const dtVctPre = new Date(info.dtVctPre)
  const dtPag = new Date(info.dtPag)

  const calculatedVlPresta = Math.floor(vlTotal / qtPrestacoes)
  const approxTotal = Math.floor(vlTotal)
  const isMovimentoInconsistent = vlMovimento > vlPag
  const isLatePayment = dtPag > dtVctPre
  const isConsistent =
    calculatedVlPresta === vlPresta &&
    approxTotal === vlTotal &&
    !isMovimentoInconsistent &&
    !isLatePayment

  return isConsistent
}
