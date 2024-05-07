import {Controller, Get} from '@nestjs/common'
import {MovieTreeService} from './movie-tree.service'
import {ApiTags} from '@nestjs/swagger'

@ApiTags('movie-tree')
@Controller('movie_tree')
export class MovieTreeController {
  constructor(private readonly movieTreeService: MovieTreeService) { }

  @Get('get_movie_tree')
  async getFilterData() {
    return this.movieTreeService.getMovieTreeData()
  }
}
