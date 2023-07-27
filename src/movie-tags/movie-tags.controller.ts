import {Body, Controller, Delete, Get, Post, Put} from '@nestjs/common'
import {MovieTagsService} from './movie-tags.service'
import {ApiBody, ApiTags} from '@nestjs/swagger'
import {ProfileService} from 'src/profile/profile.service'
import {UpdateTagDto} from './dto/update-tag.dto'
import {TagsDto} from './dto/tags.dto'

@ApiTags('movie-tags')
@Controller('movie_tags')
export class MovieTagsController {
  constructor(
    private readonly movieTagsService: MovieTagsService,
    private readonly profileService: ProfileService
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

  @ApiBody({type: TagsDto})
  @Delete('delete_movie_tag')
  async deleteMovieTag(@Body() body: TagsDto) {
    return this.movieTagsService.deleteTag(body.tagName)
  }

  @ApiBody({type: UpdateTagDto})
  @Put('update_tags')
  async updateTags(@Body() body: UpdateTagDto): Promise<TagsDto[]> {
    return this.movieTagsService.updateTag(body)
  }

  @ApiBody({type: UpdateTagDto})
  @Put('update_movie_tags')
  async updateMovieTags(@Body() body: UpdateTagDto) {
    const movies = this.profileService.getMovies()
    const moviesWithNewTags = this.movieTagsService.updateMovieTags(body, movies)

    return this.profileService.updateAllMovie(moviesWithNewTags)
  }
}
