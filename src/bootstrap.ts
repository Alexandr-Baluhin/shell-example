import { registerApplication, start } from "single-spa";

declare global {
  const __webpack_init_sharing__: (scope: string) => Promise<void>;
  const __webpack_share_scopes__: { [scope in string]: void };
}

const mfs = [
  {
    name: "mfe1",
    moduleName: ".",
    mountUrl: "/mfe1",
    remoteUrl: "http://localhost:3001/remoteEntry.js",
  },
  {
    name: "mfe2",
    moduleName: ".",
    mountUrl: "/mfe2",
    remoteUrl: "http://localhost:3002/remoteEntry.js",
  },
];

const loadRemoteEntryFile = async (url: string): Promise<void> => {
  return await new Promise((resolve, reject) => {
    const element = document.createElement("script");

    element.src = url;
    element.type = "text/javascript";
    element.async = true;

    element.onload = () => {
      element.parentElement.removeChild(element);
      resolve();
    };
    element.onerror = (error) => {
      element.parentElement.removeChild(element);
      reject(error);
    };

    document.head.appendChild(element);
  });
};

const registerRemoteModule = async (mf) => {
  await __webpack_init_sharing__("default");
  const container = window[mf.name] as any;
  await container.init(__webpack_share_scopes__.default);
  return (await container.get(mf.moduleName))();
};

const registerMicroFrontend = async (mf) => {
  await loadRemoteEntryFile(mf.remoteUrl);
  registerApplication({
    name: mf.name,
    app: async () => registerRemoteModule(mf),
    activeWhen: [mf.mountUrl],
  });
};

(async () => {
  await Promise.all(mfs.map(registerMicroFrontend));
  start({
    urlRerouteOnly: true,
  });
})();
