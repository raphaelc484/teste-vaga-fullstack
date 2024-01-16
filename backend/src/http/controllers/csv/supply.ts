import { Request, Response } from 'express'
import { PrismaCSVRepository } from '../../../repositories/prisma/prisma-csv-repository'
import { FindUseCase } from '../../../use-cases/csv/find'
import { z } from 'zod'

export async function supply(request: Request, response: Response) {
  const csvRepository = new PrismaCSVRepository()
  const find = new FindUseCase(csvRepository)
  const searchSchema = z.object({
    q: z.string(),
    page: z.coerce.number().min(1).default(1),
  })
  const { q, page } = searchSchema.parse(request.query)
  const result = await find.execute({ query: q, page })

  return response.json(result)
}
