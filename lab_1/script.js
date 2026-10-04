// TODO (by priority):
// - Custom search items support
// - Checkout
// - Cart to localStorage
// - QR-code at #qr

const featured_items = [
  {name:"𒀭𒂗", icon: "🗿", price:47},
  {name:"ܫܩܠܐ", icon: "🧿", price:82},
  {name:"مِبخرة", icon: "🕯️", price:34},
  {name:"כד שמן", icon: "🧴", price:71},
  {name:"კერამიკა", icon: "🫖", price:26},
  {name:"Маслёнок", icon: "🍄‍🟫", price:55},
  {name:"𐎠𐎫𐎼", icon: "⭕", price:89},
  {name:"धूपदान", icon: "☀️", price:41},
  { name: "ܩܘܒܥܐ", icon: "⭐", price: 18 },
  { name: "シラベ", icon: "🌲", price: 68 },
  { name: "真鍮皿", icon: "🍽️", price: 52 },
];

const recent_items = [];

const items = [...featured_items];

const cart = {
  "name": 0
}

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

function randomPrice() {
  return Math.floor(Math.random() * 100);
}

function randomIcon() {
  return ICONS[Math.floor(Math.random() * ICONS.length)];
}

function createItem(name) {
  items += {
    name: name,
    icon: randomIcon(),
    price: randomPrice()
  }
}

function randomItem() {
  return createItem(randomIcon());
}

function renderItems(items, listID) {
  const list = document.getElementById(listID);
  list.innerHTML = "";

  for (const item of items) {
    const itemHTML = document.createElement("span");
    itemHTML.classList.add("item");
    itemHTML.innerHTML = `
      <span class="icon">${item.icon}</span>
      <span class="row">
        ${item.name}
        <a class="price-tag">$${item.price}</a>
      </span>
    `;

    itemHTML.innerHTML += `\n<input type="button" value="Купить" onclick="addToCart('${item.name}')">`
    list.appendChild(itemHTML);
  }
}

function renderCart() {
  const cartList = document.getElementById("cart");
  cartList.innerHTML = "";
  for (const [name, count] of Object.entries(cart)) {
    const item = items.find(i => i.name === name);
    if (!item) continue;
    const itemHTML = document.createElement("span");
    itemHTML.classList.add("item");
    itemHTML.innerHTML = `
      <span class="icon">${item.icon}</span>
      <span class="row">
        ${item.name} x ${count}
        <a class="price-tag">$${item.price}</a>
      </span>
      <input type="button" value="Удалить" onclick="removeFromCart('${item.name}')">
    `;
    cartList.appendChild(itemHTML);
  }
}

function updateCartCount() {
  const cartCount = Object.entries(cart).reduce((acc, [name, count]) => {
    const item = items.find(i => i.name === name);
    return acc + (item ? item.price * count : 0);
  }, 0);
  document.getElementById("cart-total").textContent = "$" + cartCount;
}

function addToCart(itemName) {
  const item = items.find(item => item.name === itemName);
  if (item) {
    const cartItem = cart[itemName];
    if (cartItem)
        cart[itemName]++;
    else cart[itemName] = 1;
    updateCartCount();
    renderCart();

    if (!recent_items.includes(item)) {
      recent_items.push(item);
      if (query = document.querySelector("input[type='search']").value)
        return searchItems(query);
      renderItems(recent_items, "recent");
    }
  }
}

function removeFromCart(itemName) {
  const cartItem = cart[itemName];
  if (cartItem) {
    cart[itemName]--;
    if (cart[itemName] === 0) delete cart[itemName];
    updateCartCount();
    renderCart();
  }
}

function searchItems(query) {
  const foundFeatured = featured_items.filter(item => item.name.includes(query));
  renderItems(foundFeatured, "recommended");

  const foundRecent = recent_items.filter(item => item.name.includes(query));
  renderItems(foundRecent, "recent");

  const foundCreated = [ createItem(query) ];
  renderItems(foundCreated, "created");
}

document.addEventListener("DOMContentLoaded", function () {
  updateCartCount();
  renderItems(featured_items, "recommended");
  renderCart();
});
