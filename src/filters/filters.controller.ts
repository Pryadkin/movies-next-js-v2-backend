import {Body, Controller, Post} from '@nestjs/common'
import {ApiTags} from '@nestjs/swagger'
import {SetGenreDto} from './dto/set-genre.dto'
import {FilterService} from './filters.service'

@ApiTags('filters')
@Controller('filters')
export class FilterController {
  constructor(
    private readonly filterService: FilterService,
  ) { }

  @Post('by-genre')
  async byGenre(@Body() genre: SetGenreDto) {
    const isExistGenre = await this.filterService.findOne(genre.genreId)

    if (!isExistGenre) {
      await this.filterService.createGenre(genre.genreId, genre.name)
    } else {
      await this.filterService.deleteGenre(genre.genreId)
    }

    return await this.filterService.findMany()
  }
}
