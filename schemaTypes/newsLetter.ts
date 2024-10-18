import { defineType} from 'sanity';

export const newsLetterSubscription = defineType({
    name: 'newsletter',
    title: 'Newsletter Subscription',
    type: 'document',
    fields: [
      {
        name: 'email',
        title: 'Email',
        type: 'string',
        description: 'The email of the subscriber'
      }
    ],
});