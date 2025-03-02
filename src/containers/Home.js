import React from "react";
import TestSelection from "../components/TestSelection";
// import "../scss/global.scss";

export default function Home() {
  return (
    <div>
      <h1 class="header center red-text text-darken-4">
        South Africa Research 2025
      </h1>
      <div class="row center">
        <h5 class="header col s12 light">
          <p>South Africa Research.</p>
        </h5>
      </div>

      <div class="divider"></div>
      <TestSelection />
    </div>
  );
}
