import {Body, Controller, Get, Post} from '@nestjs/common'
import {ApiTags} from '@nestjs/swagger'
import {GenresService} from './genres.service'
import {SetGenreDto} from './dto/set-genre.dto'

@ApiTags('genres')
@Controller('genres')
export class GenresController {
  constructor(
    private readonly genresService: GenresService,
  ) { }

  @Get('get_genres')
  async getGenresTags() {
    return this.genresService.getGenres()
  }

  @Post('set-genre')
  async setGenre(@Body() genre: SetGenreDto) {
    return this.genresService.setGenre(genre)
  }
}
