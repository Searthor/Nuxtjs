import { getPool } from "../../../utils/db";
import type { ResultSetHeader } from "mysql2/promise";
export default defineEventHandler(async (event) => {
  const id = event.context.params?.id;
  if (!id) {
    return createError({
      statusCode: 400,
      statusMessage: "Role ID is required",
    });
  }
  const pool = getPool();
  const conn = await pool.getConnection();

  try {
    await conn.beginTransaction();
    // Delete function associations
    await conn.query("DELETE FROM function_availables WHERE role_id = ?", [id]);

    // Delete the role - properly typed
    const [result] = await conn.query<ResultSetHeader>(
      "DELETE FROM roles WHERE id = ?",
      [id]
    );

    // Check affected rows with proper typing
    if (result.affectedRows === 0) {
      await conn.rollback();
      return createError({
        statusCode: 404,
        statusMessage: "Role not found",
      });
    }

    await conn.commit();

    return {
      success: true,
      message: "Role deleted successfully",
      statusCode: 200,
    };
  } catch (error: any) {
    await conn.rollback();
    console.error("Error deleting role:", error);
    return createError({
      statusCode: 500,
      statusMessage: "Failed to delete role",
      data: error.message,
    });
  } finally {
    conn.release();
  }
});
