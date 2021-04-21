function createProductImageElement(imageSource) {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
}

function createCustomElement(element, className, innerText) {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
}

function createProductItemElement({ id, title, thumbnail }) {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', id));
  section.appendChild(createCustomElement('span', 'item__title', title));
  section.appendChild(createProductImageElement(thumbnail));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));
  
  return section;
}

function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
}

function cartItemClickListener(event) {
  console.log(event);
  event.target.remove();
}

function createCartItemElement({ id: sku, title: name, price: salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}
async function searchProduct() {
    const products = await fetch('https://api.mercadolibre.com/sites/MLB/search?q=computador');
    const data = await products.json();
    return data;
}
  
async function getItem() {
  const products = await searchProduct();
  products.results.forEach((element) => {
    const section = document.querySelector('.items');
    section.appendChild(createProductItemElement(element));
  });
}

async function searchId(id) {
  const itenId = await fetch(`https://api.mercadolibre.com/items/${id}`);
  const dataId = await itenId.json();
  createCartItemElement(dataId);
  document.querySelector('.cart__items').appendChild(createCartItemElement(dataId));
}
  
function clickId() {
  const addItem = document.querySelectorAll('.item__add');
  addItem.forEach(element => {
    element.addEventListener('click', (event) => {
      const item = getSkuFromProductItem(event.target.parentElement);
      searchId(item);
    });    
  });
}

window.onload = async function onload() {
  await getItem();
  await clickId();
};
