import { Info } from '@prisma/client'

interface CSVprops {
  nrCpfCnpj: string
  vlPresta: number
  vlMora: number
  qtPrestacoes: number
  vlMovimento: number
  vlPag: number
  vlTotal: number
  dtPag: Date
  dtContrato: Date
  dtVctPre: Date
}

export interface CSVRepository {
  save(dataCSV: CSVprops[]): Promise<void>
  findMany(query: string, page: number): Promise<Info[]>
}
