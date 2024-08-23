<script>
  import { PUBLIC_CONVEX_URL } from '$env/static/public'
  import '@/app.css'
  import ThemeToggle from '@/lib/components/ThemeToggle.svelte'
  import { setupConvex } from 'convex-svelte'
  import { ModeWatcher } from 'mode-watcher'

  const { children } = $props()
  setupConvex(PUBLIC_CONVEX_URL)
</script>

<ModeWatcher />

<div class="flex min-h-screen">
  <nav
    class="flex w-64 flex-col justify-between bg-foreground p-4 text-background dark:bg-background dark:text-foreground"
  >
    <div>
      <a href="/">Overview</a>
    </div>

    <div class="text-foreground">
      <ThemeToggle />
    </div>
  </nav>

  <main class="flex-1 p-4">
    {@render children()}
  </main>
</div>
