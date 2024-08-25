<script lang="ts">
  import { page } from '$app/stores'
</script>

<div
  class="prose dark:prose-invert flex h-full flex-col justify-center text-center"
>
  <h1 class="m-0">Error {$page.status}</h1>
  <h3 class="m-0 opacity-50">{$page.error?.message}</h3>
</div>
