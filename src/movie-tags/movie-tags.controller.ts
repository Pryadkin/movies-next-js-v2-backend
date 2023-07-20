import {Controller, Get} from '@nestjs/common'
import {MovieTagsService} from './movie-tags.service'
import {ApiTags} from '@nestjs/swagger'

@ApiTags('movie-tags')
@Controller('movie_tags')
export class MovieTagsController {
  constructor(private readonly movieTagsService: MovieTagsService) { }

  @Get('get_movie_tags')
  async getMovieTags() {
    return this.movieTagsService.getMovieTags()
  }
}
