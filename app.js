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

  // ---------- картинки: images/<image>.jpg|jpeg|png|webp|svg, иначе заглушка ----------
  const EXT = ['jpg', 'jpeg', 'png', 'webp', 'svg'];
  function productImg(p) {
    const img = new Image(); img.alt = p._ru; let i = 0, usedPlaceholder = false;
    const next = () => {
      if (i < EXT.length) img.src = `${S.imagesFolder}/${p.image ?? p.id}.${EXT[i++]}?v=${S.imagesVersion || 1}`;
      else if (!usedPlaceholder) { usedPlaceholder = true; img.src = `${S.imagesFolder}/${S.placeholder || 'placeholder.svg'}?v=${S.imagesVersion || 1}`; }
      else img.removeAttribute('src');
    };
    img.onerror = next; next(); return img;
  }

  if (S.priceNote) { $('#priceNote').textContent = S.priceNote; $('#priceNote').hidden = false; }

  // ---------- алфавит в шапке ----------
  const letters = 'АБВГДЕЖЗИКЛМНОПРСТУФХЦЧШЩЭЮЯ'.split('');
  $('#alpha').innerHTML = letters.concat(letters).map(l => `<span>${l}</span>`).join('');

  // ---------- карточки ----------
  function makeCard(p) {
    const card = document.createElement('article'); card.className = 'card';
    const thumb = document.createElement('div'); thumb.className = 'thumb'; thumb.append(productImg(p));
    const body = document.createElement('div'); body.className = 'card-body';
    body.innerHTML = `<h3></h3><div class="buy"><span class="price">${priceText(p)}</span><div class="ctl" data-ctl="${p.id}"></div></div>`;
    fillName(body.querySelector('h3'), p);
    card.append(thumb, body);
    return card;
  }
  $('#grid').append(...PRODUCTS.map(makeCard));

  // ---------- слайдер ----------
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

  // ---------- счётчик «− 1 +» и кнопка «В корзину» ----------
  const stepperHTML = id => `<div class="stepper"><button data-act="dec" data-id="${id}" aria-label="Уменьшить"><svg viewBox="0 0 14 14" aria-hidden="true"><path d="M2 7h10"/></svg></button><output>${cart[id]}</output><button data-act="inc" data-id="${id}" aria-label="Увеличить"><svg viewBox="0 0 14 14" aria-hidden="true"><path d="M2 7h10M7 2v10"/></svg></button></div>`;
  const addBtnHTML = id => `<button class="primary" data-act="add" data-id="${id}">В корзину</button>`;

  // Меняем только то, что изменилось: число в счётчике обновляется на месте
  function renderCard(id) {
    document.querySelectorAll(`[data-ctl="${id}"]`).forEach(el => {
      const q = cart[id], st = el.querySelector('.stepper');
      if (q && st) { st.querySelector('output').textContent = q; return; }
      const hadFocus = el.contains(document.activeElement);
      el.innerHTML = q ? stepperHTML(id) : addBtnHTML(id);
      if (hadFocus) el.querySelector(q ? '[data-act="inc"]' : '[data-act="add"]').focus();
    });
  }

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

  // ---------- корзина: строки создаются один раз, потом обновляются только числа ----------
  const cartRows = new Map();   // id -> { li, out, sum }
  function renderCart() {
    const list = $('#cartList'), ids = Object.keys(cart);
    cartRows.forEach((row, id) => { if (!cart[id]) { row.li.remove(); cartRows.delete(id); } });
    ids.forEach(id => {
      let row = cartRows.get(id);
      if (!row) {
        const p = byId[id], li = document.createElement('li');
        const main = document.createElement('div');
        main.innerHTML = `<div class="ci-name"></div><div class="ci-row">${stepperHTML(id)}<div class="ci-sum"></div></div><button class="remove" data-act="del" data-id="${id}">Удалить</button>`;
        fillName(main.querySelector('.ci-name'), p);
        li.append(productImg(p), main); list.append(li);
        row = { li, out: main.querySelector('output'), sum: main.querySelector('.ci-sum') };
        cartRows.set(id, row);
      }
      row.out.textContent = cart[id];
      row.sum.textContent = priceText(byId[id], cart[id]);
    });
    const badge = $('#cartCount'); badge.textContent = count(); badge.hidden = !count();
    $('#total').textContent = totalText();
    $('#cartEmpty').hidden = ids.length > 0;
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
  $('#backToShop').onclick = closeCart; $('#backToCart').onclick = showCartView;
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && drawer.classList.contains('open')) closeCart(); });

  // ---------- оформление: открываем почтовую программу с готовым письмом ----------
  const peekOrderNumber = () => Math.max(+store.get(ORDER_KEY) || 0, S.lastOrderNumber) + 1;
  const orderText = (number, email, note, withZh) => {
    const lines = Object.entries(cart).map(([id, q], i) =>
      `${i + 1}. ${withZh ? nameText(byId[id]) : byId[id]._ru} — ${q} шт. × ${priceText(byId[id])} = ${priceText(byId[id], q)}`);
    return [`Заказ № ${number}`, '', 'Состав заказа:', ...lines, '', `Итого: ${totalText()}`, `Почта для связи: ${email}`,
      ...(note ? ['', 'Сообщение для продавца:', note] : [])].join('\n');
  };
  const mailHref = (number, text) => `mailto:${S.orderEmail}?subject=${encodeURIComponent('Заказ № ' + number)}&body=${encodeURIComponent(text.replace(/\n/g, '\r\n'))}`;

  // На компьютере почтовая программа часто не настроена, поэтому по домену почты клиента
  // открываем письмо сразу в его веб-почте (в новой вкладке). Клиенту ничего выбирать не нужно.
  const isDesktop = matchMedia('(hover: hover) and (pointer: fine)').matches;
  const e = encodeURIComponent;
  const WEBMAIL = [
    { name: 'Gmail', label: 'Gmail', domains: ['gmail.com', 'googlemail.com'],
      url: m => `https://mail.google.com/mail/?view=cm&fs=1&to=${e(m.to)}&su=${e(m.subject)}&body=${e(m.body)}` },
    { name: 'Яндекс Почте', label: 'Яндекс Почта', domains: ['yandex.ru', 'yandex.com', 'yandex.by', 'yandex.kz', 'yandex.ua', 'ya.ru'],
      url: m => `https://mail.yandex.ru/compose?mailto=${e(m.mailto)}` },
    { name: 'Mail.ru', label: 'Mail.ru', domains: ['mail.ru', 'inbox.ru', 'list.ru', 'bk.ru', 'internet.ru'],
      url: m => `https://e.mail.ru/compose/?mailto=${e(m.mailto)}` },
    { name: 'Outlook', label: 'Outlook', domains: ['outlook.com', 'hotmail.com', 'live.com', 'msn.com', 'outlook.ru'],
      url: m => `https://outlook.live.com/mail/0/deeplink/compose?to=${e(m.to)}&subject=${e(m.subject)}&body=${e(m.body)}` }
  ];
  const webmailFor = email => { const d = (email.split('@')[1] || '').toLowerCase(); return WEBMAIL.find(w => w.domains.includes(d)) || null; };

  let pending = null;
  $('#checkout').onclick = () => {
    const email = $('#email').value.trim(), err = $('#emailError');
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      err.textContent = 'Укажите почту в формате name@example.com — по ней продавец свяжется с вами.'; err.hidden = false;
      $('#email').focus(); return;
    }
    err.hidden = true;
    const note = $('#note').value.trim(), n = peekOrderNumber(), number = S.orderPrefix + n;
    const subject = 'Заказ № ' + number;
    const wm = isDesktop ? webmailFor(email) : null;

    // слишком длинная ссылка — собираем письмо без китайских названий
    const make = withZh => {
      const text = orderText(number, email, note, withZh);
      const mailto = mailHref(number, text);
      return { text, mailto, href: wm ? wm.url({ to: S.orderEmail, subject, body: text, mailto }) : mailto };
    };
    const limit = isDesktop ? 6000 : 1800;
    let o = make(true); if (o.href.length > limit) o = make(false);
    pending = { n, number, email };

    $('#doneTitle').textContent = `Заказ № ${number} готов к отправке`;
    // компьютер, а почту клиента мы не узнали по адресу — даём выбрать веб-почту (почтовая программа на ПК часто не настроена)
    const picker = isDesktop && !wm;
    $('#doneText').textContent = wm
      ? `В новой вкладке откроется письмо в ${wm.name}. Проверьте его, нажмите «Отправить», затем вернитесь сюда и подтвердите.`
      : picker
        ? 'Выберите свою почту: откроется новое письмо с готовым заказом. Нажмите в нём «Отправить», затем вернитесь сюда и подтвердите.'
        : 'В почтовой программе откроется письмо с заказом. Нажмите в нём «Отправить», затем вернитесь сюда и подтвердите.';
    const box = $('#webmail'); box.innerHTML = ''; box.hidden = !picker;
    if (picker) WEBMAIL.forEach(w => {
      const a = document.createElement('a'); a.className = 'secondary as-link'; a.target = '_blank'; a.rel = 'noopener';
      a.href = w.url({ to: S.orderEmail, subject, body: o.text, mailto: o.mailto }); a.textContent = w.label; box.append(a);
    });
    $('#sellerMail').textContent = S.orderEmail;
    $('#orderText').textContent = o.text;
    const link = $('#mailLink'); link.href = o.href;
    if (wm) { link.target = '_blank'; link.rel = 'noopener'; } else { link.removeAttribute('target'); link.removeAttribute('rel'); }
    $('#manual').open = false;
    $('#pendingBlock').hidden = false; $('#sentBlock').hidden = true;
    $('#cartView').hidden = true; $('#doneView').hidden = false;

    if (wm) {
      const w = window.open(o.href, '_blank');
      if (w) w.opener = null; else $('#manual').open = true;   // вкладку заблокировали — показываем запасной вариант
      return;
    }
    if (picker) return;
    // если после перехода окно осталось на месте (почта не открылась) — сами раскрываем запасной вариант
    let left = false; const mark = () => { left = true; };
    window.addEventListener('blur', mark, { once: true });
    document.addEventListener('visibilitychange', mark, { once: true });
    window.location.href = o.href;
    setTimeout(() => { if (!left) $('#manual').open = true; }, 1800);
  };

  $('#sentBtn').onclick = () => {
    if (!pending) return;
    store.set(ORDER_KEY, pending.n);
    $('#sentText').textContent = `Заказ № ${pending.number}. Продавец свяжется с вами по адресу ${pending.email} для оплаты и передачи.`;
    cart = {}; saveCart(); $('#note').value = ''; pending = null;
    PRODUCTS.forEach(p => renderCard(p.id)); renderCart();
    $('#pendingBlock').hidden = true; $('#sentBlock').hidden = false;
  };

  async function copyText(btn, text, label) {
    try { await navigator.clipboard.writeText(text); btn.textContent = 'Скопировано'; }
    catch (e) { btn.textContent = 'Не удалось — выделите и скопируйте вручную'; }
    setTimeout(() => { btn.textContent = label; }, 2000);
  }
  $('#copyMail').onclick = e => copyText(e.target, S.orderEmail, 'Скопировать адрес');
  $('#copyOrder').onclick = e => copyText(e.target, $('#orderText').textContent, 'Скопировать текст заказа');

  PRODUCTS.forEach(p => renderCard(p.id)); renderCart();
})();
