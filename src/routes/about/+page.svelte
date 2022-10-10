<script>
    import Greet from "$lib/Greet.svelte";
</script>

<div class="flex-auto h-screen px-10 py-10 ">
    <h1 class="text-3xl font-bold ">Welcome to Tauri!</h1>
    <div class="row">
        <a href="https://vitejs.dev" target="_blank">
            <img src="/vite.svg" class="logo vite" alt="Vite Logo" />
        </a>
        <a href="https://tauri.app" target="_blank">
            <img src="/tauri.svg" class="logo tauri" alt="Tauri Logo" />
        </a>
        <a href="https://kit.svelte.dev" target="_blank">
            <img src="/svelte.svg" class="logo svelte" alt="Svelte Logo" />
        </a>
    </div>

    <p class="text-center">
        Click on the Tauri, Vite, and Svelte logos to learn more.
    </p>

    <div class="row">
        <Greet />
    </div>
</div>

<style>
    .logo.vite:hover {
        filter: drop-shadow(0 0 2em #a574ff);
    }

    .logo.svelte:hover {
        filter: drop-shadow(0 0 2em #ff3e00);
    }
</style>
