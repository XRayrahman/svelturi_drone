<script>
  import "../app.css";
  let isDropdownOpen = false; // default state (dropdown close)
  let isChangeType = false;
  let isSSH = false;
  const handleDropdownClick = () => {
    isDropdownOpen = !isDropdownOpen; // togle state on click
  };

  const handleChangeClick = () => {
    isChangeType = !isChangeType;
  };

  const handleSSHClick = () => {
    isSSH = true;
    isChangeType = !isChangeType;
  };

  const handleUSBClick = () => {
    isSSH = false;
    isChangeType = !isChangeType;
  };

  // @ts-ignore
  const handleDropdownFocusLoss = ({ relatedTarget, currentTarget }) => {
    // use "focusout" event to ensure that we can close the dropdown when clicking outside or when we leave the dropdown with the "Tab" button
    if (
      relatedTarget instanceof HTMLElement &&
      currentTarget.contains(relatedTarget)
    )
      return; // check if the new focus target doesn't present in the dropdown tree (exclude ul\li padding area because relatedTarget, in this case, will be null)
    isDropdownOpen = false;
  };
</script>

<main class="flex-auto">
  <header>
    <nav
      class="bg-white border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800"
      on:focusout={handleDropdownFocusLoss}
    >
      <div class="flex flex-wrap justify-between items-center ">
        <div class="flex flex-wrap items-center ">
          <div class="items-center xl:hidden">
            <button
              class="hover:bg-slate-100 hover:border-gray-100 font-medium rounded-lg text-sm w-15 text-center inline-flex items-center dark:text-white dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              type="button"
              on:click={handleDropdownClick}
            >
              {#if isDropdownOpen}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 22 22"
                  class="h-5 w-5 stroke-current"
                >
                  <title>Close Dropdown</title>
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              {:else}
                <svg
                  aria-hidden="true"
                  class="w-5 h-5 stroke-current"
                  fill="none"
                  viewBox="0 0 22 22"
                  xmlns="http://www.w3.org/2000/svg"
                  ><path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  /></svg
                >
              {/if}
            </button>
          </div>
          <a href="https://github.com/XRayrahman" class="flex items-center">
            <img
              src="/src/lib/assets/redrone-accent-128.png"
              class="mr-2 h-10"
              alt="Redrone Logo"
            />
            <!-- <span
            class="self-center text-gray-600 text-xl font-semibold whitespace-nowrap dark:text-white"
            >RE.DRONE</span
          > -->
          </a>
        </div>
        <ul
          class="flex-row flex-wrap justify-start items-center hidden xl:flex xl:ml-44"
        >
          <a
            href="/"
            class="bg-slate-100 rounded-lg px-4 mx-2 self-center back  text-gray-600 text-md font-semibold whitespace-nowrap dark:text-white"
            aria-current="page">Home</a
          >
          <a
            href="/database"
            class="bg-slate-100 rounded-lg px-4 mx-2 self-center text-gray-600 text-md font-semibold whitespace-nowrap dark:text-white"
            aria-current="page">Database</a
          >
          <a
            href="/about"
            class="bg-slate-100 rounded-lg px-4 mx-2 self-center text-gray-600 text-md font-semibold whitespace-nowrap dark:text-white"
            aria-current="page">About</a
          >
          <a
            href="/settings"
            class="bg-slate-100 rounded-lg px-4 mx-2 self-center text-gray-600 text-md font-semibold whitespace-nowrap dark:text-white"
            aria-current="page">Settings</a
          >
        </ul>
        <div class="flex items-center lg:order-2 mt-2 md:mt-0">
          {#if isSSH}
            <div class="flex">
              <div class="flex h-9 px-3">
                {#if isChangeType}
                  <button
                    on:click={handleSSHClick}
                    class="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 rounded-none rounded-l-md border border-r-0 border-gray-300 dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600"
                  >
                    SSH
                  </button>
                  <button
                    on:click={handleUSBClick}
                    class="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 rounded-none border border-r-0 border-gray-300 dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600"
                  >
                    baud
                  </button>
                {:else}
                  <button
                    on:click={handleChangeClick}
                    class="hover:ring-black-500 hover:border-black-500  inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 rounded-none rounded-l-md border border-r-0 border-gray-300 dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600"
                  >
                    &#8651 SSH
                  </button>
                {/if}
                <input
                  type="text"
                  id="website-admin"
                  class=" rounded-none rounded-r-lg bg-gray-50 border text-gray-900 focus:ring-orange-500 focus:border-orange-500 block flex-1 min-w-0 w-32 text-sm border-gray-300 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="pi@raspberrypi"
                />
              </div>
            </div>
          {:else}
            <div class="flex">
              <div class="flex h-9 pl-3">
                <button
                  class="hover:ring-gray-300 hover:border-gray-300  inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 rounded-none rounded-l-md border border-r-0 border-gray-300 dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600"
                >
                  COM
                </button>
                <input
                  type="text"
                  class=" rounded-none rounded-r-lg bg-gray-50 border text-gray-900 focus:ring-orange-500 focus:border-orange-500 block flex-1 min-w-0 w-28 text-sm border-gray-300 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="COM0"
                />
              </div>
              <div class="flex h-9 px-3">
                {#if isChangeType}
                  <button
                    on:click={handleSSHClick}
                    class="hover:ring-black-500 hover:border-black-500  inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 rounded-none rounded-l-md border border-r-0 border-gray-300 dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600"
                  >
                    SSH
                  </button>
                  <button
                    on:click={handleUSBClick}
                    class="hover:ring-black-500 hover:border-black-500  inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 rounded-none border border-r-0 border-gray-300 dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600"
                  >
                    baud
                  </button>
                {:else}
                  <button
                    on:click={handleChangeClick}
                    class="hover:ring-black-500 hover:border-black-500  inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 rounded-none rounded-l-md border border-r-0 border-gray-300 dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600"
                  >
                    &#8651 baud
                  </button>
                {/if}
                <input
                  type="text"
                  id="website-admin"
                  class=" rounded-none rounded-r-lg bg-gray-50 border text-gray-900 focus:ring-orange-500 focus:border-orange-500 block flex-1 min-w-0 w-28 text-sm border-gray-300 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="115200"
                />
              </div>
            </div>
          {/if}
          <a
            href="https://github.com"
            id="ButtonPrimary"
            class=" text-white hover:text-orange-500 bg-black-500 hover:bg-black-700 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2 lg:px-5 h-9 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800"
            >CONNECT</a
          >
        </div>
      </div>
      <div>
        {#if isDropdownOpen}
          <ul
            class="justify-between items-center w-42 h-30 mx-2 rounded-lg px-2 py-2 "
          >
            <a
              href="/"
              class="bg-slate-100 rounded-lg px-4 ml-10 mx-2 self-center back  text-gray-600 text-md font-semibold whitespace-nowrap dark:text-white"
              aria-current="page">Home</a
            >
            <a
              href="/database"
              class="bg-slate-100 rounded-lg px-4 mx-2 self-center text-gray-600 text-md font-semibold whitespace-nowrap dark:text-white"
              aria-current="page">Database</a
            >
            <a
              href="/about"
              class="bg-slate-100 rounded-lg px-4 mx-2 self-center text-gray-600 text-md font-semibold whitespace-nowrap dark:text-white"
              aria-current="page">About</a
            >
            <a
              href="/settings"
              class="bg-slate-100 rounded-lg px-4 mx-2 self-center text-gray-600 text-md font-semibold whitespace-nowrap dark:text-white"
              aria-current="page">Settings</a
            >
          </ul>
        {/if}
      </div>
    </nav>
  </header>
  <slot />
  <footer
    class="p-4 bg-white rounded-lg shadow md:px-6 md:py-8 dark:bg-gray-900"
  >
    <div class="sm:flex sm:items-center sm:justify-between">
      <a href="https://github.com/XRayrahman" class="flex items-center">
        <img
          src="/src/lib/assets/evolion-128.png"
          class="mr-2 h-10"
          alt="Redrone Logo"
        />
        <img
          src="/src/lib/assets/redrone-accent-128.png"
          class="ml-2 h-10"
          alt="Redrone Logo"
        />
      </a>
      <ul
        class="flex flex-wrap items-center mb-6 text-sm text-gray-500 sm:mb-0 dark:text-gray-400"
      >
        <li>
          <a
            href="https://github.com/XRayrahman"
            class="mr-4 hover:underline md:mr-6 ">About</a
          >
        </li>
        <li>
          <a
            href="https://github.com/XRayrahman"
            class="mr-4 hover:underline md:mr-6">Privacy Policy</a
          >
        </li>
        <li>
          <a
            href="https://github.com/XRayrahman"
            class="mr-4 hover:underline md:mr-6 ">Licensing</a
          >
        </li>
        <li>
          <a href="https://github.com/XRayrahman" class="hover:underline"
            >Contact</a
          >
        </li>
      </ul>
    </div>
    <hr class="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
    <span class="block text-sm text-gray-500 sm:text-center dark:text-gray-400"
      >© 2022 <a href="https://xraizen.com/" class="hover:underline">EVOLION™</a
      >. All Rights Reserved.
    </span>
  </footer>
</main>
