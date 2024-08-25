import { mutation, query } from './_generated/server'
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
