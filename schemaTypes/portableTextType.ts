import {defineField} from 'sanity'

export const portableTextType = defineField({
  name: 'portableText',
  type: 'array',
  of: [
    {
      type: 'block',
      marks: {
        annotations: [
          {
            name: 'internalLink',
            type: 'object',
            title: 'Internal link',
            fields: [
              {
                name: 'reference',
                type: 'reference',
                title: 'Reference',
                to: [
                  { type: 'post' },
                  { type: 'page' },
                  { type: 'author'}
                  // other types you may want to link to
                ]
              }
            ]
          },
          {
            name: 'link',
            type: 'object',
            title: 'External link',
            fields: [
              {
                name: 'href',
                type: 'url',
                title: 'URL'
              },
              {
                title: 'Open in new tab',
                name: 'blank',
                description: 'Read https://css-tricks.com/use-target_blank/',
                type: 'boolean'
              }
            ]
          },
        ]
      }
    },
    {type: 'image'}, 
    {type: 'externalImage'}, 
    {type: 'columns'},
    {type: 'code'},
  ],
})