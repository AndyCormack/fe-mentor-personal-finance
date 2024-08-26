<script>
  import { PUBLIC_CONVEX_URL } from '$env/static/public'
  import '@/app.css'
  import '@/fonts.css'
  import ThemeToggle from '@/lib/components/ThemeToggle.svelte'
  import { setupConvex } from 'convex-svelte'
  import { ModeWatcher } from 'mode-watcher'

  const { children } = $props()
  setupConvex(PUBLIC_CONVEX_URL)
</script>

<ModeWatcher />

<div class="flex h-screen">
  <nav
    class="flex w-64 flex-col justify-between border-r bg-foreground p-4 text-background dark:bg-background dark:text-foreground"
  >
    <div class="flex flex-col gap-2">
      <a href="/">Home</a>
      <a href="/dashboard">Overview</a>
      <a href="/dashboard/transactions">Transactions</a>
    </div>

    <div class="text-foreground">
      <ThemeToggle />
    </div>
  </nav>

  <main class="flex-1 overflow-y-auto p-10">
    {@render children()}
  </main>
</div>
