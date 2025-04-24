import { readBody } from 'h3';
import { getPool } from '../../utils/db';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  // Validation
  if (!body.name) {
    return {
      success: false,
      error: 'Role name is required',
      statusCode: 422,
    };
  }

  const pool = getPool();

  const conn = await pool.getConnection(); // use one connection for transaction
  try {
    await conn.beginTransaction();

    // Insert new role
    const roleQuery = `INSERT INTO roles (name, des) VALUES (?, ?)`;
    const [roleResult]: any = await conn.query(roleQuery, [body.name, body.des || null]);
    const roleId = roleResult.insertId;

    const functionIds: number[] = Array.isArray(body.function_id) ? body.function_id : [];

    if (functionIds.length > 0) {
      for (const functionId of functionIds) {
        const [checkResult]: any = await conn.query(
          'SELECT 1 FROM function_availables WHERE role_id = ? AND function_id = ? LIMIT 1',
          [roleId, functionId]
        );

        if (checkResult.length === 0) {
          await conn.query(
            'INSERT INTO function_availables (role_id, function_id) VALUES (?, ?)',
            [roleId, functionId]
          );
        }
      }
    }

    await conn.commit();
    return {
      success: true,
      message: 'Role created successfully',
      statusCode: 200,
    };
  } catch (error: any) {
    await conn.rollback();
    console.error('Error creating role:', error);
    return {
      success: false,
      error: error.message || 'Failed to create role',
      statusCode: 500,
    };
  } finally {
    conn.release(); // returns connection to pool (important!)
  }
});
