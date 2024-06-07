import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException
} from '@nestjs/common'
import {MovieDto} from './dto/movie.dto'
import fs = require('fs')
import {UpdateTagDto} from 'src/movie-tags/dto/update-tag.dto'
import {TSortItem} from './dto/get-movie.dto'
import dayjs = require('dayjs')
import {FilterService} from 'src/filters/filters.service'
import {DirService} from 'src/dir/dir.service'

@Injectable()
export class ProfileService {
  constructor(
    private readonly filtersService: FilterService,
    private readonly dirService: DirService,
  ) { }

  getMovies(): MovieDto[] {
    try {
      const moviesUrl = this.dirService.getDir('jsons', 'movies.json')
      const moviesDataJSON = fs.readFileSync(moviesUrl, 'utf-8')
      const moviesData: MovieDto[] = JSON.parse(moviesDataJSON)
      return moviesData
    } catch (err) {
      new Error('Failed to get movies')
    }
    return []
  }

  getSortMovies(movies: MovieDto[], sortType: TSortItem) {
    const getSorted = (
      a: string,
      b: string,
      sortT: string
    ) => {
        const updateLastA = dayjs(a)
            .valueOf()
        const updateLastB = dayjs(b)
            .valueOf()

        return sortT.slice(0 , 3) === 'asc' ? updateLastB - updateLastA : updateLastA - updateLastB
    }

    return [...movies].sort((a, b) => {
        if (sortType.slice(-11) === 'ReleaseDate') {
            const lastDateA = a.release_date
            const lastDateB = b.release_date

            return getSorted(lastDateA, lastDateB, sortType)
        } else {
            const lastDateA = a.settings.dateViewing.slice(-1)[0]
            const lastDateB = b.settings.dateViewing.slice(-1)[0]

            return getSorted(lastDateA, lastDateB, sortType)
        }
    })
  }


  filterByMovieName(movies: MovieDto[], filterByMovieName: string) {
    const filterIsEmpty = filterByMovieName.length === 0 ? true : false
      if(filterIsEmpty) return movies

      return movies.filter(movie => {
        const enMovie = movie.title_en?.toLowerCase().includes(filterByMovieName.toLowerCase())

        if (enMovie) return enMovie

        const ruMovie = movie.title_ru?.toLowerCase().includes(filterByMovieName.toLowerCase())

        return ruMovie
      })
  }

  async filterMovieByGenres(movies: MovieDto[]) {
    let filteredMovies = movies
    const genres = await this.filtersService.findManyGenre()
    const tags = await this.filtersService.findManyTag()
    const isExact = false

    for (let i = 0; i < tags.length; i++) {
      const isExist = null
      filteredMovies = filteredMovies.filter(movie => {
          const findMovie = movie.settings?.tags.find(tag => tag.tagName === tags[i].tagName)

          return findMovie
      })
      if (!isExact && isExist) break
  }

    for (let i = 0; i < genres.length; i++) {
      const genre = genres[i]

      for (let i = 0; i < genres.length; i++) {
        if (genre.genreId === 0) {
            filteredMovies = filteredMovies.filter(movie => {
                return movie.settings.isTv
            })
        }

        filteredMovies = filteredMovies.filter(movie => {
            return movie.genre_ids?.find(genreId => {
                if (genre.genreId !== 0) {
                    return genreId === genre.genreId
                }
                return true
            })
        })
      }
    }

    return filteredMovies
  }

  getFilterByMovieWithoutDate(movies: MovieDto[]) {
    return movies.filter(movie => movie.settings.dateViewing.length !== 0)
  }

  getMoviesByPagination(
    movies: MovieDto[],
    numberPage: number,
    limit: number,
  ){
    try {
      const startMovie = (numberPage - 1) * limit
      const lastMovie = (numberPage - 1) * limit + limit
      const moviesPerPage = movies.slice(startMovie, lastMovie)
      const total = movies.length

      return {moviesPerPage, total}
    } catch (err) {
      return err
    }
  }

