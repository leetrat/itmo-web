export function setupHeaderActions(onStorageClear) {
  const clearStorageLink = document.getElementById("clear-storage");
  const qrLink = document.getElementById("qr-code");

  clearStorageLink?.addEventListener("click", (event) => {
    event.preventDefault();
    clearStorage(onStorageClear);
  });

  qrLink?.addEventListener("click", (event) => {
    event.preventDefault();
    openQRModal();
  });
}

export function clearStorage(onCleared) {
  if (!confirm("Очистить все данные из localStorage?")) return;

  localStorage.clear();

  if (typeof onCleared === "function") {
    onCleared();
  }
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

export function openQRModal() {
  showModal("qr", "QR-код", (body) => {
    if (body.querySelector(".qr-image")) return;

    const image = document.createElement("img");
    image.className = "qr-image";
    image.src = "assets/qr-code.png";
    image.alt = "QR-код списка дел";

    body.append(image);
  });
}
