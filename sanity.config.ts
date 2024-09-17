import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'
import { seoMetaFields } from "sanity-plugin-seo";
import {media} from 'sanity-plugin-media'
import { codeInput } from '@sanity/code-input'




export default defineConfig({
  name: 'default',
  title: 'Global Banking & Finance Review',

  projectId: 'v0gkry1w',
  dataset: 'production',
  plugins: [structureTool(), visionTool(), seoMetaFields(), media(), codeInput()],

  schema: {
    types: schemaTypes,
  },
})
