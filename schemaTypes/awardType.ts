import {AsteriskIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export const awardType = defineType({
  name: 'award',
  title: 'Awards',
  type: 'document',
  icon: AsteriskIcon,
  fields: [
    {
        name: 'award_title',
        title: 'Award Title',
        type: 'string',
        description: 'The title of the Award',
    },
    {
        name: 'award_type',
        title: 'Parent or Page',
        type: 'string',
        description: 'Choose whether to add a page or a child',
        options: {
          list: [
            { title: 'Page', value: 'page' },
            { title: 'Child', value: 'child' },
          ], // Radio button choices
          layout: 'radio', // Makes it appear as radio buttons
        },
    },
    {
        name: 'page',
        title: 'Page',
        type: 'reference',
        to: [{type: 'page'}],
        description: 'Page',
        hidden: ({ parent }) => parent.award_type !== 'page', // Show only if 'text' is selected
    },
    {
        name: 'award_child',
        title: 'Sub Awards',
        type: 'array',
        description: 'sub award pages',
        of: [
            {
                type: "object",
                fields: [
                    {
                        name: 'sub_award_title',
                        title: 'Award Title',
                        type: 'string',
                        description: 'Title of the Award',
                    },
                    {
                        name: 'award_page',
                        title: 'Award Page',
                        type: 'reference',
                        to: [{type: 'page'}],
                        description: 'Page'
                    }
                ]
            }
        ],
        hidden: ({ parent }) => parent.award_type !== 'child', // Show only if 'text' is selected
    },
    {
      name: 'award_order',
      title: 'Order',
      type: 'number',
      description: 'Order of the link in the menu',
      initialValue: 0,
    }
  ],
  preview: {
    select: {
      title: 'award_title'
    },
  },
})

