import {Controller, Post, Body, Get, Delete, Put, } from '@nestjs/common'
import {ProfileService} from './profile.service'
import {MovieDto} from './dto/movie.dto'
import {ApiBody, ApiOkResponse, ApiTags} from '@nestjs/swagger'
import {DeleteMovieDto} from './dto/delete-movie.dto'

@Controller('profile')
@ApiTags('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) { }

  @ApiOkResponse({
    description: 'The movies list',
    type: MovieDto,
    isArray: true
  })
  @Get('get_movies')
  async getMovies() {
    return this.profileService.getMovies()
  }

  @ApiBody({type: MovieDto})
  @Post('add_movie')
  async addMovie(@Body() body: MovieDto) {
    return this.profileService.addMovie(body)
  }

  @ApiBody({type: DeleteMovieDto})
  @Delete()
  async delete(
    @Body('id') id: string | number,
  ) {
    return this.profileService.deleteMovie(+id)
  }

  @ApiBody({type: MovieDto})
  @Put('update_movie')
  async update(@Body() body: MovieDto) {
    return this.profileService.updateMovie(body)
  }
}
