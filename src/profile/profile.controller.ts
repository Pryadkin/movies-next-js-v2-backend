import {Controller, Post, Body, Get, Delete, Put, Query, } from '@nestjs/common'
import {ProfileService} from './profile.service'
import {MovieDto} from './dto/movie.dto'
import {ApiBody, ApiOkResponse, ApiTags} from '@nestjs/swagger'
import {DeleteMovieDto} from './dto/delete-movie.dto'
import {UpdateTagDto} from 'src/movie-tags/dto/update-tag.dto'
import {DeleteMovieTagsDto} from './dto/delete-movie-tags.dto'
import {GetMovieDto} from './dto/get-movie.dto'
import {PersonDto} from './dto/person.dto'
import {IPersonQuary} from './personType'
import {CollectionMovieDto} from './dto/collection-movie.dto'

@Controller('profile')
@ApiTags('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) { }

  @ApiOkResponse({
    description: 'Collections name',
    type: MovieDto,
    isArray: true
  })
  @Get('get_collections_name')
  async getCollectionsName() {
    return this.profileService.getCollectionNames()
  }

  @ApiOkResponse({
    description: 'set_movie_to_collection',
    type: MovieDto,
    isArray: true
  })
  @Post('set_movie_to_collection')
  async setMovieToCollection(@Body() {movie, collectionName}: {movie: MovieDto, collectionName: string}) {
    return this.profileService.setMovieToCollection(movie, collectionName)
  }

  @ApiOkResponse({
    description: 'The movies collection',
    type: MovieDto,
    isArray: true
  })
  @Post('set_movies_collection')
  async createMoviesCollection(@Body() collectionMovies: CollectionMovieDto) {
    return this.profileService.createMoviesCollection(collectionMovies)
  }

  @ApiOkResponse({
    description: 'The movies collection',
    type: MovieDto,
    isArray: true
  })
  @Post('delete_movies_collection')
  async deleteMoviesCollection(@Body() {collectionId}: {collectionId: string}) {
    return this.profileService.deleteCollection(collectionId)
  }

  @ApiOkResponse({
    description: 'The movies collection',
    type: MovieDto,
    isArray: true
  })
  @Post('edit_movie_collection')
  async editMoviesCollection(@Body() collectionMovies: CollectionMovieDto) {
    return this.profileService.editCollection(collectionMovies)
  }

  @ApiOkResponse({
    description: 'Get movies collection',
    type: MovieDto,
    isArray: true
  })
  @Get('get_collection_by_name')
  async getMoviesCollection(@Query() {name}: {name: string}) {
    return this.profileService.getCollectionByName(name)
  }

  @ApiOkResponse({
    description: 'The movies list',
    type: MovieDto,
    isArray: true
  })
  @Get('get_movie_by_name')
  async getMovieByName(@Query() {movieName}: {movieName: string}): Promise<MovieDto[]> {
    return this.profileService.getMovieArrByName(movieName)
  }

  @ApiOkResponse({
    description: 'The movies list',
    type: MovieDto,
    isArray: true
  })
  @Get('get_movies')
  async getMoviesByPagination(@Query() {
    numberPage,
    limit,
    filterByMovieName,
    sortItemName,
    sortItemType,
    isWithDateOfViewing,
  }: GetMovieDto) {
    const isFilterByMovieWithDateOfViewing = isWithDateOfViewing === 'true' ? true : false

    const allMovies = this.profileService.getMovies()

    const filteredMoviesByGenre = await this.profileService.filterMovieByGenres(allMovies)

    const filteredMovieByName = filterByMovieName
      ? this.profileService.filterByMovieName(filteredMoviesByGenre, filterByMovieName)
      : filteredMoviesByGenre

    const movieWithoutDate = isFilterByMovieWithDateOfViewing
      ? this.profileService.getFilterByMovieWithoutDate(filteredMovieByName)
      : filteredMovieByName

    const moviesBySort = sortItemName ? this.profileService.getSortMovies(movieWithoutDate, sortItemName, sortItemType) : filteredMovieByName

    // const adfadsf = allMovies.filter(elee => elee.release_date.includes('2024'))
    // console.log('adfadsf', adfadsf.map(ele => ele.title_ru))

    // const aaaaaa = this.profileService.getFilterByMovieWithoutDate(filteredMovieByName)
    // // console.log('moviesBySort', aaaaaa.map(elem => elem.release_date))
    // const sdfs = this.profileService.getSortMovies(allMovies, 'release_date', 'asc')
    // // console.log('moviesBySort', sdfs.map(elem => elem.release_date))
    // console.log('sdfs', sdfs.map(elem => elem.release_date))

    const moviesByPage =  this.profileService.getMoviesByPagination(moviesBySort, Number(numberPage), Number(limit))

    return moviesByPage
  }

  @ApiOkResponse({
    description: 'The persons list',
    type: PersonDto,
    isArray: true
  })
  @Get('get_persons')
  async getPersons(@Query() {
    popularitySort,
    filterByGender,
    knownDepartmentFilter
  }: IPersonQuary) {
    const allPersons = this.profileService.getPersons()

    const personsFilterByGender = this.profileService.filterByGender(allPersons, filterByGender)

    const personsFilterByKnownDepartment = this.profileService.filterByKnownDepartment(personsFilterByGender, knownDepartmentFilter)

    const sortPersons = this.profileService.getSortPersons(personsFilterByKnownDepartment, popularitySort)
    return sortPersons
  }

  @ApiBody({type: MovieDto})
  @Post('add_movie')
  async addMovie(@Body() body: MovieDto) {
    this.profileService.saveMovieId(body.id)
    return this.profileService.addMovie(body)
  }

  @ApiBody({type: MovieDto})
  @Post('add_person')
  async addPerson(@Body() body: PersonDto) {
    return this.profileService.addPerson(body)
  }

  @ApiBody({type: MovieDto})
  @Put('update_movie')
  async update(@Body() body: MovieDto) {
    return this.profileService.updateMovie(body)
  }

  @ApiBody({type: UpdateTagDto})
  @Put('update_movie_tags')
  async updateMovieTags(@Body() body: UpdateTagDto) {
    const moviesWithNewTags = this.profileService.updateMovieTags(body)

    return this.profileService.updateAllMovie(moviesWithNewTags)
  }

  @Put('update_movie_settings')
  async updateMovieSettings() {
    return this.profileService.updateMovieSettings()
  }

  @ApiBody({type: DeleteMovieDto})
  @Delete('delete_movie')
  async delete(
    @Body('id') id: string | number,
  ) {
    this.profileService.deleteMovieId(+id)
    return this.profileService.deleteMovie(+id)
  }

  @ApiBody({type: DeleteMovieTagsDto})
  @Delete('delete_movie_tags')
  async deleteTagFromMovies(@Body() {tagName}: DeleteMovieTagsDto) {
    return this.profileService.deleteMovieTags(tagName)
  }

  @Get('get_movie_ids')
  async getMovieIds() {
    return this.profileService.getMovieIds()
  }
}
