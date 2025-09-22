// source.config.ts
import {
  defineConfig,
  defineDocs,
  frontmatterSchema
} from "fumadocs-mdx/config";
import { z } from "zod";
var source_config_default = defineConfig({
  lastModifiedTime: "git",
  mdxOptions: {
    providerImportSource: "@/mdx-components"
  }
});
var { docs, meta } = defineDocs({
  dir: "content/changelog",
  docs: {
    schema: frontmatterSchema.extend({
      date: z.string(),
      tags: z.array(z.string()).optional(),
      version: z.string().optional()
    })
  }
});
var { docs: announcementDocs, meta: announcementMeta } = defineDocs({
  dir: "content/announcements",
  docs: {
    schema: frontmatterSchema.extend({
      date: z.string(),
      tags: z.array(z.string()).optional(),
      priority: z.enum(["high", "medium", "low"]).optional()
    })
  }
});
export {
  announcementDocs,
  announcementMeta,
  source_config_default as default,
  docs,
  meta
};
