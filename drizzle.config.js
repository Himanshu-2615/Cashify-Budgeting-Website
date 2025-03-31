import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./utils/schema.js",
  out: "./drizzle",
  dialect: "postgresql",
  //driver: "postgres",  
  dbCredentials: {
    url: 'postgresql://neondb_owner:npg_ko2zRIVfY9yZ@ep-patient-sun-a8x9v8a4-pooler.eastus2.azure.neon.tech/neondb?sslmode=require',  
  },
});
