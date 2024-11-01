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
      type: 'boolean',
      description: 'Choose whether to add subcategories or not',
      options: {
        list: [
          { title: 'No Subcategory', value: false },
          { title: 'Subcategory', value: true },
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
      hidden: ({ parent }) => parent.has_sub !== true, // Show only if 'subcategory' is selected
    },
    {
      name: 'has_options',
      title: 'Has Options',
      type: 'boolean',
      description: 'Choose whether to add options or not',
      options: {
        list: [
          { title: 'No Options', value: false },
          { title: 'Set Options', value: true },
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
      hidden: ({ parent }) => parent.has_options !== true, // Show only if 'options' is selected
    },
    {
      name: 'has_description',
      title: 'Has Description',
      type: 'boolean',
      description: 'Choose whether to add description or not',
      options: {
        list: [
          { title: 'No Description', value: false },
          { title: 'Set Description', value: true },
        ], // Radio button choices
        layout: 'radio', // Makes it appear as radio buttons
      },
    },
    {
      name: 'award_description_title',
      title: 'Description Title',
      type: 'string',
      hidden: ({ parent }) => parent.has_description !== true, // Show only if 'description' is selected
    },
    {
      name: 'upload_file',
      title: 'Accept File',
      type: 'boolean'
    },
    {
      name: 'textbox',
      title: 'TextBox',
      type: 'boolean'
    },
    {
      name: 'textbox_title',
      title: 'Textbox Title',
      type: 'string',
      hidden: ({parent}) => parent.textbox !== true
    }
  ],
  preview: {
    select: {
      title: 'award_category'
    },
  },
})

