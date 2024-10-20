import {ConfettiIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export const awardCategoryType = defineType({
  name: 'award_categories',
  title: 'Award Categories',
  type: 'document',
  icon: ConfettiIcon,
  fields: [
    {
      name: 'award_category',
      title: 'Award Category',
      type: 'string',
      description: 'The title of the Award',
    },
    {
      name: 'has_sub',
      title: 'Has Subcategories',
      type: 'string',
      description: 'Choose whether to add subcategories or not',
      options: {
        list: [
          { title: 'No Subcategory', value: 'no_subcategory' },
          { title: 'Subcategory', value: 'subcategory' },
        ], // Radio button choices
        layout: 'radio', // Makes it appear as radio buttons
      },
    },
    {
      name: 'award_sub_categories',
      title: 'Sub Categories',
      type: 'array',
      description: 'award subcategories',
      of: [
          {
              type: "object",
              fields: [
                  {
                    name: 'sub_category_title',
                    title: 'Subcategory Title',
                    type: 'string',
                    description: 'Title of the Award',
                  }
              ]
          }
      ],
      hidden: ({ parent }) => parent.has_sub !== 'subcategory', // Show only if 'subcategory' is selected
    },
    {
      name: 'has_options',
      title: 'Has Options',
      type: 'string',
      description: 'Choose whether to add options or not',
      options: {
        list: [
          { title: 'No Options', value: 'no_options' },
          { title: 'Set Options', value: 'options' },
        ], // Radio button choices
        layout: 'radio', // Makes it appear as radio buttons
      },
    },
    {
      name: 'award_options',
      title: 'Options',
      type: 'array',
      description: 'award subcategories',
      of: [
          {
              type: "object",
              fields: [
                  {
                    name: 'sub_option_title',
                    title: 'Option',
                    type: 'string',
                    description: 'an option for the category',
                  }
              ]
          }
      ],
      hidden: ({ parent }) => parent.has_options !== 'options', // Show only if 'subcategory' is selected
    },
    {
      name: 'has_description',
      title: 'Has Description',
      type: 'string',
      description: 'Choose whether to add description or not',
      options: {
        list: [
          { title: 'No Description', value: 'no_description' },
          { title: 'Set Description', value: 'description' },
        ], // Radio button choices
        layout: 'radio', // Makes it appear as radio buttons
      },
    },
    {
      name: 'award_description',
      title: 'Description',
      type: 'boolean',
      hidden: ({ parent }) => parent.has_description !== 'description', // Show only if 'subcategory' is selected
    },
  ],
  preview: {
    select: {
      title: 'award_category'
    },
  },
})

