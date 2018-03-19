"use strict";

var permissions = { origins: ["<all_urls>"] };
var prefPrependSnowflake = document.getElementById("prefPrependSnowflake");
prefPrependSnowflake.onchange = async () => {
  if (prefPrependSnowflake.checked) {
    prefPrependSnowflake.disabled = true;
    // Note: permissions.request only works when this page is shown in a tab,
    // i.e. when options_ui.open_in_tab=true in manifest.json.
    // See https://bugzilla.mozilla.org/show_bug.cgi?id=1382953
    prefPrependSnowflake.checked = await browser.permissions.request(permissions);
    prefPrependSnowflake.disabled = false;
  } else {
    browser.permissions.remove(permissions);
  }
  browser.storage.local.set({
    prependSnowflake: prefPrependSnowflake.checked,
  });
};

document.getElementById("i18n-toggleSnowflakePref").textContent =
  browser.i18n.getMessage("toggleSnowflakePref");

browser.storage.onChanged.addListener((changes) => {
  if (changes.prependSnowflake) {
    prefPrependSnowflake.checked = changes.prependSnowflake.newValue;
  }
});
browser.storage.local.get("prependSnowflake", (items) => {
  prefPrependSnowflake.checked = !!items.prependSnowflake;
});
