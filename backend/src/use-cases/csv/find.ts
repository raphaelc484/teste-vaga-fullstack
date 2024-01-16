import { CSVRepository } from '../../repositories/csv-repository'
import { formatedCoinBRL } from '../../utils/exchange-rate'
import { formatDateToString } from '../../utils/format-date'
import { formatCpfCnpj } from '../../utils/identify-cpf-cnpj'
import { validatePaymentConsistency } from '../../utils/validatePayment'

interface ResultProps {
  id: string
  nrCpfCnpj: string
  qtPrestacoes: string
  vlMora: string
  vlPag: string
  vlMovimento: string
  vlPresta: string
  vlTotal: string
  dtPag: string
  dtContrato: string
  dtVctPre: string
  isConsistent: boolean
}

interface SearchProps {
  query: string
  page: number
}

export class FindUseCase {
  constructor(private csvRepository: CSVRepository) {}

  async execute({ query, page }: SearchProps): Promise<ResultProps[]> {
    const result = await this.csvRepository.findMany(query, page)

    const resultFormated = result.map((item) => {
      const data = {
        id: item.id,
        nrCpfCnpj: formatCpfCnpj(item.nrCpfCnpj),
        qtPrestacoes: item.qtPrestacoes.toString(),
        vlMora: formatedCoinBRL(Number(item.vlMora)),
        vlPag: formatedCoinBRL(Number(item.vlPag)),
        vlMovimento: formatedCoinBRL(Number(item.vlMovimento)),
        vlPresta: formatedCoinBRL(Number(item.vlPresta)),
        vlTotal: formatedCoinBRL(Number(item.vlTotal)),
        dtPag: formatDateToString(item.dtPag),
        dtContrato: formatDateToString(item.dtContrato),
        dtVctPre: formatDateToString(item.dtVctPre),
        isConsistent: validatePaymentConsistency(item),
      }

      return data
    })

    return resultFormated
  }
}
