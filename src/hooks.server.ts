import { handle as authentication } from '@/auth'
import { redirect, type Handle } from '@sveltejs/kit'
import { sequence } from '@sveltejs/kit/hooks'

export const requiresAuth = [
  // Add all base paths that require auth
  '/dashboard',
] as const

const authorisation: Handle = async function ({ event, resolve }) {
  const session = await event.locals.auth()
  event.locals.user = session?.user

  if (requiresAuth.some((path) => event.url.pathname.startsWith(path))) {
    if (!session) {
      throw redirect(307, '/')
    }
  }

  return resolve(event)
}

export const handle: Handle = sequence(authentication, authorisation)
