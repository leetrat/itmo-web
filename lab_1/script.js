// TODO (by priority):
// - QR-code at #qr

const featured_items = [
  {id: 1, name:"𒀭𒂗", icon: "🗿", price:47},
  {id: 2, name:"ܫܩܠܐ", icon: "🧿", price:82},
  {id: 3, name:"مِبخرة", icon: "🕯️", price:34},
  {id: 4, name:"כד שמן", icon: "🧴", price:71},
  {id: 5, name:"კერამიკა", icon: "🫖", price:26},
  {id: 6, name:"Маслёнок", icon: "🍄‍🟫", price:55},
  {id: 7, name:"𐎠𐎫𐎼", icon: "⭕", price:89},
  {id: 8, name:"धूपदान", icon: "☀️", price:41},
  { id: 9, name: "ܩܘܒܥܐ", icon: "⭐", price: 18 },
  { id: 10, name: "シラベ", icon: "🌲", price: 68 },
  { id: 11, name: "真鍮皿", icon: "🍽️", price: 52 },
];

let custom_items;

const RECENT_LIMIT = 20;

let recent_ids = [];
let cart = {};

const ICONS = [
  "🍎", "🍏", "🍐", "🍊", "🍋", "🍌", "🍉", "🍇",
  "🍓", "🫐", "🍒", "🍑", "🥭", "🍍", "🥥", "🥝",
  "🍅", "🍆", "🥑", "🥦", "🥬", "🥒", "🌶️", "🫑",
  "🌽", "🥕", "🧄", "🧅", "🥔", "🍠", "🥐", "🥯",
  "🍞", "🥖", "🧀", "🥚", "🍳", "🧈", "🥞", "🧇",
  "🥓", "🥩", "🍗", "🍖", "🌭", "🍔", "🍟", "🍕",
  "🥪", "🌮", "🌯", "🥙", "🧆", "🥘", "🍝", "🍜",
  "🍲", "🍛", "🍣", "🍱", "🥟", "🍤", "🍙", "🍚",
  "🍘", "🍥", "🥠", "🥮", "🍢", "🍡", "🍧", "🍨",
  "🍦", "🥧", "🧁", "🍰", "🎂", "🍮", "🍭", "🍬",
  "🍫", "🍿", "🍩", "🍪", "🌰", "🥜", "🍯",
  "☕", "🍵", "🧃", "🥤", "🧋", "🍺", "🍻", "🥂",
  "🍷", "🥃", "🍸", "🍹", "🧉", "🍾",
  "🐶", "🐱", "🐭", "🐹", "🐰", "🦊", "🐻", "🐼",
  "🐨", "🐯", "🦁", "🐮", "🐷", "🐸", "🐵", "🙈",
  "🙉", "🙊", "🐔", "🐧", "🐦", "🐤", "🦆", "🦅",
  "🦉", "🦇", "🐺", "🐗", "🐴", "🦄", "🦓", "🦍",
  "🐘", "🦏", "🐪", "🐫", "🦒", "🐃", "🐂", "🐄",
  "🐎", "🐖", "🐏", "🐑", "🐐", "🦌", "🐕", "🐩",
  "🐈", "🐓", "🦃", "🦚", "🦜", "🦢", "🕊️", "🐇",
  "🦝", "🦨", "🦡", "🦦", "🐁", "🐀", "🐿️", "🦔",
  "🦟", "🦗", "🕷️", "🦂", "🐢", "🐍", "🦎", "🦖",
  "🦕", "🐙", "🦑", "🦐", "🦀", "🐡", "🐠", "🐟",
  "🐬", "🐳", "🐋", "🦈", "🐊", "🐅", "🐆", "🦘",
  "🦬", "🦩",
  "🌲", "🌳", "🌴", "🌵", "🎍", "🌾", "🌿", "☘️",
  "🍀", "🍁", "🍂", "🍃", "🌸", "💮", "🏵️", "🌹",
  "🥀", "🌺", "🌻", "🌼", "🌷", "🪻", "🪴", "🍄",
  "🌱", "☀️", "🌤️", "⛅", "🌥️", "☁️", "🌦️", "🌧️",
  "⛈️", "🌩️", "🌨️", "❄️", "☃️", "⛄", "🌬️", "💨",
  "🌪️", "🌫️", "🌈", "☔", "⚡", "🔥", "💧", "🌊",
  "🗿", "🧿", "🔮", "✨", "🌟", "⭐", "💫", "☄️",
  "🌠", "🎆", "🎇", "🔔", "📯", "🎯", "💎", "💍",
  "🪙", "👑", "👒", "🎩", "🧢", "⛑️", "📿", "🧸",
  "🪄", "🪬", "🔱", "⚜️", "🏺", "⚱️", "🛡️", "🔗",
  "⛓️", "🧲",
  "🎸", "🎹", "🎺", "🎻", "🥁", "🎷", "🎤", "🎧",
  "🎼", "🎵", "🎶", "🎙️", "📻", "🔊",
  "🎬", "🎥", "📽️", "📞", "☎️", "📟", "📺", "🎮",
  "🕹️", "🎲", "♟️", "🎰", "🧩", "🃏", "🀄", "🎴",
  "📦", "📫", "📮", "✉️", "📜", "📖", "📚", "📰",
  "🔬", "🔭", "⚗️", "🧪", "🧬", "🧮", "📐", "📏",
  "✏️", "🖌️", "🔑", "🗝️", "🔒", "🔓", "🧹", "🧺",
  "🛒", "💰", "💵", "💸", "💳", "🏦", "💶", "💷",
  "🧾", "🏷️", "🔖", "📊", "📈", "📉", "🕯️", "🪔",
  "🧨", "🪓", "🔧", "🔨", "⚒️", "🛠️", "⛏️", "🗡️",
  "⚔️", "🪚", "🪛", "🔌", "💡", "🔦", "🕰️",
  "🚗", "🚕", "🚙", "🚌", "🚎", "🏎️", "🚓", "🚑",
  "🚒", "🚐", "🚚", "🚛", "🚜", "🛴", "🚲", "🏍️",
  "🚂", "🚆", "🚇", "🚊", "✈️", "🚀", "🛸", "🚁",
  "⛵", "🚤", "🛥️", "🚢", "⚓️", "🚦", "🚧",
  "⚽", "🏀", "🏈", "⚾", "🎾", "🏐", "🏉", "🎱",
  "🏓", "🏸", "🥊", "🥋", "🎽", "🛹", "⛷️", "🏂",
  "🏋️", "🤸", "⛹️", "🤺", "🤾", "🏌️", "🏇", "🧘",
  "🏅", "🏆", "🥇", "🥈", "🥉", "🎪", "🤹", "🎭",
  "🎨"
];

