import {authorType} from './authorType'
import {categoryType} from './categoryType'
import {columnsType} from './columnsType'
import {columnType} from './columnType'
import {externalImageType} from './externalImageType'
import {pageType} from './pageType'
import {portableTextType} from './portableTextType'
import {postType} from './postType'
import {tagType} from './tagType'
import { codeType } from './codeType'
import { navigation } from './navigationType'
import { menu } from './menuType'
import { newsLetterSubscription } from './newsLetter'
import { awardType } from './awardType'
import { awardCategoryType} from './awardCategoryType'
import { emailRecipients } from './emailRecipients'

export const schemaTypes = [
  authorType,
  categoryType,
  columnsType,
  columnType,
  externalImageType,
  pageType,
  portableTextType,
  postType,
  tagType,
  menu,
  newsLetterSubscription,
  awardType,
  awardCategoryType,
  emailRecipients
]