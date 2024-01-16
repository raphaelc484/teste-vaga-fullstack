import { CSVRepository } from '../csv-repository'
import { Info, PrismaClient } from '@prisma/client'

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

export class PrismaCSVRepository implements CSVRepository {
  async findMany(): Promise<Info[]> {
    const prisma = new PrismaClient()

    const result = await prisma.info.findMany()

    return result
  }

  async save(dataCSV: CSVprops[]): Promise<void> {
    const prisma = new PrismaClient()
    try {
      await prisma.info.createMany({
        data: dataCSV,
      })
    } catch (error) {
      console.error('Erro ao inserir dados:', error)
    } finally {
      await prisma.$disconnect()
    }
  }
}
