import { defineType, defineArrayMember } from 'sanity';

export const navigation = defineType({
  name: 'navigation',
  title: 'Navigation',
  type: 'document',
  fields: [
    {
        name: 'title',
        title: 'Item Title',
        type: 'string',
        description: 'The label for the navigation item',
    },
    {
        name: 'reference',
        title: 'Reference',
        type: 'reference',
        to: [{ type: 'page' }, { type: 'category' }],
        description: 'Select a page or category for the navigation item to link to',
    },
  ],
});