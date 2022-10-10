<script lang="ts">
    let meanAcc: number = 0;
    let meanTime: number = 0;
    let accurateVal: number[] = [0.72, 0.88, 0.91, 0.99, 0.67];
    let lat: number[] = [
        -7.285332323286225, -7.285061323286225, -7.285061323286225,
        -7.285061323286225, -7.285061323286225,
    ];
    let lng: number[] = [
        112.79615653419256, 112.79615653419256, 112.79615653419256,
        112.79615653419256, 112.79615653419256,
    ];
    let time: number[] = [8, 20, 11, 10, 44];
    $: for (let index = 0; index < accurateVal.length; index++) {
        meanAcc = meanAcc + accurateVal[index];
    }

    $: for (let index = 0; index < time.length; index++) {
        meanTime = meanTime + time[index];
    }

    // $: if (meanTime > 60) {
    //     meanTime = meanTime % 60;
    // }
</script>

<div class="overflow-x-auto m-10 h-screen relative justify-center ">
    <div><p class="text-xl">TABEL 2.2 INTEGRASI SISTEM</p></div>
    <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead
            class="text-xs text-white uppercase bg-black-500 dark:bg-gray-700 dark:text-gray-400"
        >
            <tr>
                <th scope="col" class="py-3 px-4 text-center rounded-tl-lg">
                    No.
                </th>
                <th scope="col" class="py-3 px-4 text-center "> Latitude </th>
                <th scope="col" class="py-3 px-4 text-center "> Longitude </th>
                <th scope="col" class="py-3 px-4 text-center ">
                    Accurate Value
                </th>
                <th scope="col" class="py-3 px-4 text-center rounded-tr-lg"
                    >Search Time
                </th>
            </tr>
        </thead>
        <tbody class="text-center">
            {#each accurateVal as num, i}
                <tr class=" text-black-500 dark:bg-gray-800">
                    <td class="py-4 px-4">
                        {i + 1}
                    </td>
                    <td class="py-4 px-4">
                        {lat[i]}
                    </td>
                    <td class="py-4 px-4 "> {lng[i]} </td>
                    <td
                        class="py-4 px-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                        {num}
                    </td>
                    <td class="py-4 px-4"> {time[i]} minutes </td>
                </tr>
            {/each}
        </tbody><tfoot class="bg-white">
            <tr
                class="font-semibold text-gray-900 dark:text-white text-center "
            >
                <td class="py-3 px-4 rounded-bl-lg bg-orange-200" />
                <td class="py-3 px-4 bg-orange-200" />
                <th class="py-3 px-4 bg-orange-200" />
                <th
                    scope="row"
                    class="py-3 px-4 text-base border-l-2 border-l-gray-900"
                    >Total</th
                >
                <td class="py-3 px-4 rounded-br-lg">{meanTime} minutes</td>
            </tr>
        </tfoot><tfoot class="bg-white border-y-2 border-y-gray-900">
            <tr class="font-semibold text-gray-900 dark:text-white text-center">
                <td class="py-3 px-4 bg-orange-300" />
                <th class="py-3 px-4 bg-orange-300" />
                <td class="py-3 px-4 border-l-2 border-l-gray-900">Average</td>
                <td class="py-3 px-4"
                    >{(meanAcc / accurateVal.length).toFixed(2)}</td
                >
                <td class="py-3 px-4"
                    >{(meanTime / time.length).toFixed(1)} minutes</td
                >
            </tr>
        </tfoot>
    </table>
</div>
