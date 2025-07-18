// storage-adapter-import-placeholder
import path from 'path'
import { fileURLToPath } from 'url'

import { vercelPostgresAdapter } from '@payloadcms/db-vercel-postgres'
import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob'
import sharp from 'sharp' // sharp-import
import { buildConfig } from 'payload'
import { resendAdapter } from '@payloadcms/email-resend'

import { Media } from '@/collections/Media'
import { Posts } from '@/collections/Posts'
import { Users } from '@/collections/Users'
import { plugins } from '@/plugins'
import { defaultLexical } from '@/fields/defaultLexical'
import { getServerSideURL } from '@/utilities/getURL'
import { Types } from '@/collections/Types'
import { Topics } from '@/collections/Topics'
import { Projects } from '@/collections/Projects'
import { Contacts } from '@/collections/Contacts'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    importMap: {
      baseDir: path.resolve(dirname),
    },
    user: Users.slug,
    components: {
      graphics: {
        Icon: '@/components/admin/icon',
        Logo: '@/components/admin/logo',
      },
      afterLogin: ['@/components/admin/login-text'],
    },
    livePreview: {
      breakpoints: [
        {
          label: 'Mobile',
          name: 'mobile',
          width: 375,
          height: 667,
        },
        {
          label: 'Tablet',
          name: 'tablet',
          width: 768,
          height: 1024,
        },
        {
          label: 'Desktop',
          name: 'desktop',
          width: 1440,
          height: 900,
        },
      ],
    },
  },
  // This config helps us configure global or default features that the other editors can inherit
  editor: defaultLexical,
  db: vercelPostgresAdapter({
    pool: {
      connectionString: process.env.POSTGRES_URL || '',
      // Optimize connection pooling for serverless
      max: 1, // Maximum connections per instance (serverless works best with 1)
      idleTimeoutMillis: 30000, // Close idle connections after 30s
      connectionTimeoutMillis: 10000, // Connection timeout 10s
      allowExitOnIdle: true, // Allow process to exit when idle
    },
  }),
  collections: [Posts, Media, Types, Topics, Projects, Users, Contacts],
  cors: [getServerSideURL()].filter(Boolean),
  globals: [],
  plugins: [
    ...plugins,
    vercelBlobStorage({
      collections: {
        media: true,
      },
      token: process.env.BLOB_READ_WRITE_TOKEN || '',
    }),
  ],
  email: resendAdapter({
    defaultFromAddress: 'notifications@mail.lyovson.com',
    defaultFromName: 'Lyovsons',
    apiKey: process.env.RESEND_API_KEY || '',
  }),
  secret: process.env.PAYLOAD_SECRET,
  sharp,
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
})
