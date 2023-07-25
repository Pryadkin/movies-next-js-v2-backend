import {Body, Controller, Get, Post} from '@nestjs/common'
import {MovieTagsService} from './movie-tags.service'
import {ApiBody, ApiTags} from '@nestjs/swagger'
import {AddTagDto} from './dto/add-tag.dto'

@ApiTags('movie-tags')
@Controller('movie_tags')
export class MovieTagsController {
  constructor(private readonly movieTagsService: MovieTagsService) { }

  @Get('get_movie_tags')
  async getMovieTags() {
    return this.movieTagsService.getTags()
  }

  @ApiBody({type: AddTagDto})
  @Post('add_movie_tag')
  async addMovieTag(@Body() {name}: AddTagDto) {
    return this.movieTagsService.addTag(name)
  }

  @ApiBody({type: AddTagDto})
  @Post('delete_movie_tag')
  async deleteMovieTag(@Body() {name}: AddTagDto) {
    return this.movieTagsService.deleteTag(name)
  }
}
