import { data } from "../data/data";

export async function loadCustomComponents() {
  const loadingPromises = [];
  const errors: any = {};

  for (const customComponent of data.customComponents) {
    if (!customComponent.url) {
      continue;
    }

    const p = new Promise((resolve: any) => {
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

  await Promise.all(loadingPromises);

  console.log(errors);
}
