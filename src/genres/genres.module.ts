import {Module} from '@nestjs/common'
import {GenresService} from './genres.service'
import {GenresController} from './genres.controller'
import {DirModule} from 'src/dir/dir.module'

@Module({
  imports: [DirModule],
  controllers: [GenresController],
  providers: [GenresService],
})
export class GenresModule { }
