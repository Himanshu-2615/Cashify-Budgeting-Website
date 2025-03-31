import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import { config } from "dotenv";
import * as schema from './schema';
config({ path: ".env" }); // or .env.local
const sql = neon('postgresql://neondb_owner:npg_ko2zRIVfY9yZ@ep-patient-sun-a8x9v8a4-pooler.eastus2.azure.neon.tech/neondb?sslmode=require');
export const db = drizzle(sql, {schema});