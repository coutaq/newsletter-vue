import {
  app,
  BrowserWindow,
  shell,
  Menu,
  dialog,
  ipcMain,
  FileFilter,
} from "electron";
const fs = require("fs");
import { join } from "path";
import { URL } from "url";

const isMac = process.platform === "darwin";
const isSingleInstance = app.requestSingleInstanceLock();
const isDevelopment = import.meta.env.MODE === "development";

if (!isSingleInstance) {
  app.quit();
  process.exit(0);
}
app.disableHardwareAcceleration();

// Install "Vue.js devtools"
if (isDevelopment) {
  app
    .whenReady()
    .then(() => import("electron-devtools-installer"))
    .then(({ default: installExtension, VUEJS3_DEVTOOLS }) =>
      installExtension(VUEJS3_DEVTOOLS, {
        loadExtensionOptions: {
          allowFileAccess: true,
        },
      })
    )
    .catch((e) => console.error("Failed install extension:", e));
}

let mainWindow: BrowserWindow | null = null;

const createWindow = async () => {
  mainWindow = new BrowserWindow({
    width: 1336,
    height: 840,
    show: false, // Use 'ready-to-show' event to show window
    webPreferences: {
      nodeIntegration: true,
      nativeWindowOpen: true,
      webviewTag: false, // The webview tag is not recommended. Consider alternatives like iframe or Electron's BrowserView. https://www.electronjs.org/docs/latest/api/webview-tag#warning
      preload: join(__dirname, "../../preload/dist/index.cjs"),
    },
  });
  ipcMain.on("open-window", (event, arg) => {
    let route = arg.route;
    const modalPath =
      process.env.NODE_ENV === "development"
        ? "http://localhost:3000/#/" + route
        : `file://${__dirname}/index.html#` + route;
    let win = new BrowserWindow({
      width: arg.width,
      height: arg.height,
      webPreferences: {
        webSecurity: false,
        preload: join(__dirname, "../../preload/dist/index.cjs"),
      },
    });
    win.on("close", function () {
      win = null;
    });
    win.loadURL(modalPath);
  });
  ipcMain.on("reload", (event, arg) => {
    console.log("reloading web");
    mainWindow?.webContents.send("reload");
  });
  ipcMain.on("save-model", (event, arg) => {
    const saveOptions = {
      title: "?????????????????? ?? ????????",
      filters: [{ name: "JavaScript Object Notation", extensions: ["json"] }],
      properties: ["createDirectory", "showOverwriteConfirmation"],
    };
    dialog.showSaveDialog(mainWindow, saveOptions).then((filename) => {
      console.log(filename);
      try {
        fs.writeFileSync(filename.filePath, arg, "utf-8");
      } catch (e) {
        console.log(e);
      }
    });
  });
  const template = [
    // { role: 'appMenu' }
    ...(isMac
      ? [
          {
            label: app.name,
            submenu: [
              { role: "about" },
              { type: "separator" },
              { role: "services" },
              { type: "separator" },
              { role: "hide" },
              { role: "hideOthers" },
              { role: "unhide" },
              { type: "separator" },
              { role: "quit" },
            ],
          },
        ]
      : []),
    // { role: 'fileMenu' }
    {
      label: "????????",
      submenu: [
        isMac
          ? { label: "??????????", role: "close" }
          : { label: "??????????", role: "quit" },
        {
          label: "?????????? ???? ????????????????",
          click: () => {
            mainWindow?.webContents.send("logout");
          },
        },
        {
          label: "?????????????????? ?? Excel",
          click: () => {
            mainWindow?.webContents.send("save-excel", "test.xsls");
          },
        },
        {
          label: "????????????????????",
          role: "print",
          click: () => {
            mainWindow?.webContents.print(options, (success, failureReason) => {
              if (!success) console.log("fail:", failureReason);

              console.log("Print Initiated");
            });
          },
        },
      ],
    },
    // { role: 'editMenu' }
    {
      label: "Edit",
      submenu: [
        { role: "undo" },
        { role: "redo" },
        { type: "separator" },
        { role: "cut" },
        { role: "copy" },
        { role: "paste" },
        ...(isMac
          ? [
              { role: "pasteAndMatchStyle" },
              { role: "delete" },
              { role: "selectAll" },
              { type: "separator" },
              {
                label: "Speech",
                submenu: [{ role: "startSpeaking" }, { role: "stopSpeaking" }],
              },
            ]
          : [{ role: "delete" }, { type: "separator" }, { role: "selectAll" }]),
      ],
    },
    // { role: 'viewMenu' }
    {
      label: "??????",
      submenu: [
        {
          label: "????????????????",
          click: () => {
            mainWindow?.webContents.send("reload");
          },
        },
        { role: "reload" },
        { role: "forceReload" },
        { role: "toggleDevTools" },
        { type: "separator" },
        { role: "resetZoom" },
        { role: "zoomIn" },
        { role: "zoomOut" },
        { type: "separator" },
        { role: "togglefullscreen" },
      ],
    },
    // { role: 'windowMenu' }
    {
      label: "????????",
      submenu: [
        { label: "????????????", role: "minimize" },
        {
          label: "?????????????????????? ????????",
          click: () => {
            mainWindow?.webContents.send("change-theme");
          },
        },
        ...(isMac
          ? [
              { type: "separator" },
              { role: "front" },
              { type: "separator" },
              { role: "window" },
            ]
          : [{ role: "close" }]),
      ],
    },
    {
      role: "help",
      submenu: [
        {
          label: "Learn More",
          click: async () => {
            const { shell } = require("electron");
            await shell.openExternal("https://electronjs.org");
          },
        },
      ],
    },
  ];
  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);

  /**
   * If you install `show: true` then it can cause issues when trying to close the window.
   * Use `show: false` and listener events `ready-to-show` to fix these issues.
   *
   * @see https://github.com/electron/electron/issues/25012
   */
  mainWindow.on("ready-to-show", () => {
    mainWindow?.show();
  });

  /**
   * URL for main window.
   * Vite dev server for development.
   * `file://../renderer/index.html` for production and test
   */
  const pageUrl =
    isDevelopment && import.meta.env.VITE_DEV_SERVER_URL !== undefined
      ? import.meta.env.VITE_DEV_SERVER_URL
      : new URL(
          "../renderer/dist/index.html",
          "file://" + __dirname
        ).toString();

  await mainWindow.loadURL(pageUrl);
};

