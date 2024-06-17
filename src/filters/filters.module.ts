import {Module} from '@nestjs/common'
import {FilterService} from './filters.service'
import {FilterController} from './filters.controller'
import {DbModule} from 'src/db/db.module'

@Module({
  imports: [DbModule],
  controllers: [FilterController],
  providers: [FilterService],
  exports: [FilterService],
})
export class FiltersModule { }
