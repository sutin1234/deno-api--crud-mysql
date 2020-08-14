import { Client } from "https://deno.land/x/mysql/mod.ts";

const client = await new Client().connect({
  hostname: "localhost",
  username: "root",
  db: "deno_db",
  password: "",
});

export default client;