import { PUBLIC_CONVEX_URL } from '$env/static/public'
import { api } from '@/convex/_generated/api'
import type { Id } from '@/convex/_generated/dataModel'
import { ConvexHttpClient } from 'convex/browser'

export const load = async () => {
  const client = new ConvexHttpClient(PUBLIC_CONVEX_URL)
  const { income, expenses } = await client.query(
    api.transactions.getIncomeExpenses,
    {
      // TODO: use user from session
      user: 'jd76g1pn413xa9j0mgw83wczqn6zhdc3' as Id<'users'>,
    }
  )

  return {
    income,
    expenses,
    // TODO: use real data once savings pots are implemented
    balance: 4836,
  }
}
