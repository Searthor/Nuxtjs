import { defineEventHandler } from "h3";
import { getPool } from "../../../utils/db"; // use the updated singleton connection pool

export default defineEventHandler(async (event) => {
  const id = event.context.params?.id;

  if (!id) {
    return { success: false, error: "ID is required", statusCode: 400 };
  }

  try {
    const pool = getPool();

    const [role]: any = await pool.query("SELECT * FROM roles WHERE id = ?", [
      id,
    ]);

    if (role.length === 0) {
      return { success: false, error: "Role not found", statusCode: 404 };
    }

    const [functionIds]: any = await pool.query(
      "SELECT function_id FROM function_availables WHERE role_id = ?",
      [id]
    );

    const [parents]: any = await pool.query(
      `
      SELECT fm.id
      FROM function_availables fa
      JOIN function_models fm ON fa.function_id = fm.id
      WHERE fa.role_id = ? AND fm.parent_id IS NULL
    `,
      [id]
    );

    return {
      success: true,
      data: {
        id: role[0].id,
        name: role[0].name,
        des: role[0].des,
        Parents_id: parents.map((row: { id: number }) => row.id),
        function_id: functionIds.map(
          (row: { function_id: number }) => row.function_id
        ),
      },
      statusCode: 200,
    };
  } catch (error: any) {
    console.error("API Error:", error);
    return { success: false, error: error.message, statusCode: 500 };
  }
});
