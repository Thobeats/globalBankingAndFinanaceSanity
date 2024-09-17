import {defineField, defineType} from 'sanity'

export const columnsType = defineType({
  name: 'columns',
  type: 'object',
  fields: [
    defineField({
      name: 'columns',
      type: 'array',
      of: [{type: 'column'}],
    }),
  ],
})
