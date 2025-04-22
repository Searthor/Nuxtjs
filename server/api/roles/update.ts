import { readBody } from 'h3';
import { getPool } from '../../utils/db';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  if (!body.id) {
    return { success: false, error: "ID is required", statusCode: 400 };
  }

  if (!body.name) {
    return { success: false, error: "Name is required", statusCode: 422 };
  }

  const pool = getPool();
  const conn = await pool.getConnection();

  try {
    await conn.beginTransaction();

    // Update role
    await conn.query("UPDATE roles SET name = ?, des = ? WHERE id = ?", [
      body.name,
      body.des || null,
      body.id,
    ]);

    // Clear existing functions
    await conn.query("DELETE FROM function_availables WHERE role_id = ?", [body.id]);

    // Insert new function associations
    const functionIds: number[] = Array.isArray(body.function_id) ? body.function_id : [];

    for (const functionId of functionIds) {
      await conn.query(
        "INSERT INTO function_availables (role_id, function_id) VALUES (?, ?)",
        [body.id, functionId]
      );
    }

    await conn.commit();

    return {
      success: true,
      message: "Role updated successfully",
      statusCode: 200,
    };
  } catch (error: any) {
    await conn.rollback();
    console.error("Error updating role:", error);
    return {
      success: false,
      error: error.message || "Failed to update role",
      statusCode: 500,
    };
  } finally {
    conn.release(); // Important: release the connection, not end the pool
  }
});
