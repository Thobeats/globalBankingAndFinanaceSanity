import { defineType, defineField } from 'sanity';
import { UserIcon } from '@sanity/icons';


export const nominationType = defineType({
    name: "nomination",
    title: "Nominations",
    type: "document",
    icon: UserIcon,
    fields: [
        defineField({
            name: "company_name",
            title: "Name of the Company",
            type: "string",
            validation: (Rule) => Rule.required()
        }),
        defineField({
            name: "award_category",
            title: "Award Category",
            type: "string",
            validation: (Rule) => Rule.required()
        }),
        defineField({
            name: "award_sub_category",
            title: "Award Sub Category",
            type: "string"
        }),
        defineField({
            name: "nomination_response",
            title: "Nomination Response",
            type: "string"
        }),
        defineField({
            name: "award_options",
            title: "Award Options",
            type: "string"
        }),
        defineField({
            name: "award_notes",
            title: "Nomination Description",
            type: "string"
        }),
        defineField({
            name: "country_region",
            title: "Country or Region",
            type: "string",
            validation: (Rule) => Rule.required()
        }),
        defineField({
            name: "country",
            title: "Country",
            type: "string",
            hidden: ({ parent }) => parent.country_region !== 'country'
        }),
        defineField({
            name: "region",
            title: "Region",
            type: "string",
            hidden: ({ parent }) => parent.country_region !== 'region'
        }),
        defineField({
            name: "firstname",
            title: "First Name",
            type: "string"
        }),
        defineField({
            name: "lastname",
            title: "Last Name",
            type: "string"
        }),
        defineField({
            name: "job",
            title: "Job",
            type: "string"
        }),
        defineField({
            name: "phone",
            title: "Phone",
            type: "string",
            validation: (Rule) => Rule.required()
        }),
        defineField({
            name: "email",
            title: "Email",
            type: "string",
            validation: (Rule) => Rule.required()
        }),
        defineField({
            name: "file",
            title: "Upload File",
            type: "file"
        })
    ],
    initialValue: {
        award_sub_category: null,
        award_options: null,
        award_notes: null
    },
    preview: {
        select: {
            title: 'award_category',
            subtitle: 'company_name',
        },
    }
});