function loadJSON(key, fallback) {
  try {
    const value = JSON.parse(localStorage.getItem(key));
    return value === null ? fallback : value;
  } catch (error) {
    console.warn("Не удалось прочитать " + key + " из localStorage:", error);
    return fallback;
  }
}

function saveJSON(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.warn("Не удалось сохранить " + key + " в localStorage:", error);
  }
}

function randomPrice() {
  return Math.floor(Math.random() * 100);
}

function randomIcon() {
  return ICONS[Math.floor(Math.random() * ICONS.length)];
}

function allItems() {
  return featured_items.concat(custom_items);
}

function findItem(id) {
  return allItems().find(item => item.id === id);
}

function nextItemId() {
  return allItems().reduce((max, item) => Math.max(max, item.id), 0) + 1;
}

function getCustomItem(name) {
  const existing = custom_items.find(item => item.name === name);
  if (existing) return existing;

  const item = { id: nextItemId(), name: name, icon: randomIcon(), price: randomPrice() };
  custom_items.push(item);
  saveJSON("custom", custom_items);

  return item;
}

function recentItems() {
  return recent_ids.map(id => findItem(id)).filter(Boolean);
}

function buildItemCard(item, count, buttonLabel, onButtonClick) {
  const card = document.createElement("span");
  card.classList.add("item");

  const icon = document.createElement("span");
  icon.classList.add("icon");
  icon.textContent = item.icon;

  const row = document.createElement("span");
  row.classList.add("row");
  row.append(document.createTextNode(count > 1 ? item.name + " x " + count : item.name));

  const priceTag = document.createElement("a");
  priceTag.classList.add("price-tag");
  priceTag.textContent = "$" + (count > 1 ? item.price * count : item.price);
  row.append(priceTag);

  card.append(icon, row);

  if (buttonLabel) {
    const button = document.createElement("input");
    button.type = "button";
    button.value = buttonLabel;
    button.addEventListener("click", onButtonClick);
    card.append(button);
  }

  return card;
}

