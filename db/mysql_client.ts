import { Client } from "https://deno.land/x/mysql/mod.ts";

const client = await new Client().connect({
  hostname: "localhost",
  username: "root",
  db: "deno_crud_api",
  password: "root",
  port: 8889
});

export default client;