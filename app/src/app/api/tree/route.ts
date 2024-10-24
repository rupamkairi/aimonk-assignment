import { parseArrayToTree } from "@/utils/tree-utils";
import { createClient } from "@libsql/client/web";
export const turso = createClient({
  // This should go into its own utility - we may want to reuse same instance rather than exhausting the connction pool.
  url: process.env.TURSO_DATABASE_URL!,
  authToken: process.env.TURSO_AUTH_TOKEN!,
});

export async function GET(/* request: Request */) {
  const { rows } = await turso.execute("SELECT * FROM tree_elements");
  console.log(rows);
  const data = {
    tree: parseArrayToTree(rows),
  };
  return Response.json(data);
}

export async function POST(request: Request) {
  const { name, data, parentId } = await request.json();
  const q = `INSERT INTO tree_elements (name, data, parentId) VALUES (?, ?, ?)`;
  const rs = await turso.execute({
    sql: q,
    args: [name, data, parentId],
  });
  return Response.json({ id: +rs.toJSON().lastInsertRowid });
}

export async function PATCH(request: Request) {
  const { id, name, data } = await request.json();
  const q = `UPDATE tree_elements SET name = $name, data = $data WHERE id = $id`;
  const rs = await turso.execute({
    sql: q,
    args: { id, name, data },
  });
  console.log(rs, "Update");
  return Response.json({});
}
