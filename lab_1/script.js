// TODO (by priority):
// - Checkout
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
