import {DocumentIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export const pageType = defineType({
  name: 'page',
  title: 'Page',
  type: 'document',
  icon: DocumentIcon,
  fields: [
    defineField({name: 'title', type: 'string'}),
    defineField({name: 'slug', type: 'slug'}),
    defineField({name: 'date', type: 'datetime'}),
    defineField({name: 'modified', type: 'datetime'}),
    defineField({
      name: 'status',
      type: 'string',
      options: {
        list: [
          {title: 'Published', value: 'publish'},
          {title: 'Future', value: 'future'},
          {title: 'Draft', value: 'draft'},
          {title: 'Pending', value: 'pending'},
          {title: 'Private', value: 'private'},
          {title: 'Trash', value: 'trash'},
          {title: 'Auto-Draft', value: 'auto-draft'},
          {title: 'Inherit', value: 'inherit'},
        ],
      },
    }),
    defineField({
      name: 'content',
      type: 'portableText',
    }),
    defineField({
      name: 'excerpt',
      type: 'portableText',
    }),
    defineField({name: 'featuredMedia', type: 'image'}),
    defineField({
      name: 'author',
      type: 'reference',
      to: [{type: 'author'}],
    }),
    defineField({name: 'parent', type: 'reference', to: [{type: 'page'}]}),
    defineField({
      name: 'template',
      type: 'string',
      options: {
        list: [
          {title: 'Default Template', value: 'defualt'},
          {title: 'Full Width', value: 'future'},
          {title: 'Latest News', value: 'latest'}
        ],
      },
    }),
    defineField({
      title: "Seo",
      name: "meta",
      type: "seoMetaFields",
    })
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'author.name',
      media: 'featuredMedia',
    },
  },
})