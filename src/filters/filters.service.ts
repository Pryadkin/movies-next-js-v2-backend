import {Injectable} from '@nestjs/common'

import {DbService} from 'src/db/db.service'

interface IGenreFilter  {
  genreId: number;
  name: string;
}

@Injectable()
export class FilterService {
    constructor(
        private readonly dbService: DbService,
    ) { }

    async setGenre(genreId: number, genreName: string): Promise<IGenreFilter[]> {
      const isExistGenre = await this.findOne(genreId)

      if (!isExistGenre) {
        await this.createGenre(genreId, genreName)
      } else {
        await this.deleteGenre(genreId)
      }

      return await this.findMany()
    }

    findMany() {
        return this.dbService.genre.findMany({
          select: {
            genreId: true,
            name: true,
          },
        })
    }

    findOne(genreId: number) {
        return this.dbService.filters.findFirst({
          where: {
            genres: {
              some: {
                genreId,
              },
            },
          },
        })
      }

      createGenre(genreId: number, name: string) {
        return this.dbService.filters.create({
          data: {
            genres: {
              create: [
                {
                  genreId,
                  name,
                },
              ],
            },
          }
        })
      }

      deleteGenre(genreId: number) {
        return this.dbService.genre.delete({
          where: {
            genreId,
          },
        })
      }
}