<script lang="ts">
  import { Checkbox } from '$lib/components/ui/checkbox/index.js'
  import type { Id } from '@/convex/_generated/dataModel.js'
  import { useConvexClient, useQuery } from 'convex-svelte'
  import { api } from '../convex/_generated/api.js'

  const client = useConvexClient()
  const query = useQuery(api.tasks.get, {})

  function onCompletedChanged(id: Id<'tasks'>, isCompleted: boolean) {
    client.mutation(api.tasks.updateCompleted, { id, isCompleted })
  }
</script>

{#if query.isLoading}
  Loading...
{:else if query.error}
  failed to load: {query.error.toString()}
{:else}
  <ul>
    {#each query.data as task}
      <li>
        <Checkbox
          checked={task.isCompleted}
          onCheckedChange={(isChecked) =>
            onCompletedChanged(task._id, isChecked)}
        />
        {task.isCompleted ? '✅' : '❌'}
        <span>{task.text}</span>
        <span class="text-muted-foreground">assigned by {task.assigner}</span>
      </li>
    {/each}
  </ul>
{/if}
