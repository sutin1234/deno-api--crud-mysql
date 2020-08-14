import client from "../db/mysql_client.ts";

interface Key {
  id?: any;
}

export async function search(params: Key = {}) {
  const isSpecific = Object.keys(params).length !== 0;
  if (isSpecific) {
    return await client.execute(`SELECT * FROM user WHERE id = ?`, [params.id]);
  } else {
    return await client.execute(`SELECT * FROM user`);
  }
}

export async function isUserExist(id: number) {
  const result = await client.query(
    `SELECT COUNT(*) count FROM user WHERE id = ?`,
    [id],
  );
  return result[0].count >= 1;
}

export async function insert(
  { name, country }: { name: string; country: string },
) {
  return await client.execute(`INSERT INTO user(name, country) values(?,?)`, [
    name,
    country,
  ]);
}

export async function update(name: string, country: string, id: string) {
  return await client.execute(
    `UPDATE user SET name= ?, country= ? WHERE id = ?`,
    [
      name,
      country,
      id,
    ],
  );
}

export async function remove(id: string) {
  return await client.execute(`DELETE FROM user WHERE id = ?`, [id]);
}
