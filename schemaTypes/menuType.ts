import { defineType} from 'sanity';

export const navigation = defineType({
    name: 'menu',
    title: 'Menu',
    type: 'document',
    fields: [
      {
        name: 'title',
        title: 'Title',
        type: 'string',
        description: 'The title of the menu',
      },
      {
        name: 'items',
        title: 'Menu Items',
        type: 'array',
        description: 'An array of menu items',
        of: [
          {
            type: 'object',
            fields: [
              {
                name: 'name',
                title: 'Name',
                type: 'string',
                description: 'Name of the menu item',
              },
              {
                name: 'linkOrText',
                title: 'Link or Text',
                type: 'string',
                description: 'Choose whether to add a link or text',
                options: {
                  list: [
                    { title: 'Url', value: 'url' },
                    { title: 'Page', value: 'page' },
                    { title: 'Category', value: 'category' }
                  ], // Radio button choices
                  layout: 'radio', // Makes it appear as radio buttons
                },
              },
              {
                name: 'url',
                title: 'URL',
                type: 'text',
                description: 'URL for the menu item',
                hidden: ({ parent }) => parent.linkOrText !== 'url', // Show only if 'link' is selected
              },
              {
                name: 'page',
                title: 'Page',
                type: 'reference',
                to: [{type: 'page'}],
                description: 'Text to display for the menu item',
                hidden: ({ parent }) => parent.linkOrText !== 'page', // Show only if 'text' is selected
              },
              {
                name: 'category',
                title: 'Category',
                type: 'reference',
                to: [{type: 'category'}],
                description: 'Text to display for the menu item',
                hidden: ({ parent }) => parent.linkOrText !== 'category'
              },
            ],
          },
        ],
      },
    ],
});