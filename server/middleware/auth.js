// server/middleware/auth.js
import { getHeader, createError } from 'h3'
import jwt from 'jsonwebtoken'

export default defineEventHandler((event) => {
  const url = event.node.req.url
  // Define API routes that require authentication
  const protectedApiRoutes = [
    '/api/roles',
    '/api/users'
  ]
  // Skip middleware if route is not protected
  if (!protectedApiRoutes.includes(url)) {
    return
  }
  // Get token from the "Authorization" header
  const token = getHeader(event, 'authorization')?.replace('Bearer ', '')
  // If token is missing, throw 401 Unauthorized
  if (!token) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Unauthorized',
      message: 'No token provided'
    })
  }
  try {
    const config = useRuntimeConfig()
    const secret = config.JWT_SECRET
    // Verify the token
    const decoded = jwt.verify(token, secret)
    // Attach decoded user info to context for later use
    event.context.user = decoded
  } catch (err) {
    // If token is invalid or expired, throw 403 Forbidden
    throw createError({
      statusCode: 403,
      statusMessage: 'Forbidden: Invalid or expired token',
      message: 'Forbidden: Invalid or expired token'
    })
  }
})
