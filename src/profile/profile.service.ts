import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException
} from '@nestjs/common'
import {MovieDto} from './dto/movie.dto'
import fs = require('fs')
import path = require('path')
import {UpdateTagDto} from 'src/movie-tags/dto/update-tag.dto'

const dir = path.resolve(__dirname, 'movies.json')

@Injectable()
export class ProfileService {
  getMovies(): MovieDto[] {
    try {
      const moviesDataJSON = fs.readFileSync(dir, 'utf-8')
      const moviesData: MovieDto[] = JSON.parse(moviesDataJSON)
      return moviesData
    } catch (err) {
      return err
    }
  }

  addMovie(movie: MovieDto) {
    const moviesDataJSON = fs.readFileSync(dir, 'utf-8')
    const moviesData: MovieDto[] = JSON.parse(moviesDataJSON)

    const isExistMovie = moviesData.find(item => item.id === movie.id)

    if (isExistMovie) {
      throw new ConflictException('Movie already exist')
    } else {
      moviesData.push(movie)

      fs.writeFile(dir, JSON.stringify(moviesData), 'utf-8', (error) => {
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
    const moviesDataJSON = fs.readFileSync(dir, 'utf-8')
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
    const updateMovies = movies.map(movie => {
      return {
        ...movie,
        settings: {
          tags: movie.settings.tags.map(tag => ({
            tagName: tag,
            color: ''
          })),
          dateAdd: movie.settings.dateAdd
        }
      }
    })

    this.writeMovies((updateMovies as any))

    return updateMovies
  }

  deleteMovie(id: number) {
    const moviesDataJSON = fs.readFileSync(dir, 'utf-8')
    const moviesData: MovieDto[] = JSON.parse(moviesDataJSON)

    const deletedMovie = moviesData.find(movie => movie.id === id)

    const updateMovies = moviesData.filter(movie => movie.id !== id)

    if (!deletedMovie) {
      throw new NotFoundException('The movie was not found')
    } else {
      fs.writeFile(dir, JSON.stringify(updateMovies), 'utf-8', (error) => {
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
    fs.writeFile(dir, JSON.stringify(movies), 'utf-8', (error) => {
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
