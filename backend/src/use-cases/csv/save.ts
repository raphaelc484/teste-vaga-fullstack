import csv from 'csv-parser'
import { parseDate } from '../../utils/format-date'
import { identifyCPFCNPJ } from '../../utils/identify-cpf-cnpj'
import { Readable } from 'stream'
import { CSVRepository } from '../../repositories/csv-repository'

interface CSVprops {
  nrCpfCnpj: string
  vlPresta: number
  vlMora: number
  qtPrestacoes: number
  vlMovimento: number
  vlPag: number
  vlTotal: number
  dtContrato: Date
  dtVctPre: Date
}

export class SaveUseCase {
  constructor(private csvRepository: CSVRepository) {}

  async execute(data: string) {
    const dataCSV: CSVprops[] = []
    try {
      const stream = Readable.from([data])

      await new Promise<void>((resolve, reject) => {
        stream
          .pipe(csv())
          .on('data', (row) => {
            if (row.nrCpfCnpj) {
              row.nrCpfCnpj = identifyCPFCNPJ(row.nrCpfCnpj)
            }
            if (row.vlPresta) {
              row.vlPresta = Number(row.vlPresta)
            }
            if (row.vlMora) {
              row.vlMora = Number(row.vlMora)
            }
            if (row.qtPrestacoes) {
              row.qtPrestacoes = Number(row.qtPrestacoes)
            }
            if (row.vlMovimento) {
              row.vlMovimento = Number(row.vlMovimento)
            }
            if (row.vlPag) {
              row.vlPag = Number(row.vlPag)
            }
            if (row.vlTotal) {
              row.vlTotal = Number(row.vlTotal)
            }
            if (row.dtContrato) {
              row.dtContrato = parseDate(row.dtContrato)
            }
            if (row.dtVctPre) {
              row.dtVctPre = parseDate(row.dtVctPre)
            }
            dataCSV.push(row)
          })
          .on('end', () => {
            resolve()
          })
          .on('error', (error) => {
            reject(error)
          })
      })
      await this.csvRepository.save(dataCSV)
    } catch (error) {
      console.error('Erro ao ler o arquivo CSV:', error)
      throw error
    }
  }
}
