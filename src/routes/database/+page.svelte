<script lang="ts">
    let meanAcc: number = 0;
    let meanTime: number = 0;
    let docSize: number[] = [];
    let docData: object[] = [];
    let detectionTime: String[] = [];
    // let test: String;

    import { db } from "../../utils/db";
    import {
        collection,
        doc,
        Firestore,
        getDocs,
        getDoc,
        QuerySnapshot,
    } from "firebase/firestore";
    import { each } from "svelte/internal";

    let accDetection: number[] = [];
    let latDetection: number[] = [];
    let lngDetection: number[] = [];
    let time: number[] = [8, 20, 11, 10, 44];
    let image: String[] = [];
    $: for (let index = 0; index < accDetection.length; index++) {
        meanAcc = meanAcc + accDetection[index];
    }

    $: for (let index = 0; index < time.length; index++) {
        meanTime = meanTime + time[index];
    }

    // $: docSize.length = Number(snapshot);

    async function snapshot() {
        const timeNow = new Date();
        let month: number = timeNow.getMonth();
        let day: number = timeNow.getDate();
        const querySnapshot = await getDocs(
            collection(db, "detection", String(month + 1), String(day - 2))
        );
        // return querySnapshot;
        querySnapshot.forEach((doc) => {
            // console.log(`${doc.id} => ${doc.data()}`);
            const doc1 = doc.data();
            docData = doc1["human_detected"];
            detectionTime = [doc.id];
        });
        // $: docSize.length = querySnapshot.size;
        // console.log(month + 1);
        docSize.length = Number(querySnapshot.size);
        // console.log(docSize.length);
        return querySnapshot.size;
    }

    $: for (let i = 0; i < docData.length; i++) {
        latDetection[i] = docData[i]["location"]["lat"];
        lngDetection[i] = docData[i]["location"]["lng"];
        accDetection[i] = docData[i]["accuracy"];
    }

    function updateData() {
        // docSize = [...docSize, docSize.length + 1];
        // docSize.push(Number(docSize) + Number(snapshot));
        // $: docSize.length = Number(snapshot);
    }

    // $: total = docSize.reduce((i, j) => i + j, 0);
    // $: if (meanTime > 60) {
    //     meanTime = meanTime % 60;
    // }
</script>

<div class="bg-white max-w-full h-screen ">
    <!-- <div class="w-44 flex h-full shadow-md bg-white px-1 absolute">
      <ul class="w-full">
        <div class="p-2">
          <span
            class="bg-gray-100 text-gray-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded mr-2 dark:bg-gray-700 dark:text-gray-300"
          >
            <svg
              aria-hidden="true"
              class="mr-1 w-3 h-3"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
              ><path
                fill-rule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                clip-rule="evenodd"
              /></svg
            >
            3 days ago
          </span>
          <span
            class="bg-blue-100 text-blue-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800"
          >
            <svg
              aria-hidden="true"
              class="mr-1 w-3 h-3"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
              ><path
                fill-rule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                clip-rule="evenodd"
              /></svg
            >
            2 minutes ago
          </span>
        </div>
      </ul>
    </div> -->
    <div
        class="w-full h-2 p-5 pl-10 items-center relative content-center justify-center"
    >
        <button
            on:click={snapshot}
            class="text-white content-center text-center hover:text-orange-500 bg-black-500 hover:bg-black-700 focus:ring-4"
            >load data</button
        >
    </div>
    <div class="overflow-x-auto bg-white m-10  relative justify-center ">
        {#each docSize as x, i}
            <div>
                <p class="text-xl text-black-700 text-center pb-4">
                    {detectionTime[i]} - HUMAN DETECTION
                </p>
            </div>
            <table
                class="w-full text-sm text-left text-gray-500 dark:text-gray-400"
            >
                <thead
                    class="text-xs text-white uppercase bg-black-500 dark:bg-gray-700 dark:text-gray-400"
                >
                    <tr>
                        <th
                            scope="col"
                            class="py-3 px-4 text-center rounded-tl-lg"
                        >
                            No.
                        </th>
                        <th scope="col" class="py-3 px-4 text-center ">
                            Latitude
                        </th>
                        <th scope="col" class="py-3 px-4 text-center ">
                            Longitude
                        </th>
                        <th scope="col" class="py-3 px-4 text-center ">
                            Accurate Value
                        </th>
                        <th
                            scope="col"
                            class="py-3 px-4 text-center rounded-tr-lg"
                            >Search Time
                        </th>
                    </tr>
                </thead>
                <tbody class="text-center">
                    {#each docData as num, i}
                        <tr class=" text-black-500 dark:bg-gray-800">
                            <td class="py-4 px-4">
                                {i + 1}
                            </td>
                            <td class="py-4 px-4">
                                {latDetection[i]}
                            </td>
                            <td class="py-4 px-4 "> {lngDetection[i]} </td>
                            <td
                                class="py-4 px-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                            >
                                {accDetection[i].toFixed(5)}
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
                        <!-- <th class="py-3 px-4 bg-orange-200" /> -->
                        <th
                            scope="row"
                            class="py-3 px-4 text-base border-l-2 border-l-gray-900"
                            >Total</th
                        >
                        <td class="py-3 px-4 rounded-br-lg"
                            >{accDetection.length} people</td
                        >
                        <td class="py-3 px-4 rounded-br-lg"
                            >{meanTime} minutes</td
                        >
                    </tr>
                </tfoot><tfoot class="bg-white border-y-2 border-y-gray-900">
                    <tr
                        class="font-semibold text-gray-900 dark:text-white text-center"
                    >
                        <td class="py-3 px-4 bg-orange-300" />
                        <th class="py-3 px-4 bg-orange-300" />
                        <td class="py-3 px-4 border-l-2 border-l-gray-900"
                            >Average</td
                        >
                        <td class="py-3 px-4"
                            >{(meanAcc / accDetection.length).toFixed(5)}</td
                        >
                        <td class="py-3 px-4"
                            >{(meanTime / time.length).toFixed(1)} minutes</td
                        >
                    </tr>
                </tfoot>
            </table>
        {/each}
    </div>
</div>
