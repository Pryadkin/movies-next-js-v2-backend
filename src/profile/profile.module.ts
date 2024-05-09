import {Module} from '@nestjs/common'
import {ProfileService} from './profile.service'
import {ProfileController} from './profile.controller'
import {FiltersModule} from 'src/filters/filters.module'

@Module({
  imports: [FiltersModule],
  controllers: [ProfileController],
  providers: [ProfileService],
  exports: [ProfileService],
})
export class ProfileModule { }
