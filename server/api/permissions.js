// server/api/permissions.ts
import { getPool } from '../utils/db'
export default defineEventHandler(async (event) => {
    const roleId = getHeader(event, 'role-id');
    if (!roleId) {
        return {
          success: false,
          error: 'Missing role ID'
        }
      }
    try {
        const pool = await getPool()
        const [permissions] = await pool.query(`
      SELECT b.name FROM function_availables a
      JOIN function_models b ON a.function_id = b.id
      WHERE a.role_id = ?
    `,[roleId])
        await pool.end() // Always close the pool after use

        return {
            success: true,
            data: permissions,
        }
    } catch (error) {
        console.error('DB Error:', error)
        return {
            success: false,
            error: error.message,
        }
    }
})
