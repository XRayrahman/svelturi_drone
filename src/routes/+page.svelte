<script lang="ts">
  // mapbox map
  // @ts-ignore
  import { Map, Marker } from "@beyonk/svelte-mapbox";
  /**
   * @type {{ flyTo: (arg0: { center: number[]; }) => void; }}
   */
  let mapComponent: { flyTo: (arg0: { center: number[] }) => void };
  let zoom: number = 15;
  $: lng = center[0];
  $: lat = center[1];

  function onReady() {
    mapComponent.flyTo({
      center: [center[0], center[1]],
    });
  }

  let meanAcc: number = 0;
  let meanTime: number = 0;
  let docSize: number[] = [];
  let docData: object[] = [];
  let detectionTime: String[] = [];
  // let test: String;

  import { db } from "../utils/db";
  import {
    collection,
    doc,
    Firestore,
    getDocs,
    getDoc,
    QuerySnapshot,
  } from "firebase/firestore";
  import { each } from "svelte/internal";
  import NavigationControl from "@beyonk/svelte-mapbox/src/lib/map/controls/NavigationControl.svelte";

  let accDetection: number[] = [];
  let latDetection: number[] = [
    -7.2764622, -7.2765929, -7.2765045, -7.2765921, -7.2766617,
  ];
  let lngDetection: number[] = [
    112.7962739, 112.7963167, 112.7961909, 112.7962016, 112.7962406,
  ];

  let center: number[] = [lngDetection[0], latDetection[0]];

  let imgDectection: String[] = [];
  let time: number[] = [8, 20, 11, 10, 44];
  $: for (let index = 0; index < accDetection.length; index++) {
    meanAcc = meanAcc + accDetection[index];
  }

  $: for (let index = 0; index < time.length; index++) {
    meanTime = meanTime + time[index];
  }

  // $: docSize.length = Number(snapshot);

  async function localData() {
    console.log("load data lokal");
  }

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
    imgDectection[i] = docData[i]["image"];
  }

  // $: center = [latDetection[0], lngDetection[0]];
  // leaflet map
  // import "leaflet/dist/leaflet.css"; //Don't forget to declare leaflet css
  // // @ts-ignore
  // import { Map, TileLayer, Marker, Popup } from "svelte-map-leaflet";

  // const mapOptions = { center: [40.6852119, -74.0788838], zoom: 10 };
  // const tileUrl = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
  // const markerLatLng = [40.6852119, -74.0788838];
  // const popupMessage = "Statue of Liberty National Monument";
</script>

<div class="flex h-full bg-white">
  <div class="column-2 h-full">
    <div class="h-80 xl:h-96 w-screen text-black">
      <Map
        accessToken="pk.eyJ1IjoicmFpemVueCIsImEiOiJjbDkycXFnbm4wem93M3VwbWkzNzNhcGoyIn0.N9D8kRk7KmBfZQ7JVAuGtg"
        style="mapbox://styles/raizenx/cl17iz8j2001n14popa20rw7i"
        bind:center
        bind:zoom
        on:ready={onReady}
      >
        <!-- <Geocoder accessToken="your api key" on:result={null}/> -->
        <!-- <Marker {lat} bind:lng label="test" /> -->
        {#each docData as x, i}
          <Marker lat={latDetection[i]} lng={lngDetection[i]} popup={false} />
        {/each}
        <!-- <Marker {lat} bind:lng popup={false} /> -->
        <NavigationControl />
      </Map>
    </div>

    <div class="w-screen row-auto flex space-x-5">
      <div class="h-2 pt-5 pl-10 text-black-800 font-bold">
        TABLE IDENTIFICATION
      </div>
      <div
        class=" w-screen flex space-x-5 h-1 pt-10 pr-5 items-center justify-end "
      >
        <button
          on:click={localData}
          class="text-black-700 content-center text-center bg-slate-100 focus:ring-4"
          >load data local</button
        >
        <button
          on:click={snapshot}
          class=" text-black-700 content-center text-center bg-slate-100 focus:ring-4"
          >load data firebase</button
        >
        >
      </div>
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
              <th scope="col" class="py-3 px-4 text-center rounded-tl-lg">
                No.
              </th>
              <th scope="col" class="py-3 px-4 text-center "> Latitude </th>
              <th scope="col" class="py-3 px-4 text-center "> Longitude </th>
              <th scope="col" class="py-3 px-4 text-center "> Image </th>
              <th scope="col" class="py-3 px-4 text-center ">
                Accurate Value
              </th>
              <th scope="col" class="py-3 px-4 text-center rounded-tr-lg"
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
                  class="py-4 px-10 object-center flex content-center items-center"
                >
                  <img
                    src={String(imgDectection[i])}
                    alt="detection"
                    width="64"
                    height="48"
                  />
                </td>
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
              <!-- <th class="py-3 px-4 bg-orange-200" /> -->
              <th class="py-3 px-4 bg-orange-200" />
              <th class="py-3 px-4 bg-orange-200" />
              <td class="py-3 px-4 bg-orange-200 text-base">Total</td>
              <td class="py-3 px-4 rounded-br-lg  border-l-2 border-l-gray-900"
                >{accDetection.length} people</td
              >
              <td class="py-3 px-4 rounded-br-lg">{meanTime} minutes</td>
            </tr>
          </tfoot><tfoot class="bg-white border-y-2 border-y-gray-900">
            <tr class="font-semibold text-gray-900 dark:text-white text-center">
              <td class="py-3 px-4 bg-orange-300" />
              <th class="py-3 px-4 bg-orange-300" />
              <th class="py-3 px-4 bg-orange-300" />
              <td class="py-3 px-4 bg-orange-300 text-base">Average</td>
              <td class="py-3 px-4 border-l-2 border-l-gray-900">
                {(meanAcc / accDetection.length).toFixed(5)}</td
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
</div>
