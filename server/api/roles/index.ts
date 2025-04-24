import { getPool } from '../../utils/db';
import middleWareRoute from '../../middleware/auth.js'
export default defineEventHandler(async (event) => {
  middleWareRoute(event);
  try {
    const pool = getPool();
    const [roles]: any = await pool.query('SELECT * FROM roles');
    return roles;
  } catch (error: any) {
    console.error(error);
    return { success: false, error: error.message };
  }
});
