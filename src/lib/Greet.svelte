<script lang="ts">
  import { invoke } from "@tauri-apps/api/tauri";

  let name = "";
  let greetMsg = "";
  let count = 0;
  let countMsg = "";

  async function greet() {
    // Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
    greetMsg = await invoke("greet", { name: name });
  }

  async function counter() {
    count += 1;
    countMsg = await invoke("count", { value: count });
  }
</script>

<div>
  <div class="row">
    <input id="greet-input" placeholder="Enter a name..." bind:value={name} />
    <button on:click={greet}> Greet </button>
    <button on:click={counter}> count </button>
  </div>
  <p>{greetMsg}</p>
  <p>{countMsg}</p>
</div>
