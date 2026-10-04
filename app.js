(function () {
  const DATA = window.SHOP_DATA;
  const $ = s => document.querySelector(s);
  if (!DATA) { $('#loadError').hidden = false; return; }

  const S = DATA.settings, PRODUCTS = DATA.products;
  PRODUCTS.forEach(p => {
    const L = p.name.split('\n').map(x => x.trim()).filter(Boolean);
    p._ru = L.find(l => /[А-Яа-яЁё]/.test(l)) || L[0];
    p._zh = L.filter(l => l !== p._ru).join(' ');
  });
  const byId = Object.fromEntries(PRODUCTS.map(p => [p.id, p]));
  const num = n => n.toLocaleString('ru-RU');
  const fmt = n => num(n) + ' ' + S.currency;
  const priceText = (p, q = 1) => p.priceMax ? `${num(p.price * q)}\u00A0–\u00A0${num(p.priceMax * q)} ${S.currency}` : fmt(p.price * q);
  const nameText = p => p._ru + (p._zh ? ` (${p._zh})` : '');
  function fillName(el, p) {
    el.textContent = p._ru;
    if (p._zh) { const z = document.createElement('span'); z.className = 'zh'; z.textContent = p._zh; el.append(z); }
  }
  const CART_KEY = 'pushkin-shop-cart', ORDER_KEY = 'pushkin-shop-last-order';
  const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;

  const store = {
    get(k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
    set(k, v) { try { localStorage.setItem(k, v); } catch (e) {} }
  };
  let cart = {};
  try { cart = JSON.parse(store.get(CART_KEY)) || {}; } catch (e) {}
  Object.keys(cart).forEach(id => { if (!byId[id]) delete cart[id]; });
  const saveCart = () => store.set(CART_KEY, JSON.stringify(cart));

  // ---------- картинки: images/<id>.jpg|jpeg|png|webp|svg ----------
  const EXT = ['jpg', 'jpeg', 'png', 'webp', 'svg'];
  function productImg(p) {
    const img = new Image(); img.alt = p._ru; let i = 0;
    let usedPlaceholder = false;
    const next = () => {
      if (i < EXT.length) img.src = `${S.imagesFolder}/${p.image ?? p.id}.${EXT[i++]}`;
      else if (!usedPlaceholder) { usedPlaceholder = true; img.src = `${S.imagesFolder}/${S.placeholder || 'placeholder.svg'}`; }
      else img.removeAttribute('src');
    };
    img.onerror = next; next(); return img;
  }

  if (S.priceNote) { $('#priceNote').textContent = S.priceNote; $('#priceNote').hidden = false; }

  // ---------- алфавит в шапке ----------
  const letters = 'АБВГДЕЖЗИКЛМНОПРСТУФХЦЧШЩЭЮЯ'.split('');
  $('#alpha').innerHTML = letters.concat(letters).map(l => `<span>${l}</span>`).join('');

  // ---------- карточки (каталог и слайдер) ----------
  function makeCard(p, withText) {
    const card = document.createElement('article'); card.className = 'card';
    const thumb = document.createElement('div'); thumb.className = 'thumb'; thumb.append(productImg(p));
    card.append(thumb);
    card.insertAdjacentHTML('beforeend', `<h3></h3><div class="buy"><span class="price">${priceText(p)}</span><div class="ctl" data-ctl="${p.id}"></div></div>`);
    fillName(card.querySelector('h3'), p);
    return card;
  }
  $('#grid').append(...PRODUCTS.map(p => makeCard(p, true)));

  const recs = PRODUCTS.filter(p => String(p.recommended).toLowerCase() === 'yes');
  const track = $('#recTrack'), dotsEl = $('#recDots');
  recs.forEach((p, i) => {
    const s = document.createElement('div'); s.className = 'slide';
    s.setAttribute('role', 'group'); s.setAttribute('aria-label', `${i + 1} из ${recs.length}`);
    const im = document.createElement('div'); im.className = 'slide-img'; im.append(productImg(p));
    const info = document.createElement('div'); info.className = 'slide-info';
    info.innerHTML = `<h3></h3><div class="slide-price">${priceText(p)}</div><div class="ctl" data-ctl="${p.id}"></div>`;
    fillName(info.querySelector('h3'), p);
    s.append(im, info); track.append(s);
    const d = document.createElement('button'); d.className = 'dot'; d.setAttribute('aria-label', `Товар ${i + 1} из ${recs.length}`);
    d.onclick = () => goTo(i); dotsEl.append(d);
  });
  if (recs.length) $('#rec').hidden = false;

  const stepperHTML = id => `<div class="stepper"><button data-act="dec" data-id="${id}" aria-label="Уменьшить"><svg viewBox="0 0 14 14" aria-hidden="true"><path d="M2 7h10"/></svg></button><output>${cart[id]}</output><button data-act="inc" data-id="${id}" aria-label="Увеличить"><svg viewBox="0 0 14 14" aria-hidden="true"><path d="M2 7h10M7 2v10"/></svg></button></div>`;
  function renderCard(id) {
    document.querySelectorAll(`[data-ctl="${id}"]`).forEach(el => {
      el.innerHTML = cart[id] ? stepperHTML(id) : `<button class="primary" data-act="add" data-id="${id}">В корзину</button>`;
    });
  }

  // ---------- слайдер: один большой товар, листается сам и по кнопкам ----------
  let cur = 0, timer = null;
  function goTo(i) {
    if (!recs.length) return;
    cur = (i + recs.length) % recs.length;
    track.style.transform = `translateX(-${cur * 100}%)`;
    [...track.children].forEach((sl, k) => { sl.inert = k !== cur; sl.setAttribute('aria-hidden', k !== cur); });
    [...dotsEl.children].forEach((d, k) => d.setAttribute('aria-current', k === cur));
  }
  $('#recPrev').onclick = () => goTo(cur - 1);
  $('#recNext').onclick = () => goTo(cur + 1);
  const startAuto = () => { if (!reduceMotion && recs.length > 1 && !timer) timer = setInterval(() => goTo(cur + 1), 5500); };
  const stopAuto = () => { clearInterval(timer); timer = null; };
  const rec = $('#rec');
  ['mouseenter', 'focusin', 'touchstart'].forEach(ev => rec.addEventListener(ev, stopAuto, { passive: true }));
  ['mouseleave', 'focusout'].forEach(ev => rec.addEventListener(ev, startAuto));
  let x0 = null;
  track.addEventListener('touchstart', e => { x0 = e.touches[0].clientX; }, { passive: true });
  track.addEventListener('touchend', e => {
    if (x0 === null) return; const dx = e.changedTouches[0].clientX - x0; x0 = null;
    if (Math.abs(dx) > 40) goTo(cur + (dx < 0 ? 1 : -1));
  });
  goTo(0); startAuto();

  // ---------- действия ----------
  function change(id, delta) {
    const q = (cart[id] || 0) + delta;
    if (q <= 0) delete cart[id]; else cart[id] = Math.min(q, 99);
    saveCart(); renderCard(id); renderCart();
  }
  function remove(id) { delete cart[id]; saveCart(); renderCard(id); renderCart(); }
  const totals = () => Object.entries(cart).reduce((t, [id, q]) => { const p = byId[id]; t.lo += p.price * q; t.hi += (p.priceMax || p.price) * q; return t; }, { lo: 0, hi: 0 });
  const totalText = () => { const t = totals(); return t.lo === t.hi ? fmt(t.lo) : `${num(t.lo)}\u00A0–\u00A0${num(t.hi)} ${S.currency}`; };
  const count = () => Object.values(cart).reduce((s, q) => s + q, 0);

  document.addEventListener('click', e => {
    const b = e.target.closest('[data-act]'); if (!b) return;
    const id = +b.dataset.id, a = b.dataset.act;
    if (a === 'add' || a === 'inc') change(id, 1);
    else if (a === 'dec') change(id, -1);
    else if (a === 'del') remove(id);
  });

  // ---------- корзина ----------
  function renderCart() {
    const ids = Object.keys(cart);
    const badge = $('#cartCount'); badge.textContent = count(); badge.hidden = !count();
    const list = $('#cartList'); list.innerHTML = '';
    if (!ids.length) list.innerHTML = '<li class="empty">В корзине пусто. Добавьте что-нибудь из каталога.</li>';
    ids.forEach(id => {
      const p = byId[id], li = document.createElement('li');
      li.append(productImg(p));
      const mid = document.createElement('div');
      mid.innerHTML = `<div class="ci-name"></div><div class="ci-row">${stepperHTML(id)}<button class="remove" data-act="del" data-id="${id}">Удалить</button></div>`;
      fillName(mid.querySelector('.ci-name'), p);
      const sum = document.createElement('div'); sum.className = 'ci-sum'; sum.textContent = priceText(p, cart[id]);
      li.append(mid, sum); list.append(li);
    });
    $('#total').textContent = totalText();
    $('#cartFoot').hidden = !ids.length;
  }

  const drawer = $('#drawer'), overlay = $('#overlay');
  function showCartView() { $('#cartView').hidden = false; $('#doneView').hidden = true; }
  function openCart() {
    showCartView();
    overlay.hidden = false; drawer.classList.add('open'); drawer.setAttribute('aria-hidden', 'false');
    $('#closeCart').focus();
  }
  function closeCart() {
    drawer.classList.remove('open'); drawer.setAttribute('aria-hidden', 'true'); overlay.hidden = true;
    $('#openCart').focus();
  }
  $('#openCart').onclick = openCart; $('#closeCart').onclick = closeCart; overlay.onclick = closeCart;
  $('#backToShop').onclick = closeCart; $('#retry').onclick = showCartView;
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && drawer.classList.contains('open')) closeCart(); });

  // ---------- оформление заказа: отправка через Web3Forms ----------
  const peekOrderNumber = () => Math.max(+store.get(ORDER_KEY) || 0, S.lastOrderNumber) + 1;

  async function sendOrder(number, email, text) {
    const res = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify({
        access_key: S.web3formsKey,
        subject: 'Заказ № ' + number,
        from_name: S.shopName,
        name: 'Покупатель',
        email: email,
        message: text
      })
    });
    const json = await res.json();
    if (!res.ok || !json.success) throw new Error(json.message || 'Сервис не принял заказ');
  }

  $('#checkout').onclick = async () => {
    const email = $('#email').value.trim(), err = $('#emailError'), btn = $('#checkout');
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      err.textContent = 'Укажите почту в формате name@example.com — по ней продавец свяжется с вами.'; err.hidden = false;
      $('#email').focus(); return;
    }
    err.hidden = true;
    const note = $('#note').value.trim();
    const n = peekOrderNumber(), number = S.orderPrefix + n;
    const lines = Object.entries(cart).map(([id, q], i) =>
      `${i + 1}. ${nameText(byId[id])} — ${q} шт. × ${priceText(byId[id])} = ${priceText(byId[id], q)}`);
    const text = [`Заказ № ${number}`, '', 'Состав заказа:', ...lines, '', `Итого: ${totalText()}`, `Почта для связи: ${email}`, ...(note ? ['', 'Сообщение для продавца:', note] : [])].join('\n');

    btn.disabled = true; btn.textContent = 'Отправляем…';
    let ok = false, reason = '';
    try { await sendOrder(number, email, text); ok = true; }
    catch (e) { reason = e.message; }
    btn.disabled = false; btn.textContent = 'Оформить заказ';

    $('#cartView').hidden = true; $('#doneView').hidden = false;
    $('#orderText').textContent = text;
    $('#mailLink').href = `mailto:${S.orderEmail}?subject=${encodeURIComponent('Заказ № ' + number)}&body=${encodeURIComponent(text.replace(/\n/g, '\r\n'))}`;
    $('#fallback').hidden = ok;
    if (ok) {
      store.set(ORDER_KEY, n);
      cart = {}; saveCart(); $('#note').value = ''; PRODUCTS.forEach(p => renderCard(p.id)); renderCart();
      $('#doneTitle').textContent = `Заказ № ${number} отправлен`;
      $('#doneText').textContent = `Мы получили заказ и свяжемся с вами по адресу ${email} для оплаты и передачи.`;
    } else {
      $('#doneTitle').textContent = 'Заказ не отправился';
      $('#doneText').textContent = 'Проверьте интернет и попробуйте снова. Корзина сохранена. Можно также отправить заказ письмом вручную.' + (reason ? ' (' + reason + ')' : '');
    }
  };

  $('#copyOrder').onclick = async e => {
    try { await navigator.clipboard.writeText($('#orderText').textContent); e.target.textContent = 'Скопировано'; }
    catch (err) { const r = document.createRange(); r.selectNodeContents($('#orderText')); getSelection().removeAllRanges(); getSelection().addRange(r); e.target.textContent = 'Выделено — нажмите Ctrl+C'; }
  };

  PRODUCTS.forEach(p => renderCard(p.id)); renderCart();
})();
