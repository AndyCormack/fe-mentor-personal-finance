export async function load({ locals }) {
  return {
    user: locals?.user && {
      name: locals.user.name,
      email: locals.user.email,
    },
  }
}
