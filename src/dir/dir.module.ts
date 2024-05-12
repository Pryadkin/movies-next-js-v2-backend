import {Module} from '@nestjs/common'
import {DirService} from './dir.service'

@Module({
  providers: [DirService],
  exports: [DirService],
})
export class DirModule { }
