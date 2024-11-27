import {ActivityIcon} from '@sanity/icons'
import {defineType} from 'sanity'

export const articleType = defineType({
  name: 'article',
  title: 'Article',
  type: 'document',
  icon: ActivityIcon,
  fields: [
    { name: 'post', type: 'reference', to: [{type: 'post'}]},
    { name: 'date', type: 'datetime', title: 'Publication Date' },
    { name: 'source', type: 'string', title: 'Source' },
    { name: 'versionGuid', type: 'string', title: 'Version GUID' },
    { name: 'traffic', type: 'number', title: 'Traffic Score' },
    { name: 'status', type: 'string', title: 'Status', options: { list: ['active', 'delete', 'kill'] } },
  ],
  preview: {
    select: {
      title: 'post.title',
      subtitle: 'source'
    },
  },
})
