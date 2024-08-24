import { v } from 'convex/values'
import { mutation, query } from './_generated/server'

export const get = query({
  args: {},
  handler: async (ctx) => {
    const tasks = await ctx.db.query('tasks').collect()
    return tasks.map((task) => ({ ...task, assigner: 'Andy' }))
  },
})

export const updateCompleted = mutation({
  args: {
    id: v.id('tasks'),
    isCompleted: v.boolean(),
  },
  handler: async (ctx, { id, isCompleted }) => {
    const task = await ctx.db.get(id)
    await ctx.db.patch(id, { isCompleted: isCompleted ?? !task.isCompleted })
    return task
  },
})
