const WA_NUMBER = "918145504119";

function baseWaLink(text){
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(text)}`;
}

const products = [
  { name:"Windsor Dining Table", tag:"Dining", specsBase:"6-seater", wood:"Sheesham / Teak / Mango", price:"₹18,500" },
  { name:"Aalen Sofa Set (3+2)", tag:"Living", specsBase:"5-seater", wood:"Sheesham / Engineered", price:"₹32,000" },
  { name:"Nordic Bed Frame", tag:"Bedroom", specsBase:"Queen / King", wood:"Sheesham / Teak", price:"₹22,000" },
  { name:"Verda 3-Door Wardrobe", tag:"Storage", specsBase:"3-door", wood:"Engineered / Teak", price:"₹27,500" },
  { name:"Kensho Study Desk", tag:"Work", specsBase:"Single drawer", wood:"Mango / Sheesham", price:"₹9,800" },
  { name:"Loom Bookshelf", tag:"Storage", specsBase:"5-tier", wood:"Mango / Engineered", price:"₹7,200" },
];

function renderProducts(targetId, filterTag){
  const grid = document.getElementById(targetId);
  if(!grid) return;
  const list = filterTag && filterTag !== "All" ? products.filter(p => p.tag === filterTag) : products;
  grid.innerHTML = "";
  list.forEach(p => {
    const waText = `Hi Sharma Furniture, I'm interested in the ${p.name}. Could you share sizing, wood, and polish options and a quotation?`;
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <div class="card-img" style="background:linear-gradient(135deg, var(--sand), var(--walnut));">
        <div class="grain"></div>
        <span class="tag">${p.tag}</span>
        <span class="mark">Photo placeholder</span>
      </div>
      <div class="card-body">
        <h3>${p.name}</h3>
        <div class="specs"><span>${p.specsBase}</span><span>${p.wood}</span></div>
        <div class="price-row"><div class="price">${p.price} <span>starting, size-based</span></div></div>
        <a class="card-btn" href="${baseWaLink(waText)}" target="_blank" rel="noopener">Get Quotation on WhatsApp</a>
      </div>
    `;
    grid.appendChild(card);
  });
}

function setupCatalogFilters(){
  const bar = document.getElementById("filterBar");
  if(!bar) return;
  const tags = ["All", ...new Set(products.map(p => p.tag))];
  bar.innerHTML = tags.map((t,i) => `<button class="filter-btn${i===0?' active':''}" data-tag="${t}">${t}</button>`).join("");
  bar.querySelectorAll(".filter-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      bar.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      renderProducts("productGrid", btn.dataset.tag);
    });
  });
}

function setupWaLinks(){
  const generalText = "Hi Sharma Furniture, I'd like to know more about your custom furniture.";
  document.querySelectorAll("[data-wa-general]").forEach(el => el.href = baseWaLink(generalText));
}

function setupUploadPreview(){
  const uploadBox = document.getElementById("uploadBox");
  const photoInput = document.getElementById("cPhoto");
  if(!uploadBox || !photoInput) return;
  const uploadLabel = document.getElementById("uploadLabel");
  const uploadPreview = document.getElementById("uploadPreview");
  const uploadImg = document.getElementById("uploadImg");

  uploadBox.addEventListener("click", () => photoInput.click());
  photoInput.addEventListener("change", () => {
    const file = photoInput.files[0];
    if(!file) return;
    const reader = new FileReader();
    reader.onload = e => {
      uploadImg.src = e.target.result;
      uploadPreview.style.display = "block";
      uploadLabel.textContent = file.name;
    };
    reader.readAsDataURL(file);
  });
}

function setupCustomForm(){
  const form = document.getElementById("customForm");
  if(!form) return;
  form.addEventListener("submit", e => {
    e.preventDefault();
    const name = document.getElementById("cName").value;
    const phone = document.getElementById("cPhone").value;
    const item = document.getElementById("cItem").value;
    const len = document.getElementById("cLen").value;
    const wid = document.getElementById("cWid").value;
    const hei = document.getElementById("cHei").value;
    const wood = document.getElementById("cWood").value;
    const polish = document.getElementById("cPolish").value;
    const notes = document.getElementById("cNotes").value;

    let sizeStr = "not specified";
    if(len || wid || hei){
      sizeStr = `${len||"?"} x ${wid||"?"} x ${hei||"?"} inches (L x W x H)`;
    }

    const msg = `Hi Sharma Furniture, I'd like a custom quotation.
Name: ${name}
Phone: ${phone}
Item: ${item}
Size: ${sizeStr}
Wood: ${wood}
Polish: ${polish}
Notes: ${notes || "none"}`;

    window.open(baseWaLink(msg), "_blank");
  });
}

document.addEventListener("DOMContentLoaded", () => {
  setupWaLinks();
  setupUploadPreview();
  setupCustomForm();
});
