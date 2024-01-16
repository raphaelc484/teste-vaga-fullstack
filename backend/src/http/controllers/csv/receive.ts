import { Request, Response } from 'express'
import { SaveUseCase } from '../../../use-cases/csv/save'
import { PrismaCSVRepository } from '../../../repositories/prisma/prisma-csv-repository'

export async function receive(request: Request, response: Response) {
  try {
    if (!request.file) {
      response.status(400).send('Nenhum arquivo enviado.')
      return
    }

    const memoryCSV = request.file.buffer.toString('utf-8')

    const csvRepository = new PrismaCSVRepository()
    const save = new SaveUseCase(csvRepository)
    await save.execute(memoryCSV)

    return response.json('Upload finalizado')
  } catch (error) {
    console.error(error)
    response.status(500).send('Erro ao processar o arquivo CSV.')
  }
}
