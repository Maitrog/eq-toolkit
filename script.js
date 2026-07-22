const supportedLanguages = new Set(["ru", "en"]);

export const resolveLanguage = (search, browserLanguage) => {
  const requested = new URLSearchParams(search).get("lang");
  if (supportedLanguages.has(requested)) return requested;
  return browserLanguage.toLowerCase().startsWith("ru") ? "ru" : "en";
};

export const getLanguageUrl = (href, language) => {
  const url = new URL(href);
  url.searchParams.set("lang", language);
  return url.toString();
};

const translations = {
  en: {
    metaTitle: "EQ Toolkit — Audio equalizer for Chrome",
    metaDescription:
      "Shape sound on any website with a multiband equalizer, volume boost, presets, spectrum visualization, shortcuts, and auto-start.",
    navFeatures: "Features",
    navHow: "How it works",
    navInstall: "Install",
    navLabel: "Main navigation",
    languageLabel: "Switch language to Russian",
    languageButton: "RU",
    eyebrow: "Sound tuned to you",
    heroTitle: "Your sound. Your rules.",
    heroText:
      "Boost volume, shape every frequency, and save your favorite sound — right in the browser.",
    storeAlt: "Available in the Chrome Web Store",
    previewAlt: "EQ Toolkit equalizer interface",
    featuresEyebrow: "Everything within reach",
    featuresTitle: "Make every tab sound better",
    howEyebrow: "Simple by design",
    howTitle: "From install to your sound in three steps",
    installTitle: "Ready to hear the difference?",
    installText:
      "Add EQ Toolkit to Chrome and take control of sound on every website.",
    privacy: "Privacy",
    features: [
      [
        "EQ",
        "Flexable equalizer and spectrum visualization",
        "Shape bass, vocals, and highs with adjustable frequency points. Choose any frequency you want, adjust it, and see the changes instantly.",
      ],
      [
        "dB",
        "Volume boost",
        "Raise or lower the overall level for the active tab.",
      ],
      [
        "★",
        "Your presets",
        "Save favorite settings and return to them in one click.",
      ],
      [
        "tab",
        "Per-tab control",
        "Keep separate sound settings for different tabs and sites.",
      ],
      ["Auto", "Auto launch", "Enable auto launch on your favorite websites."],
      ["⌘", "Shortcuts", "Control key actions from the keyboard."],
    ],
    steps: [
      ["01", "Install", "Add EQ Toolkit from the Chrome Web Store."],
      ["02", "Open", "Play audio in a tab and open the extension."],
      ["03", "Tune", "Drag the EQ points or choose a preset you already love."],
    ],
  },
  ru: {
    metaTitle: "EQ Toolkit — аудиоэквалайзер для Chrome",
    metaDescription:
      "Настраивайте звук на любом сайте: многополосный эквалайзер, усиление громкости, пресеты, визуализация спектра, горячие клавиши и автозапуск.",
    navFeatures: "Возможности",
    navHow: "Как это работает",
    navInstall: "Установить",
    navLabel: "Основная навигация",
    languageLabel: "Переключить язык на английский",
    languageButton: "EN",
    eyebrow: "Звук, настроенный под вас",
    heroTitle: "Ваш звук. Ваши правила.",
    heroText:
      "Усиливайте громкость, настраивайте частоты и сохраняйте любимое звучание — прямо в браузере.",
    storeAlt: "Доступно в Chrome Web Store",
    previewAlt: "Интерфейс эквалайзера EQ Toolkit",
    featuresEyebrow: "Всё под рукой",
    featuresTitle: "Сделайте звук каждой вкладки лучше",
    howEyebrow: "Ничего лишнего",
    howTitle: "От установки до вашего звука — три шага",
    installTitle: "Готовы услышать разницу?",
    installText:
      "Установите EQ Toolkit в Chrome и управляйте звуком на любом сайте.",
    privacy: "Конфиденциальность",
    features: [
      [
        "EQ",
        "Гибкий эквалайзер и отображение АЧХ",
        "Настраивайте бас, вокал и высокие частоты с помощью визуального интерфейса. Вы можете настроить любую частоту и сразу увидеть результат.",
      ],
      [
        "dB",
        "Усиление громкости",
        "Повышайте или снижайте общую громкость активной вкладки.",
      ],
      [
        "★",
        "Свои пресеты",
        "Сохраняйте любимые настройки и возвращайтесь к ним одним нажатием.",
      ],
      [
        "tab",
        "Настройки для вкладок",
        "Используйте отдельное звучание для разных вкладок и сайтов.",
      ],
      [
        "Авто",
        "Автоматический запуск",
        "Настройте автоматический запуск расширения на избранных сайтах.",
      ],
      ["⌘", "Горячие клавиши", "Управляйте основными действиями с клавиатуры."],
    ],
    steps: [
      ["01", "Установите", "Добавьте EQ Toolkit из Chrome Web Store."],
      ["02", "Откройте", "Включите аудио во вкладке и откройте расширение."],
      [
        "03",
        "Настройте",
        "Перетаскивайте точки эквалайзера или выберите готовый пресет.",
      ],
    ],
  },
};

if (typeof document !== "undefined") {
  const language = resolveLanguage(window.location.search, navigator.language);
  const copy = translations[language];
  const otherLanguage = language === "ru" ? "en" : "ru";

  document.documentElement.lang = language;
  document.title = copy.metaTitle;
  document.querySelector('meta[name="description"]').content =
    copy.metaDescription;
  document.querySelector('meta[property="og:title"]').content = copy.metaTitle;
  document.querySelector('meta[property="og:description"]').content =
    copy.metaDescription;

  document.querySelectorAll("[data-i18n]").forEach((element) => {
    element.textContent = copy[element.dataset.i18n];
  });
  document.querySelectorAll("[data-i18n-alt]").forEach((element) => {
    element.alt = copy[element.dataset.i18nAlt];
  });
  document.querySelectorAll("[data-i18n-aria-label]").forEach((element) => {
    element.setAttribute("aria-label", copy[element.dataset.i18nAriaLabel]);
  });

  const languageSwitch = document.querySelector("#language-switch");
  languageSwitch.textContent = copy.languageButton;
  languageSwitch.setAttribute("aria-label", copy.languageLabel);
  languageSwitch.addEventListener("click", () => {
    window.location.assign(getLanguageUrl(window.location.href, otherLanguage));
  });

  document.querySelector("#feature-grid").replaceChildren(
    ...copy.features.map(([icon, title, text]) => {
      const article = document.createElement("article");
      article.className = "feature-card";
      article.innerHTML = `<span class="feature-icon" aria-hidden="true">${icon}</span><h3>${title}</h3><p>${text}</p>`;
      return article;
    })
  );

  document.querySelector("#steps").replaceChildren(
    ...copy.steps.map(([number, title, text]) => {
      const item = document.createElement("li");
      item.innerHTML = `<span>${number}</span><h3>${title}</h3><p>${text}</p>`;
      return item;
    })
  );
}
