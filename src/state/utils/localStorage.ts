import localforage from "localforage";

localforage.config({
  driver: [localforage.INDEXEDDB, localforage.WEBSQL],
  name: "banshee-44.com"
});

export default localforage;