function renderList(listID, entries, buttonLabel, onButtonClick) {
  const list = document.getElementById(listID);
  list.innerHTML = "";

  for (const [item, count] of entries) {
    list.append(buildItemCard(item, count, buttonLabel, () => onButtonClick(item)));
  }
}

function renderFeatured(list = featured_items) {
  renderList("featured-list", list.map(item => [item, 1]), "Купить", addToCart);
}

function renderRecent(list = recentItems()) {
  renderList("history-list", list.map(item => [item, 1]), "Купить", addToCart);
}

function renderCreated(list = []) {
  renderList("custom-list", list.map(item => [item, 1]), "Купить", addToCart);
}

function cartEntries() {
  return Object.keys(cart)
    .map(id => [findItem(Number(id)), cart[id]])
    .filter(([item, count]) => item && count > 0);
}

function renderCart() {
  renderList("cart-list", cartEntries(), "Удалить", removeFromCart);
}

function updateCartCount() {
  const total = cartEntries().reduce((sum, [item, count]) => sum + item.price * count, 0);
  document.getElementById("cart-total").textContent = "$" + total;
}

function addToCart(item) {
  cart[item.id] = (cart[item.id] || 0) + 1;

  rememberRecent(item.id);

  saveJSON("cart", cart);
  renderCart();
  updateCartCount();

  const query = searchInput().value.trim();
  if (query) searchItems(query);
  else renderRecent();
}

function removeFromCart(item) {
  if ((cart[item.id] || 0) > 1) cart[item.id]--;
  else delete cart[item.id];

  saveJSON("cart", cart);
  renderCart();
  updateCartCount();
}

function rememberRecent(id) {
  recent_ids = recent_ids.filter(recentId => recentId !== id).concat(id);

  if (recent_ids.length > RECENT_LIMIT) {
    recent_ids = recent_ids.slice(-RECENT_LIMIT);
  }

  saveJSON("recent", recent_ids);
}

function searchItems(query) {
  const needle = query.trim().toLowerCase();
  const matches = item => item.name.toLowerCase().includes(needle);

  if (!needle) {
    renderFeatured();
    renderRecent();
    renderCreated();
    return;
  }

  getCustomItem(query.trim());

  renderFeatured(featured_items.filter(matches));
  renderRecent(recentItems().filter(matches));
  renderCreated(custom_items.filter(matches));
}

function searchInput() {
  return document.querySelector('input[type="search"]');
}

function showModal(id, title, build) {
  let modal = document.getElementById(id);

  if (!modal) {
    modal = document.createElement("dialog");
    modal.id = id;
    modal.className = "modal";

    const header = document.createElement("div");
    header.className = "modal-header";

    const heading = document.createElement("h2");
    heading.className = "modal-title";

    const close = document.createElement("button");
    close.type = "button";
    close.className = "modal-close";
    close.textContent = "✕";
    close.setAttribute("aria-label", "Закрыть");
    close.addEventListener("click", () => modal.close());

    const body = document.createElement("div");
    body.className = "modal-body";

    header.append(heading, close);
    modal.append(header, body);

    modal.addEventListener("click", (event) => {
      if (event.target === modal) modal.close();
    });

    document.body.append(modal);
  }

  modal.querySelector(".modal-title").textContent = title;
  build(modal.querySelector(".modal-body"));

  if (!modal.open) modal.showModal();
}

