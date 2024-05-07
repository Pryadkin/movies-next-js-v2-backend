import {Controller, Post, Body, Get, Delete, Put, Query, } from '@nestjs/common'
import {ProfileService} from './profile.service'
import {MovieDto} from './dto/movie.dto'
import {ApiBody, ApiOkResponse, ApiTags} from '@nestjs/swagger'
import {DeleteMovieDto} from './dto/delete-movie.dto'
import {UpdateTagDto} from 'src/movie-tags/dto/update-tag.dto'
import {DeleteMovieTagsDto} from './dto/delete-movie-tags.dto'
import {GetMovieDto} from './dto/get-movie.dto'

@Controller('profile')
@ApiTags('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) { }

  // @ApiOkResponse({
  //   description: 'The movies list',
  //   type: MovieDto,
  //   isArray: true
  // })
  // @Get('get_movies')
  // async getMovies() {
  //   return this.profileService.getMovies()
  // }

  @ApiOkResponse({
    description: 'The movies list',
    type: MovieDto,
    isArray: true
  })
  @Get('get_movies')
  async getMoviesByPagination(@Query() {
    numberPage,
    limit,
    filterByMovieName,
    sortItem,
    filterByMovieWithoutDate,
  }: GetMovieDto) {
    const allMovies = this.profileService.getMovies()

    const moviesByFilter = filterByMovieName ? this.profileService.getMovieByFilter(allMovies, filterByMovieName) : allMovies

    const movieWithoutDate = filterByMovieWithoutDate ? this.profileService.getFilterByMovieWithoutDate(moviesByFilter, filterByMovieWithoutDate) : moviesByFilter

    const moviesBySort = sortItem ? this.profileService.getSortMovies(movieWithoutDate, sortItem) : moviesByFilter

    const moviesByPage =  this.profileService.getMoviesByPagination(moviesBySort, Number(numberPage), Number(limit))

    return moviesByPage
  }

  @ApiBody({type: MovieDto})
  @Post('add_movie')
  async addMovie(@Body() body: MovieDto) {
    return this.profileService.addMovie(body)
  }

  @ApiBody({type: MovieDto})
  @Put('update_movie')
  async update(@Body() body: MovieDto) {
    return this.profileService.updateMovie(body)
  }

  @ApiBody({type: UpdateTagDto})
  @Put('update_movie_tags')
  async updateMovieTags(@Body() body: UpdateTagDto) {
    const moviesWithNewTags = this.profileService.updateMovieTags(body)

    return this.profileService.updateAllMovie(moviesWithNewTags)
  }

  @Put('update_movie_settings')
  async updateMovieSettings() {
    return this.profileService.updateMovieSettings()
  }

  @ApiBody({type: DeleteMovieDto})
  @Delete('delete_movie')
  async delete(
    @Body('id') id: string | number,
  ) {
    return this.profileService.deleteMovie(+id)
  }

  @ApiBody({type: DeleteMovieTagsDto})
  @Delete('delete_movie_tags')
  async deleteTagFromMovies(@Body() {tagName}: DeleteMovieTagsDto) {
    return this.profileService.deleteMovieTags(tagName)
  }
}
