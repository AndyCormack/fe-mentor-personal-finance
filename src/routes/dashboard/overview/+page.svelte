<script lang="ts">
  import { api } from '@/convex/_generated/api.js'
  import type { Id } from '@/convex/_generated/dataModel'
  import { useQuery } from 'convex-svelte'

  const query = useQuery(api.transactions.getRecent, {
    // TODO: use user from session
    user: 'jd76g1pn413xa9j0mgw83wczqn6zhdc3' as Id<'users'>,
  })

  const currency = new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP',
  })
  const date = new Intl.DateTimeFormat('en-GB', {
    dateStyle: 'medium',
  })
</script>

<h1>Overview</h1>

<div class="card">
  <div class="card-body">
    <h2>Transactions</h2>

    <ul>
      {#if query.isLoading}
        Loading...
      {:else if query.error}
        failed to load: {query.error.toString()}
      {:else}
        {#each query.data as transaction}
          <li class="flex justify-between">
            <div>
              <p>{transaction.avatar}</p>
              <p>{transaction.name}</p>
            </div>

            <div class="text-end">
              <p>{currency.format(transaction.amount)}</p>
              <p class="text-muted-foreground">
                {date.format(new Date(transaction.date))}
              </p>
            </div>
          </li>
        {/each}
      {/if}
    </ul>
  </div>
</div>
