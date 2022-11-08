/* eslint @typescript-eslint/no-var-requires: "off" */
import type { CodegenConfig } from '@graphql-codegen/cli'
const envPath = 'config/.env'
require('dotenv').config({ path: envPath })

const SCHEMA = process.env.GRAPHQL_URL || ''
const API_KEY = process.env.SUPABASE_KEY || ''

const config: CodegenConfig = {
  schema: [
    {
      [SCHEMA]: {
        headers: {
          apiKey: API_KEY
        }
      }
    }
  ],
  documents: ['src/**/*.vue'],
  ignoreNoDocuments: true,
  generates: {
    './src/gql/': {
      preset: 'client',
      config: {
        useTypeImports: true
      },
      plugins: []
    }
  }
}

export default config
