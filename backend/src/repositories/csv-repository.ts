import { Info } from '@prisma/client'

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

export interface CSVRepository {
  save(dataCSV: CSVprops[]): Promise<void>
  findMany(): Promise<Info[]>
}
