```svelte
<script>
  import { onMount } from "svelte";

  let text = '';

  onMount(() => {
    text = "Component mounted!"
  });
</script>

<h1>{text}</h1>

<style>
  h1 {
    color: blue;
  }
</style>
```
