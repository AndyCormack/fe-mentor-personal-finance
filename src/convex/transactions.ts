import { query } from './_generated/server'
import { v } from 'convex/values'

export const getRecent = query({
  args: {
    user: v.id('users'),
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args) =>
    await ctx.db
      .query('transactions')
      .filter((q) => q.eq(q.field('user'), args.user))
      .take(args.limit ?? 5),
})

export const getIncomeExpenses = query({
  args: {
    user: v.id('users'),
  },
  handler: async (ctx, args) => {
    const transactions = await ctx.db
      .query('transactions')
      .filter((q) => q.eq(q.field('user'), args.user))
      .collect()

    let income = 0
    let expenses = 0

    for (const transaction of transactions) {
      if (transaction.amount > 0) {
        income += transaction.amount
      } else {
        expenses += transaction.amount
      }
    }

    return { income, expenses }
  },
})

export const get = query({
  args: {
    user: v.id('users'),
  },
  handler: async (ctx, args) =>
    await ctx.db
      .query('transactions')
      .filter((q) => q.eq(q.field('user'), args.user))
      .collect(),
})
