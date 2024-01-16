import { cleanNonNumericCharacters } from '../../utils/identify-cpf-cnpj'
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
  dtPag: Date
  dtContrato: Date
  dtVctPre: Date
}

export class PrismaCSVRepository implements CSVRepository {
  async findMany(query: string, page: number): Promise<Info[]> {
    const prisma = new PrismaClient()

    const result = await prisma.info.findMany({
      where: {
        nrCpfCnpj: { contains: cleanNonNumericCharacters(query) },
      },
      take: 20,
      skip: (page - 1) * 20,
    })

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
