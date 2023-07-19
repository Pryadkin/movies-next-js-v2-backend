import {Controller, Post, Body, Get, Delete} from '@nestjs/common'
import {ProfileService} from './profile.service'
import {MovieDto} from './dto/movie.dto'
import {ApiBody, ApiOkResponse, ApiTags} from '@nestjs/swagger'

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

  @Delete()
  async delete(
    @Body('id') id: string | number,
  ) {
    return this.profileService.deleteMovie(+id)
  }

  // @Get()
  // findAll() {
  //   return this.profileService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.profileService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateProfileDto: UpdateProfileDto) {
  //   return this.profileService.update(+id, updateProfileDto);
  // }
}
