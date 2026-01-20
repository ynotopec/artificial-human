const notice = document.querySelector("[data-mermaid-status]");

async function loadMermaid() {
  try {
    const mermaid = await import(
      "https://cdn.jsdelivr.net/npm/mermaid@10/dist/mermaid.esm.min.mjs"
    );
    mermaid.default.initialize({ startOnLoad: true, theme: "default" });
    if (notice) {
      notice.hidden = true;
    }
  } catch (error) {
    if (notice) {
      notice.hidden = false;
    }
    console.error("Impossible de charger Mermaid.", error);
  }
}

loadMermaid();
