import {Body, Controller, Delete, Get, Post, Put} from '@nestjs/common'
import {MovieTagsService} from './movie-tags.service'
import {ApiBody, ApiTags} from '@nestjs/swagger'
import {UpdateTagDto} from './dto/update-tag.dto'
import {TagsDto} from './dto/tags.dto'

@ApiTags('movie-tags')
@Controller('movie_tags')
export class MovieTagsController {
  constructor(
    private readonly movieTagsService: MovieTagsService,
  ) { }

  @Get('get_movie_tags')
  async getMovieTags() {
    return this.movieTagsService.getTags()
  }

  @ApiBody({type: TagsDto})
  @Post('add_movie_tag')
  async addMovieTag(@Body() body: TagsDto) {
    return this.movieTagsService.addTag(body)
  }

  @ApiBody({type: UpdateTagDto})
  @Put('update_tags')
  async updateTags(@Body() body: UpdateTagDto): Promise<TagsDto[]> {
    return this.movieTagsService.updateTag(body)
  }

  @ApiBody({type: TagsDto})
  @Delete('delete_tag')
  async deleteMovieTag(@Body() body: TagsDto) {
    return this.movieTagsService.deleteTag(body.tagName)
  }
}
