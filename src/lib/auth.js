import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
 
console.log("DEBUG: Secret length is", process.env.BETTER_AUTH_SECRET?.length);
console.log("DEBUG: Secret starts with", process.env.BETTER_AUTH_SECRET?.substring(0, 5));

const client = new MongoClient(process.env.MONGODB_URL);
const db = client.db("arthub");

export const auth = betterAuth({
  database: mongodbAdapter(db, {
    client
  }),
  emailAndPassword: { 
    enabled: true, 
  }, 
});