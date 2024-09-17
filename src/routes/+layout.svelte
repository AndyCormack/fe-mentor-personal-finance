<script>
  import { PUBLIC_CONVEX_URL } from '$env/static/public'
  import '@/app.css'
  import '@/fonts.css'
  import ThemeToggle from '@/lib/components/ThemeToggle.svelte'
  import { SignOut } from '@auth/sveltekit/components'
  import { SignIn } from '@auth/sveltekit/components'
  import { setupConvex } from 'convex-svelte'
  import { ModeWatcher } from 'mode-watcher'
  import { quintOut } from 'svelte/easing'
  import { crossfade, fade } from 'svelte/transition'

  const { children, data } = $props()
  setupConvex(PUBLIC_CONVEX_URL)

  const [send, receive] = crossfade({
    duration: 500,
    easing: quintOut,
  })
</script>

<ModeWatcher />

<div class="flex h-screen">
  <nav
    class="flex w-64 flex-col justify-between border-r bg-foreground p-4 text-background dark:bg-background dark:text-foreground"
  >
    <div class="flex flex-col gap-2">
      <a href="/">Home</a>
      <a href="/dashboard/">Overview</a>
      <a href="/dashboard/transactions">Transactions</a>
    </div>

    <div>
      {#if data.user}
        <div in:send={{ key: data.user }} out:receive={{ key: data.user }}>
          Hello
          {data.user.name?.split(' ')[0] || data.user.name || data.user.email}
          <SignOut />
        </div>
      {:else}
        <div in:send={{ key: data.user }} out:receive={{ key: data.user }}>
          <SignIn />
        </div>
      {/if}

      <div class="text-foreground">
        <ThemeToggle />
      </div>
    </div>
  </nav>

  <main class="flex-1 overflow-y-auto p-10">
    {@render children()}
  </main>
</div>
