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

  token: 'skeNxKirReLkqJevzDzKYfXd7xxqyJX3yI15BtCelWP4mashb0rGGPCGw6hCpgbGTN8X9NlSwNfzGprFwa6uH6fFTVo2eQ0dsJP5DaJbk3pQC2fMXgfEbMKgK3gNFGSfkLhFCAQPe50ciPibeNi1iooWyGDyNArBZ4IPCy2WVOexT4tlrXto',

  schema: {
    types: schemaTypes,
  },
})
