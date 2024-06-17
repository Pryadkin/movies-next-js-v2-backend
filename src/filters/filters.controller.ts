import {Body, Controller, Get, Post} from '@nestjs/common'
import {ApiTags} from '@nestjs/swagger'
import {SetGenreDto} from './dto/set-genre.dto'
import {FilterService} from './filters.service'
import {SetTagDto} from './dto/set-tag.dto'

@ApiTags('filters')
@Controller('filters')
export class FilterController {
  constructor(
    private readonly filterService: FilterService,
  ) { }

  @Get('get-select-genres')
  async getGenres() {
    return await this.filterService.getGenres()
  }

  @Get('get-select-tags')
  async getTags() {
    return await this.filterService.getTags()
  }

  @Post('by-genre')
  async byGenre(@Body() genre: SetGenreDto) {
    const isExistGenre = await this.filterService.findOneGenre(genre.genreId)

    if (!isExistGenre) {
      await this.filterService.addGenreToFilter(genre.genreId, genre.name)
    } else {
      await this.filterService.deleteGenreFromFilter(genre.genreId)
    }

    return await this.filterService.findManyGenre()
  }

  @Post('by-tag')
  async byTag(@Body() tag: SetTagDto) {
    const isExistTag = await this.filterService.findOneTag(tag.tagName)

    if (!isExistTag?.id) {
      await this.filterService.addTagToFilter(tag.tagName, tag.isGroup, tag.color)
    } else {
      await this.filterService.deleteTagFromFilter(tag.tagName)
    }

    return await this.filterService.findManyTag()
  }
}