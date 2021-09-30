import { registerApplication, start } from "single-spa";

registerApplication({
  name: "mfe1",
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  app: () => import("mfe1"),
  activeWhen: ["/mfe1"],
});

registerApplication({
  name: "mfe2",
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  app: () => import("mfe2"),
  activeWhen: ["/mfe2"],
});

start({
  urlRerouteOnly: true,
});
