import {Module} from '@nestjs/common'
import {MovieTreeService} from './movie-tree.service'
import {MovieTreeController} from './movie-tree.controller'

@Module({
  controllers: [MovieTreeController],
  providers: [MovieTreeService]
})
export class MovieTreeModule { }
