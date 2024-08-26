<script lang="ts">
  import { api } from '@/convex/_generated/api.js'
  import type { Id } from '@/convex/_generated/dataModel'
  import { useQuery } from 'convex-svelte'

  const { data } = $props()

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

<div class="prose max-w-screen-lg dark:prose-invert">
  <h1>Overview</h1>

  <div class="not-prose flex gap-6">
    <div class="flex-grow rounded-xl bg-primary p-6 text-primary-foreground">
      <div class="card-body">
        <h2 class="m-0 text-sm text-primary-foreground">Balance</h2>
        <p class="m-0 text-2xl">{currency.format(data.balance)}</p>
      </div>
    </div>

    <div class="card flex-grow rounded-xl bg-card p-6 text-card-foreground">
      <div class="card-body">
        <h2 class="text-sm">Income</h2>
        <p class="text-2xl">{currency.format(data.income)}</p>
      </div>
    </div>

    <div class="card flex-grow rounded-xl bg-card p-6 text-card-foreground">
      <div class="card-body">
        <h2 class="text-sm">Expenses</h2>
        <p class="text-2xl">{currency.format(Math.abs(data.expenses))}</p>
      </div>
    </div>
  </div>
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
</div>
