<script lang="ts">
  import { api } from '@/convex/_generated/api.js'
  import type { Id } from '@/convex/_generated/dataModel'
  import { useQuery } from 'convex-svelte'

  const query = useQuery(api.transactions.get, {
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

<div class="card">
  <div class="card-body prose max-w-screen-lg dark:prose-invert">
    <h1>Transactions</h1>

    <table class="w-full">
      <thead>
        <tr>
          <th class="text-start">Recipient / Sender</th>
          <th class="text-start">Category</th>
          <th class="text-start">Transaction Date</th>
          <th class="text-end">Amount</th>
        </tr>
      </thead>

      <tbody>
        {#if query.isLoading}
          <tr><td colspan="4">Loading...</td></tr>
        {:else if query.error}
          <tr><td colspan="4">Failed to load: {query.error.toString()}</td></tr>
        {:else}
          {#each query.data as transaction}
            <tr>
              <td class="align-middle">
                <div class="flex items-center gap-4">
                  <img
                    src={transaction.avatar}
                    alt={transaction.name}
                    width="40"
                    class="m-0 rounded-full"
                  />
                  {transaction.name}
                </div>
              </td>

              <td class="align-middle">
                {transaction.category}
              </td>

              <td class="align-middle">
                {date.format(new Date(transaction.date))}
              </td>

              <td class="text-end align-middle">
                {currency.format(transaction.amount)}
              </td>
            </tr>
          {/each}
        {/if}
      </tbody>
    </table>
  </div>
</div>
