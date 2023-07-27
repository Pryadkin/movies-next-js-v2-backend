import {Body, Controller, Get, Post, Put} from '@nestjs/common'
import {MovieTagsService} from './movie-tags.service'
import {ApiBody, ApiTags} from '@nestjs/swagger'
import {AddTagDto} from './dto/add-tag.dto'
import {ProfileService} from 'src/profile/profile.service'
import {UpdateTagDto} from './dto/update-tag.dto'

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

  @ApiBody({type: UpdateTagDto})
  @Put('update_tags')
  async updateTags(@Body() body: UpdateTagDto) {
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
