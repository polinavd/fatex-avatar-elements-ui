const MODULE_ID = "fatex-avatar-elements-ui";
const ROOT_CLASS = "fatex-avatar-elements-ui";
const DENSE_CLASS = "fatex-avatar-elements-ui--dense";
const HIGH_CONTRAST_CLASS = "fatex-avatar-elements-ui--high-contrast";
const STARTER_SCENE_FLAG = "starterScene";
const STARTER_SCENE_NAME = "Four Elements Landing";
const STARTER_SCENE_BACKGROUND = `modules/${MODULE_ID}/assets/backgrounds/four-elements-battle.jpg`;

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
}

Hooks.once("init", () => {
  game.settings.register(MODULE_ID, "createStarterScene", {
    name: "Create Four Elements starter scene",
    hint: "When enabled, the module creates a Foundry scene that uses the bundled four-elements image as its background.",
    scope: "world",
    config: true,
    type: Boolean,
    default: true
  });

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
    return;
  }

  createStarterScene();
});

async function createStarterScene() {
  if (!game.user?.isGM) return;
  if (!game.settings.get(MODULE_ID, "createStarterScene")) return;

  const existingScene = game.scenes?.find((scene) => {
    return scene.getFlag(MODULE_ID, STARTER_SCENE_FLAG) || scene.name === STARTER_SCENE_NAME;
  });
  if (existingScene) return;

  try {
    const scene = await Scene.create({
      name: STARTER_SCENE_NAME,
      active: true,
      navigation: true,
      navName: "Four Elements",
      width: 1200,
      height: 675,
      padding: 0,
      background: {
        src: STARTER_SCENE_BACKGROUND
      },
      backgroundColor: "#111820",
      grid: {
        type: 0,
        size: 100
      },
      flags: {
        [MODULE_ID]: {
          [STARTER_SCENE_FLAG]: true
        }
      }
    });
    await scene?.activate();
  } catch (error) {
    console.error(`${MODULE_ID} | Failed to create starter scene`, error);
    ui.notifications?.error("FateX: Four Elements UI could not create the starter scene. See console for details.");
  }
}

Hooks.on("renderActorSheet", (_app, html) => {
  markThemedWindow(html);
});

Hooks.on("renderItemSheet", (_app, html) => {
  markThemedWindow(html);
});
