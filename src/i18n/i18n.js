import I18n from "i18n-js";
import { LOCALES } from "../Constants/index";

//default locale
I18n.defaultLocale = LOCALES.ENGLISH.name;

// Enable fallbacks  to `en`
I18n.fallbacks = true;

//current locale
I18n.locale = LOCALES.ENGLISH.name;

I18n.translations = {
	en: require("./languages/english.json"),
	es: require("./languages/spanish.json")
};

