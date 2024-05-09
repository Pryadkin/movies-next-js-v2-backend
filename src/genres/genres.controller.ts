import {Controller, Get} from '@nestjs/common'
import {ApiTags} from '@nestjs/swagger'
import {GenresService} from './genres.service'

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
}
