import React from "react";
import ReactDOM from "react-dom/client";
import { NiiVue } from "./NiiVue";

const BASE_URL = "https://cdn.jsdelivr.net/gh/qxdn/niivue-demo-qxdn@latest/assets";

const App = () => {
  const DWI = [
    {
      url: `${BASE_URL}/sub-strokecase0110_ses-0001_dwi.nii.gz`,
      volume: { hdr: {}, img: {} },
      colorMap: "gray",
      opacity: 1,
      visible: true,
      strokeType: "DWI",
    },
  ];

  const ADC = [
    {
      url: `${BASE_URL}/sub-strokecase0110_ses-0001_adc.nii.gz`,
      volume: { hdr: {}, img: {} },
      colorMap: "gray",
      opacity: 1,
      visible: true,
      strokeType: "ADC",
    },
  ];

  const SEG = [
    {
      url: `${BASE_URL}/sub-strokecase0110_ses-0001_dwi.nii.gz`,
      volume: { hdr: {}, img: {} },
      colorMap: "gray",
      opacity: 1,
      visible: true,
      strokeType: "DWI",
    },
    {
      url: `${BASE_URL}/sub-strokecase0110_ses-0001_msk.nii.gz`,
      volume: { hdr: {}, img: {} },
      colorMap: "red",
      opacity: 0.8,
      visible: true,
      strokeType: "LABEL",
    }
  ];


  return (
    <>
      <NiiVue volumeList={DWI} />
      <NiiVue volumeList={ADC} />
      <NiiVue volumeList={SEG} />
    </>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
