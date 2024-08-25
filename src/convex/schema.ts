import { defineSchema, defineTable } from 'convex/server'
import { v } from 'convex/values'

export default defineSchema({
  tasks: defineTable({
    isCompleted: v.boolean(),
    text: v.string(),
  }),

  users: defineTable({
    avatar: v.string(),
    email: v.string(),
    name: v.string(),
  }),

  transactions: defineTable({
    amount: v.float64(),
    avatar: v.string(),
    category: v.string(),
    date: v.string(),
    name: v.string(),
    recurring: v.boolean(),
    user: v.id('users'),
  }),
})
