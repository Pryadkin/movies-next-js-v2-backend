import {Module} from '@nestjs/common'
import {MovieTreeService} from './movie-tree.service'
import {MovieTreeController} from './movie-tree.controller'
import {DirModule} from 'src/dir/dir.module'

@Module({
  imports: [DirModule],
  controllers: [MovieTreeController],
  providers: [MovieTreeService]
})
export class MovieTreeModule { }
