import {Module} from '@nestjs/common'
import {MovieTagsService} from './movie-tags.service'
import {MovieTagsController} from './movie-tags.controller'

@Module({
  controllers: [MovieTagsController],
  providers: [MovieTagsService]
})
export class MovieTagsModule { }
