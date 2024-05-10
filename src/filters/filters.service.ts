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
    const isExistGenre = await this.findOneGenre(genreId)

    if (!isExistGenre) {
      await this.createGenre(genreId, genreName)
    } else {
      await this.deleteGenre(genreId)
    }

    return await this.findManyGenre()
  }

  findManyGenre() {
      return this.dbService.genre.findMany({
        select: {
          genreId: true,
          name: true,
        },
      })
  }

  findManyTag() {
      return this.dbService.tag.findMany({
        select: {
          tagName: true,
          isGroup: true,
          color: true,
        },
      })
  }

  findOneGenre(genreId: number) {
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

  findOneTag(tagName: string) {
    return this.dbService.filters.findFirst({
      where: {
        tags: {
          some: {
            tagName,
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

  createTag(tagName: string, isGroup: boolean, color: string) {
    return this.dbService.filters.create({
      data: {
        tags: {
          create: [
            {
              tagName,
              isGroup,
              color,
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

  deleteTag(tagName: string) {
    return this.dbService.tag.delete({
      where: {
        tagName,
      },
    })
  }
}