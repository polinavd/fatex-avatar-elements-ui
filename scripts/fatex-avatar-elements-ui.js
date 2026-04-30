const MODULE_ID = "fatex-avatar-elements-ui";
const ROOT_CLASS = "fatex-avatar-elements-ui";
const DENSE_CLASS = "fatex-avatar-elements-ui--dense";
const HIGH_CONTRAST_CLASS = "fatex-avatar-elements-ui--high-contrast";

function applyThemeClasses() {
  const root = document.documentElement;
  const enabledForSystem = game.system?.id === "fatex";

  root.classList.toggle(ROOT_CLASS, enabledForSystem);
  root.classList.toggle(
    DENSE_CLASS,
    enabledForSystem && game.settings.get(MODULE_ID, "denseMode")
  );
  root.classList.toggle(
    HIGH_CONTRAST_CLASS,
    enabledForSystem && game.settings.get(MODULE_ID, "highContrast")
  );
}

function markThemedWindow(html) {
  const element = html?.jquery ? html[0] : html;
  element?.closest?.(".app")?.classList?.add("fatex-avatar-themed-window");
  element?.querySelectorAll?.(".fatex-header")?.forEach(addHeaderElements);
}

function addHeaderElements(header) {
  if (header.querySelector(".fatex-avatar-header-elements")) return;

  const elementBar = document.createElement("div");
  elementBar.className = "fatex-avatar-header-elements";
  elementBar.innerHTML = `
    <img src="modules/${MODULE_ID}/assets/elements/air.png" alt="">
    <img src="modules/${MODULE_ID}/assets/elements/water.png" alt="">
    <img src="modules/${MODULE_ID}/assets/elements/earth.png" alt="">
    <img src="modules/${MODULE_ID}/assets/elements/fire.png" alt="">
  `;

  header.appendChild(elementBar);
}

Hooks.once("init", () => {
  game.settings.register(MODULE_ID, "denseMode", {
    name: "Compact FateX sheets",
    hint: "Reduces some spacing in FateX actor and item sheets.",
    scope: "client",
    config: true,
    type: Boolean,
    default: false,
    onChange: applyThemeClasses
  });

  game.settings.register(MODULE_ID, "highContrast", {
    name: "Stronger ink contrast",
    hint: "Uses darker ink and stronger borders for readability.",
    scope: "client",
    config: true,
    type: Boolean,
    default: false,
    onChange: applyThemeClasses
  });
});

Hooks.once("ready", () => {
  applyThemeClasses();

  if (game.system?.id !== "fatex") {
    ui.notifications?.warn("FateX: Four Elements UI is intended for the FateX system.");
  }
});

Hooks.on("renderActorSheet", (_app, html) => {
  markThemedWindow(html);
});

Hooks.on("renderItemSheet", (_app, html) => {
  markThemedWindow(html);
});

Hooks.on("renderApplication", (_app, html) => {
  markThemedWindow(html);
});
