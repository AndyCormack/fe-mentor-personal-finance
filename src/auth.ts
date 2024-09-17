import { SvelteKitAuth } from '@auth/sveltekit'
import auth0 from '@auth/sveltekit/providers/auth0'

export const { handle, signIn, signOut } = SvelteKitAuth({
  providers: [auth0],
})