app.on("web-contents-created", (_event, contents) => {
  /**
   * Block navigation to origins not on the allowlist.
   *
   * Navigation is a common attack vector. If an attacker can convince the app to navigate away
   * from its current page, they can possibly force the app to open web sites on the Internet.
   *
   * @see https://www.electronjs.org/docs/latest/tutorial/security#13-disable-or-limit-navigation
   */
  contents.on("will-navigate", (event, url) => {
    const allowedOrigins: ReadonlySet<string> = new Set<`https://${string}`>(); // Do not use insecure protocols like HTTP. https://www.electronjs.org/docs/latest/tutorial/security#1-only-load-secure-content
    const { origin, hostname } = new URL(url);
    const isDevLocalhost = isDevelopment && hostname === "localhost"; // permit live reload of index.html
    if (!allowedOrigins.has(origin) && !isDevLocalhost) {
      console.warn("Blocked navigating to an unallowed origin:", origin);
      event.preventDefault();
    }
  });

  /**
   * Hyperlinks to allowed sites open in the default browser.
   *
   * The creation of new `webContents` is a common attack vector. Attackers attempt to convince the app to create new windows,
   * frames, or other renderer processes with more privileges than they had before; or with pages opened that they couldn't open before.
   * You should deny any unexpected window creation.
   *
   * @see https://www.electronjs.org/docs/latest/tutorial/security#14-disable-or-limit-creation-of-new-windows
   * @see https://www.electronjs.org/docs/latest/tutorial/security#15-do-not-use-openexternal-with-untrusted-content
   */
  contents.setWindowOpenHandler(({ url }) => {
    const allowedOrigins: ReadonlySet<string> = new Set<`http${string}`>([
      "https://vitejs.dev",
      "https://github.com",
      "https://v3.vuejs.org",
      "http://localhost",
      "http://109.254.85.64",
    ]);
    const { origin } = new URL(url);
    if (allowedOrigins.has(origin)) {
      shell.openExternal(url);
    } else {
      console.warn("Blocked the opening of an unallowed origin:", origin);
    }
    return { action: "deny" };
  });

  /**
   * Block requested permissions not on the allowlist.
   *
   * @see https://www.electronjs.org/docs/latest/tutorial/security#5-handle-session-permission-requests-from-remote-content
   */
  contents.session.setPermissionRequestHandler(
    (webContents, permission, callback) => {
      const origin = new URL(webContents.getURL()).origin;
      const allowedOriginsAndPermissions: Map<string, Set<string>> = new Map<
        `https://${string}`,
        Set<string>
      >([
        //['https://permission.site', new Set(['notifications', 'media'])],
      ]);
      if (allowedOriginsAndPermissions.get(origin)?.has(permission)) {
        callback(true);
      } else {
        console.warn(
          `${origin} requested permission for '${permission}', but was blocked.`
        );
        callback(false);
      }
    }
  );

  /**
   * Verify webview options before creation
   *
   * Strip away preload scripts, disable Node.js integration, and ensure origins are on the allowlist.
   *
   * @see https://www.electronjs.org/docs/latest/tutorial/security#12-verify-webview-options-before-creation
   */
  contents.on("will-attach-webview", (event, webPreferences, params) => {
    delete webPreferences.preload;
    // @ts-expect-error `preloadURL` exists - see https://www.electronjs.org/docs/latest/api/web-contents#event-will-attach-webview
    delete webPreferences.preloadURL;

    webPreferences.nodeIntegration = false;
    const { origin } = new URL(params.src);
    const allowedOrigins: ReadonlySet<string> = new Set<`https://${string}`>(); // Do not use insecure protocols like HTTP. https://www.electronjs.org/docs/latest/tutorial/security#1-only-load-secure-content
    if (!allowedOrigins.has(origin)) {
      console.warn(`A webview tried to attach ${params.src}, but was blocked.`);
      event.preventDefault();
    }
  });
});

app.on("second-instance", () => {
  // Someone tried to run a second instance, we should focus our window.
  if (mainWindow) {
    if (mainWindow.isMinimized()) mainWindow.restore();
    mainWindow.focus();
  }
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app
  .whenReady()
  .then(createWindow)
  .catch((e) => console.error("Failed create window:", e));

// Auto-updates
if (import.meta.env.PROD) {
  app
    .whenReady()
    .then(() => import("electron-updater"))
    .then(({ autoUpdater }) => autoUpdater.checkForUpdatesAndNotify())
    .catch((e) => console.error("Failed check updates:", e));
}

var options = {
  silent: false,
  printBackground: true,
  color: false,
  margin: {
    marginType: "printableArea",
  },
  landscape: false,
  pagesPerSheet: 1,
  collate: false,
  copies: 1,
  header: "Header of the Page",
  footer: "Footer of the Page",
};
