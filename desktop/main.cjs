const { app, BrowserWindow, shell } = require("electron");
const path = require("node:path");

app.setName("AMCY Trader");
app.setAppUserModelId("com.amcy.trader");

function createWindow() {
  const window = new BrowserWindow({
    width: 1440,
    height: 920,
    minWidth: 720,
    minHeight: 620,
    backgroundColor: "#0b0e0d",
    title: "AMCY Trader",
    autoHideMenuBar: true,
    show: false,
    webPreferences: {
      preload: path.join(__dirname, "preload.cjs"),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: true,
      spellcheck: false,
    },
  });

  window.once("ready-to-show", () => window.show());
  window.webContents.setWindowOpenHandler(({ url }) => {
    if (!url || url === "about:blank") return { action: "allow" };
    if (/^https?:/i.test(url)) {
      shell.openExternal(url);
      return { action: "deny" };
    }
    return { action: "allow" };
  });
  const appRoot = app.isPackaged
    ? path.join(process.resourcesPath, "amcy")
    : path.join(__dirname, "..", "public", "amcy");
  window.loadFile(path.join(appRoot, "index.html"));
}

app.whenReady().then(() => {
  createWindow();
  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
