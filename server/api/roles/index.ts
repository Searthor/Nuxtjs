import { getPool } from '../../utils/db';
export default defineEventHandler(async (event) => {
  try {
    const pool = getPool();
    const [roles]: any = await pool.query('SELECT * FROM roles');
    return roles;
  } catch (error: any) {
    console.error(error);
    return { success: false, error: error.message };
  }
});