function openCheckoutModal() {
  const FIELDS = [
    { name: "firstName", label: "Имя", autocomplete: "given-name", placeholder: "Иван" },
    { name: "lastName", label: "Фамилия", autocomplete: "family-name", placeholder: "Иванов" },
    { name: "address", label: "Адрес доставки", autocomplete: "street-address", placeholder: "ул. Вавилонская, 1" },
    { name: "phone", label: "Контактный номер телефона", autocomplete: "tel", placeholder: "+7 900 000-00-00" }
  ];

  showModal("checkout-modal", "Оформление заказа", (body) => {
    let form = body.querySelector(".checkout-form");

    if (!form) {
      const summary = document.createElement("p");
      summary.className = "checkout-summary";

      form = document.createElement("form");
      form.className = "checkout-form";

      for (const field of FIELDS) {
        const label = document.createElement("label");
        label.className = "checkout-field";
        label.append(field.label);

        const input = document.createElement("input");
        input.type = field.name === "phone" ? "tel" : "text";
        input.name = field.name;
        input.placeholder = field.placeholder;
        input.autocomplete = field.autocomplete;
        input.required = true;

        label.append(input);
        form.append(label);
      }

      const actions = document.createElement("div");
      actions.className = "checkout-form-actions";

      const cancel = document.createElement("button");
      cancel.type = "button";
      cancel.className = "checkout-modal-cancel";
      cancel.textContent = "Отмена";
      cancel.addEventListener("click", () => form.closest("dialog").close());

      const submit = document.createElement("button");
      submit.type = "submit";
      submit.className = "checkout-submit";
      submit.textContent = "Создать заказ";

      actions.append(cancel, submit);
      form.append(actions);

      const success = document.createElement("div");
      success.className = "checkout-success";
      success.hidden = true;

      const successText = document.createElement("p");
      successText.textContent = "Заказ создан!";

      const close = document.createElement("button");
      close.type = "button";
      close.className = "checkout-close";
      close.textContent = "Закрыть";
      close.addEventListener("click", () => form.closest("dialog").close());

      success.append(successText, close);

      form.addEventListener("submit", (event) => {
        event.preventDefault();

        saveJSON("checkout", Object.fromEntries(new FormData(form)));

        cart = {};
        saveJSON("cart", cart);
        renderCart();
        updateCartCount();

        form.hidden = true;
        success.hidden = false;
      });

      body.append(summary, form, success);
    }

    const saved = loadJSON("checkout", {});

    for (const field of FIELDS) {
      const input = form.elements[field.name];
      if (input && !input.value) input.value = saved[field.name] || "";
    }

    const entries = cartEntries();
    const count = entries.reduce((sum, [, itemCount]) => sum + itemCount, 0);
    const total = entries.reduce((sum, [item, itemCount]) => sum + item.price * itemCount, 0);

    body.querySelector(".checkout-summary").textContent = count
      ? "Товаров: " + count + ", сумма: $" + total
      : "Корзина пуста";

    form.querySelector(".checkout-submit").disabled = count === 0;

    form.hidden = false;
    body.querySelector(".checkout-success").hidden = true;
  });
}

function openQRModal() {
  showModal("qr", "QR-код", (body) => {
    if (body.querySelector(".qr-image")) return;

    const image = document.createElement("img");
    image.className = "qr-image";
    image.src = "assets/qr-code.png";
    image.alt = "QR-код магазина";

    body.append(image);
  });
}

function clearStorage() {
  if (!confirm("Очистить все данные из localStorage?")) return;

  localStorage.clear();

  custom_items = [];
  recent_ids = [];
  cart = {};

  searchInput().value = "";

  renderFeatured();
  renderRecent();
  renderCreated();
  renderCart();
  updateCartCount();
}

document.addEventListener("DOMContentLoaded", function () {
  custom_items = loadJSON("custom", []);
  recent_ids = loadJSON("recent", []);
  cart = loadJSON("cart", {});

  renderFeatured();
  renderRecent();
  renderCreated();
  renderCart();
  updateCartCount();
});