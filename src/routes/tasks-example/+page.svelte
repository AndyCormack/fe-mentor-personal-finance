<script lang="ts">
  import { Checkbox } from '$lib/components/ui/checkbox/index.js'
  import { api } from '@/convex/_generated/api.js'
  import type { Id } from '@/convex/_generated/dataModel.js'
  import { useConvexClient, useQuery } from 'convex-svelte'
  import { SvelteMap } from 'svelte/reactivity'

  const client = useConvexClient()
  const query = useQuery(api.tasks.get, {})

  const loadingMap = new SvelteMap<Id<'tasks'>, boolean>()
  async function onCompletedChanged(id: Id<'tasks'>, isCompleted: boolean) {
    loadingMap.set(id, true)
    await client.mutation(api.tasks.updateCompleted, { id, isCompleted })
    loadingMap.delete(id)
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
          onCheckedChange={async (isChecked) => {
            onCompletedChanged(task._id, isChecked as boolean)
          }}
          disabled={!!loadingMap.get(task._id)}
        />
        <span>{task.text}</span>
        <span class="text-muted-foreground">assigned by {task.assigner}</span>
      </li>
    {/each}
  </ul>
{/if}
