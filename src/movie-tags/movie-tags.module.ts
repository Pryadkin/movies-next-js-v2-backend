import {Module} from '@nestjs/common'
import {MovieTagsService} from './movie-tags.service'
import {MovieTagsController} from './movie-tags.controller'
import {ProfileModule} from 'src/profile/profile.module'

@Module({
  imports: [ProfileModule],
  controllers: [MovieTagsController],
  providers: [MovieTagsService]
})
export class MovieTagsModule { }
