import { defineField, defineType } from "sanity";
import { EnvelopeIcon } from "@sanity/icons";


export const emailRecipients = defineType({
    name: "email_recipient",
    title: "Email Recipients",
    type: "document",
    icon: EnvelopeIcon,
    fields: [
        defineField({ name: "name", type: "string" }),
        defineField({ name: "email", type: "string" }),
    ],
});
