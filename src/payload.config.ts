// storage-adapter-import-placeholder
import { postgresAdapter } from "@payloadcms/db-postgres";
import path from "path";
import { buildConfig } from "payload";
import { fileURLToPath } from "url";

import { Categories } from "@/collections/Categories";
import { Media } from "@/collections/Media";
import { Pages } from "@/collections/Pages";
import { Users } from "@/collections/Users";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  serverURL: process.env.PAYLOAD_PUBLIC_SERVER_URL || "http://localhost:3000",

  cors: ["*"],
  csrf: ["*"],

  admin: {
    user: Users.slug,
  },

  collections: [Users, Pages, Categories, Media],

  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL,
      ssl: { rejectUnauthorized: false },
    },
  }),

  // ❗ Eliminamos completamente el editor, porque no lo necesitas
  editor: undefined,

  endpoints: [],
  globals: [],

  plugins: [],

  secret: process.env.PAYLOAD_SECRET || "",

  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
});
