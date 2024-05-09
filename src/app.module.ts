import {Module} from '@nestjs/common'
import {AppController} from './app.controller'
import {AppService} from './app.service'
import {ProfileModule} from './profile/profile.module'
import {MovieTagsModule} from './movie-tags/movie-tags.module'
import {MovieTreeModule} from './movie-tree/movie-tree.module'
import {GenresModule} from './genres/genres.module'
import {FiltersModule} from './filters/filters.module'

@Module({
  imports: [
    ProfileModule,
    MovieTagsModule,
    MovieTreeModule,
    GenresModule,
    FiltersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
