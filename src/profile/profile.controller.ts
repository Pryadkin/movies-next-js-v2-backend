import { Controller, Post, Body } from '@nestjs/common'
import { ProfileService } from './profile.service'
import { MovieDto } from './dto/add-movie.dto'
// import { UpdateProfileDto } from './dto/update-profile.dto'

@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Post('add_movie')
  addMovie(@Body() AddMovieDto: MovieDto) {
    return this.profileService.addMovie(AddMovieDto)
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

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.profileService.remove(+id);
  // }
}
