import { Info } from '@prisma/client'
import { CSVRepository } from '../../repositories/csv-repository'

export class FindUseCase {
  constructor(private csvRepository: CSVRepository) {}

  async execute(): Promise<Info[]> {
    const result = this.csvRepository.findMany()

    return result
  }
}
