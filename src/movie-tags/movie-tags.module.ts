import {Module} from '@nestjs/common'
import {MovieTagsService} from './movie-tags.service'
import {MovieTagsController} from './movie-tags.controller'
import {ProfileModule} from 'src/profile/profile.module'
import {DirModule} from 'src/dir/dir.module'

@Module({
  imports: [ProfileModule, DirModule],
  controllers: [MovieTagsController],
  providers: [MovieTagsService]
})
export class MovieTagsModule { }
