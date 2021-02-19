import { data } from "../data/data";

export async function loadCustomComponents() {
  const loadingPromises = [];
  const errors: any = {};

  console.groupCollapsed("Loading Custom Components");
  console.log(data);
  console.groupEnd();

  for (const customComponent of data.customComponents) {
    if (!customComponent.url) {
      continue;
    }

    const p = new Promise((resolve: any) => {
      console.log(`Loading custom component ${customComponent.url}`);

      const s = document.createElement("script");
      s.type = "text/javascript";
      s.src = customComponent.url;
      s.onload = () => {
        resolve();
      };
      s.onerror = (err) => {
        console.log(err);
        errors[customComponent.url] = err;
        resolve();
      };

      document.head.append(s);
    });

    loadingPromises.push(p);
  }

  // console.log("data.customComponents", data.customComponents, loadingPromises);

  await Promise.all(loadingPromises);

  // console.log("Load custom components errors", errors);
}