  addMovie(movie: MovieDto) {
    const moviesUrl = this.dirService.getDir('jsons', 'movies.json')
    const moviesDataJSON = fs.readFileSync(moviesUrl, 'utf-8')
    const moviesData: MovieDto[] = JSON.parse(moviesDataJSON)

    const isExistMovie = moviesData.find(item => {
      const isExist = item.id === movie.id
      const isEqualType = item.settings.isTv === item.settings.isTv

      return isExist ? isEqualType && true : false
    })

    if (isExistMovie) {
      throw new ConflictException('Movie already exist')
    } else {
      moviesData.push(movie)

      fs.writeFile(moviesUrl, JSON.stringify(moviesData), 'utf-8', (error) => {
        if (error) {
          console.log(`WRITE ERROR: ${error}`)
        } else {
          console.log('FILE WRITTEN TO movies.json')
        }
      })
    }

    return movie
  }

  updateAllMovie(movies: MovieDto[]) {
    this.writeMovies(movies)

    return 'movies updated successfully'
  }

  updateMovie(movie: MovieDto) {
    const moviesUrl = this.dirService.getDir('jsons', 'movies.json')
    const moviesDataJSON = fs.readFileSync(moviesUrl, 'utf-8')
    const moviesData: MovieDto[] = JSON.parse(moviesDataJSON)

    const currentMovie = moviesData.find(item => item.id === movie.id)

    if (currentMovie) {
      const updateMovies = moviesData.map(item => {
        if (item.id === movie.id) {
          return movie
        }
        return item
      })

      this.writeMovies(updateMovies)

      return movie
    } else {
      throw new NotFoundException('The movie was not found')
    }
  }

  updateMovieTags(
    {
      oldTagName,
      newTagName
    }: UpdateTagDto
  ) {
    const movies = this.getMovies()
    const updateMovieTags = movies.map(movie => {
      const isOldTagExists = movie.settings.tags.find(tag => tag.tagName === oldTagName)

      if (isOldTagExists) {
        return {
          ...movie,
          settings: {
            ...movie.settings,
            tags: movie.settings.tags.map(tag => {
              if (tag.tagName === oldTagName) return {
                ...tag,
                tagName: newTagName,
              }
              return tag
            })
          }
        }
      }
      return movie
    })

    return updateMovieTags
  }

  updateMovieSettings() {
    const movies = this.getMovies()
    const updateMovies = (movies as any).map(movie => {
      const {
        adult,
        genre_ids,
        id,
        original_language,
        original_title,
        popularity,
        release_date,
        video,
        vote_average,
        vote_count,
        settings,
      } = movie
      return {
        adult,
        backdrop_path_en: movie.backdrop_path,
        backdrop_path_ru: '',
        genre_ids,
        id,
        original_language,
        original_title,
        overview_en: movie.overview,
        overview_ru: '',
        popularity,
        poster_path_en: movie.poster_path,
        poster_path_ru: '',
        release_date,
        title_en: movie.title,
        title_ru: '',
        video,
        vote_average,
        vote_count,
        settings,
      }
    })

    this.writeMovies((updateMovies as any))

    return updateMovies
  }

  deleteMovie(id: number) {
    const moviesUrl = this.dirService.getDir('jsons', 'movies.json')
    const moviesDataJSON = fs.readFileSync(moviesUrl, 'utf-8')
    const moviesData: MovieDto[] = JSON.parse(moviesDataJSON)

    const deletedMovie = moviesData.find(movie => movie.id === id)

    const updateMovies = moviesData.filter(movie => movie.id !== id)

    if (!deletedMovie) {
      throw new NotFoundException('The movie was not found')
    } else {
      fs.writeFile(moviesUrl, JSON.stringify(updateMovies), 'utf-8', (error) => {
        if (error) {
          console.log(`WRITE ERROR: ${error}`)
        } else {
          console.log('FILE WRITTEN TO')
        }
      })
    }

    return deletedMovie
  }

  deleteMovieTags(tagName: string) {
    const movies = this.getMovies()
    const updateMovies = movies.map(movie => {
      return {
        ...movie,
        settings: {
          ...movie.settings,
          tags: movie.settings.tags.filter(tag => tag.tagName !== tagName),
        }
      }
    })

    this.writeMovies((updateMovies as any))

    return 'movies updated successfully'
  }

  writeMovies(movies: MovieDto[]) {
    const moviesUrl = this.dirService.getDir('jsons', 'movies.json')

    fs.writeFile(moviesUrl, JSON.stringify(movies), 'utf-8', (error) => {
      if (error) {
        console.log(`WRITE ERROR: ${error}`)

        throw new BadRequestException('Something bad happened', {
          cause: new Error(),
          description: 'Some error description'
        })
      } else {
        console.log('FILE WRITTEN TO')
      }
    })
  }
}
