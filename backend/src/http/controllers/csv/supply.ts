import { Request, Response } from 'express'
import { PrismaCSVRepository } from '../../../repositories/prisma/prisma-csv-repository'
import { FindUseCase } from '../../../use-cases/csv/find'

export async function supply(request: Request, response: Response) {
  const csvRepository = new PrismaCSVRepository()
  const find = new FindUseCase(csvRepository)
  const result = await find.execute()

  return response.json(result)
}
