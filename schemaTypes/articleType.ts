import {ActivityIcon} from '@sanity/icons'
import {defineType} from 'sanity'

export const articleType = defineType({
  name: 'article',
  title: 'Article',
  type: 'document',
  icon: ActivityIcon,
  fields: [
    { name: 'title', type: 'string', title: 'Title' },
    { name: 'content', type: 'text', title: 'Content' },
    { name: 'date', type: 'datetime', title: 'Publication Date' },
    { name: 'source', type: 'string', title: 'Source' },
    { name: 'traffic', type: 'number', title: 'Traffic Score' },
    { name: 'status', type: 'string', title: 'Status', options: { list: ['active', 'delete', 'kill'] } },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'source'
    },
  },
})
