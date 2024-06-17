import {Module} from '@nestjs/common'
import {ProfileService} from './profile.service'
import {ProfileController} from './profile.controller'
import {FiltersModule} from 'src/filters/filters.module'
import {DirModule} from 'src/dir/dir.module'

@Module({
  imports: [FiltersModule, DirModule],
  controllers: [ProfileController],
  providers: [ProfileService],
  exports: [ProfileService],
})
export class ProfileModule { }
