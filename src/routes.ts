/**
 * An array of routes that will be accessible
 * to the user without authentication
 * @type {string[]}
 */
export const publicRoutes = ["/"]

/**
 * An array of routes for auth
 * @type {string[]}
 */
export const authRoutes = ["/login", "/register"]

/**
 * Prefix of the auth api
 * @type {string}
 */
export const apiAuthPrefix = "/api"

export const DEFAULT_LOGIN_REDIRECT = "/dashboard"
