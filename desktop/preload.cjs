const { contextBridge } = require("electron");

contextBridge.exposeInMainWorld("amcyDesktop", Object.freeze({
  isDesktop: true,
  platform: process.platform,
  version: process.env.npm_package_version || "1.0.0",
}));
