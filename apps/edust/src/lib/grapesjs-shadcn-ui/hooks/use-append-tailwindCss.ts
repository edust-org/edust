export default async (frame: { view: { getEl: () => any } }) => {
  const iframe = frame.view.getEl();

  if (!iframe) return;

  const options = {
    tailwindPlayCdn: "https://cdn.tailwindcss.com?v=3.4.5",
    plugins: [],
    config: {},
  };

  const { tailwindPlayCdn, plugins, config } = options;
  const init = () => {
    if (iframe.contentWindow && iframe.contentWindow.tailwind) {
      iframe.contentWindow.tailwind.config = config;
    }
  };

  const script = document.createElement("script");
  script.src =
    tailwindPlayCdn + (plugins.length ? `?plugins=${plugins.join()}` : "");
  script.onload = init;
  script.onerror = () => {
    console.error("Failed to load Tailwind CSS script.");
  };

  const doc = iframe.contentDocument;
  if (doc && doc.readyState === "complete") {
    doc.head.appendChild(script);
  } else {
    // Use an interval to check if the iframe document is ready
    const f = setInterval(() => {
      const doc = iframe.contentDocument;
      if (doc && doc.readyState === "complete") {
        doc.head.appendChild(script);
        clearInterval(f);
      }
    }, 100);
  }
};
