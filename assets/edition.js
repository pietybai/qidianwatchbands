'use strict';
const menuButton = document.querySelector('#menu');
const mobileNav = document.querySelector('#small-nav');
function closeMenu() {
  mobileNav.hidden = true;
  menuButton.setAttribute('aria-expanded', 'false');
}
if (menuButton && mobileNav) {
  menuButton.addEventListener('click', () => {
    mobileNav.hidden = !mobileNav.hidden;
    menuButton.setAttribute('aria-expanded', String(!mobileNav.hidden));
  });
  mobileNav.addEventListener('click', closeMenu);
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && !mobileNav.hidden) { closeMenu(); menuButton.focus(); }
  });
}
const sampleForm = document.querySelector('#sample');
const briefForm = document.querySelector('#brief');
function refreshSelection() {
  const colour = sampleForm.querySelector('[name="colour"]:checked');
  const crown = sampleForm.elements.crown.value;
  const photo = document.querySelector('#sample-photo');
  photo.src = colour.dataset.photo;
  photo.alt = colour.value + ' silicone conversion band compatible with Royal Pop';
  document.querySelector('#photo-colour').textContent = colour.value;
  document.querySelector('#chosen-colour').textContent = colour.value;
  document.querySelector('#chosen-crown').textContent = crown === 'Unsure' ? 'To be confirmed' : crown;
  document.querySelector('#photo-help').hidden = crown !== 'Unsure';
}
function enquiryLink(form, channel) {
  const data = new FormData(form);
  const product = form === sampleForm;
  const subject = product ? 'Sample enquiry – Band for Royal Pop' : 'Custom watch band quotation';
  const lines = ['Hello Qidian Watch Bands,', '', product ? 'Please quote the following band.' : 'Please quote my watch band project.', ''];
  if (product) {
    lines.push('Style: Band for Royal Pop', 'Crown: ' + (data.get('crown') === 'Unsure' ? 'Please check my dial photo' : data.get('crown')), 'Colour: ' + data.get('colour'));
  } else {
    lines.push('Model or lug width: ' + (data.get('fit').trim() || 'To be confirmed'), 'Material: ' + data.get('material'));
  }
  lines.push('Quantity: ' + (data.get('quantity') ? data.get('quantity') + ' pc(s)' : 'To be confirmed'));
  const message = encodeURIComponent(lines.join('\n'));
  return channel === 'wa' ? 'https://wa.me/8615914120274?text=' + message : 'mailto:marvin@szqidian.net?subject=' + encodeURIComponent(subject) + '&body=' + message;
}
if (sampleForm) { sampleForm.addEventListener('change', refreshSelection); refreshSelection(); }
for (const form of [sampleForm, briefForm]) {
  if (!form) continue;
  form.addEventListener('submit', event => {
    event.preventDefault();
    const channel = event.submitter?.value || 'email';
    const url = enquiryLink(form, channel);
    if (channel === 'wa') window.open(url, '_blank', 'noopener,noreferrer');
    else window.location.href = url;
  });
}

// 组页产品区块：点色卡换主图（通用，任何 [data-gallery] 都能用）
for (const box of document.querySelectorAll('[data-gallery]')) {
  const photo = box.querySelector('[data-gallery-photo]');
  const name = box.querySelector('[data-gallery-name]');
  if (!photo) continue;
  box.addEventListener('change', () => {
    const picked = box.querySelector('input[type=radio]:checked');
    if (!picked) return;
    if (picked.dataset.photo) photo.src = picked.dataset.photo;
    if (picked.dataset.alt) photo.alt = picked.dataset.alt;
    if (name) name.textContent = picked.value;
  });
}

// 产品页三维变体：壳色 / 表冠 / 颜色，主图 + 左栏缩略图（2026-11-26）
for (const box of document.querySelectorAll('[data-variant-gallery]')) {
  const SETS = {"black": {"12": {"Orange": "orange-12-black.webp", "White": "white-12-black.webp", "Pink": "pink-12-black.webp", "Red": "red-12-black.webp", "Green": "green-12-black.webp", "Yellow": "yellow-12-black.webp", "Light blue": "light-blue-12-black.webp", "Navy blue": "navy-blue-12-black.webp", "Grey blue": "grey-blue-12-black.webp", "Mint green": "mint-green-12-black.webp", "Black": "black-12-black.webp"}, "3": {"Orange": "orange-3-black.webp", "White": "white-3-black.webp", "Pink": "pink-3-black.webp", "Red": "red-3-black.webp", "Green": "green-3-black.webp", "Yellow": "yellow-3-black.webp", "Light blue": "light-blue-3-black.webp", "Navy blue": "navy-blue-3-black.webp", "Grey blue": "grey-blue-3-black.webp", "Mint green": "mint-green-3-black.webp", "Black": "black-3-black.webp"}}, "rose": {"12": {"Orange": "orange-12-rose.webp", "White": "white-12-rose.webp", "Pink": "pink-12-rose.webp", "Red": "red-12-rose.webp", "Green": "green-12-rose.webp", "Yellow": "yellow-12-rose.webp", "Light blue": "light-blue-12-rose.webp", "Navy blue": "navy-blue-12-rose.webp", "Grey blue": "grey-blue-12-rose.webp", "Mint green": "mint-green-12-rose.webp", "Black": "black-12-rose.webp"}, "3": {"Orange": "orange-3-rose.webp", "White": "white-3-rose.webp", "Pink": "pink-3-rose.webp", "Red": "red-3-rose.webp", "Green": "green-3-rose.webp", "Yellow": "yellow-3-rose.webp", "Light blue": "light-blue-3-rose.webp", "Navy blue": "navy-blue-3-rose.webp", "Grey blue": "grey-blue-3-rose.webp", "Mint green": "mint-green-3-rose.webp", "Black": "black-3-rose.webp"}}, "silver": {"12": {"Orange": "orange-12-silver.webp", "White": "white-12-silver.webp", "Pink": "pink-12-silver.webp", "Red": "red-12-silver.webp", "Green": "green-12-silver.webp", "Yellow": "yellow-12-silver.webp", "Light blue": "light-blue-12-silver.webp", "Navy blue": "navy-blue-12-silver.webp", "Grey blue": "grey-blue-12-silver.webp", "Mint green": "mint-green-12-silver.webp", "Black": "black-12-silver.webp"}, "3": {"White": "white-3-silver.webp"}}};
  const MAIN = ["main-01.webp", "main-02.webp", "main-03.webp", "main-04.webp", "main-05.webp", "main-06.webp", "main-07.webp"];
  const photo = box.querySelector('[data-gallery-photo]');
  const label = box.querySelector('[data-gallery-name]');
  const caseName = box.querySelector('[data-case-name]');
  const crownName = box.querySelector('[data-crown-name]');
  const note = box.querySelector('[data-variant-note]');
  const colourBox = box.querySelector('[data-colour-thumbs]');
  const mainThumbs = box.querySelectorAll('[data-main]');
  const CASE_LABEL = {black: 'Black', rose: 'Rose gold', silver: 'Silver'};
  let state = {case: 'black', crown: '12', colour: null};

  const setMain = (src, alt) => {
    if (photo) { photo.src = src; if (alt) photo.alt = alt; }
    mainThumbs.forEach(t => t.setAttribute('aria-pressed', 'false'));
  };

  const render = () => {
    const set = (SETS[state.case] && SETS[state.case][state.crown]) || {};
    const names = Object.keys(set);
    if (!names.includes(state.colour)) state.colour = names[0];
    box.querySelectorAll('[data-case]').forEach(b =>
      b.setAttribute('aria-pressed', String(b.dataset.case === state.case)));
    box.querySelectorAll('[data-crown]').forEach(b => {
      const ok = Boolean(SETS[state.case] && SETS[state.case][b.dataset.crown]);
      b.disabled = !ok;
      b.setAttribute('aria-pressed', String(b.dataset.crown === state.crown));
    });
    colourBox.innerHTML = '';
    names.forEach(en => {
      const b = document.createElement('button');
      b.type = 'button';
      b.className = 'pdp-thumb';
      b.setAttribute('aria-pressed', String(en === state.colour));
      b.innerHTML = '<img src="/assets/img/products/full-wrap/' + set[en] + '" alt="' + en +
        ' full-wrap case band for Royal Pop" width="70" height="70">';
      b.addEventListener('click', () => { state.colour = en; render(); });
      colourBox.appendChild(b);
    });
    const file = set[state.colour];
    if (file) {
      setMain('/assets/img/products/full-wrap/' + file,
        state.colour + ' full-wrap case band for Royal Pop, ' + CASE_LABEL[state.case].toLowerCase() +
        ' case, ' + state.crown + " o'clock");
    }
    if (caseName) caseName.textContent = CASE_LABEL[state.case];
    if (crownName) crownName.textContent = state.crown === '12' ? "12 o'clock" : "3 o'clock";
    if (label) label.textContent = state.colour;
    if (note) note.hidden = !(state.case === 'silver' && state.crown === '3');
  };

  box.querySelectorAll('[data-case]').forEach(b => b.addEventListener('click', () => {
    state.case = b.dataset.case;
    if (!(SETS[state.case] && SETS[state.case][state.crown])) state.crown = '12';
    render();
  }));
  box.querySelectorAll('[data-crown]').forEach(b => b.addEventListener('click', () => {
    if (!b.disabled) { state.crown = b.dataset.crown; render(); }
  }));
  mainThumbs.forEach(t => t.addEventListener('click', () => {
    mainThumbs.forEach(x => x.setAttribute('aria-pressed', 'false'));
    t.setAttribute('aria-pressed', 'true');
    setMain(t.dataset.photo, 'Full-wrap case band for Royal Pop');
  }));
  render();
}

// 通用变体控件：维度由页面内 window.__VAR__ 决定（2026-11-26）
for (const box of document.querySelectorAll('[data-variant-gallery]')) {
  if (box.hasAttribute('data-wired')) continue;
  const cfg = window.__VAR__;
  if (!cfg) continue;
  const photo = box.querySelector('[data-gallery-photo]');
  const label = box.querySelector('[data-gallery-name]');
  const colourBox = box.querySelector('[data-colour-thumbs]');
  const mainThumbs = box.querySelectorAll('[data-main]');
  const state = {};
  cfg.dims.forEach(d => { state[d.key] = d.values[0]; });

  const setMain = (src, alt) => {
    if (photo) { photo.src = src; if (alt) photo.alt = alt; }
    mainThumbs.forEach(t => t.setAttribute('aria-pressed', 'false'));
  };

  const resolve = () => {
    let node = cfg.sets;
    for (const d of cfg.dims) {
      node = node && node[state[d.key]];
      if (!node) return {};
    }
    return node || {};
  };

  const render = () => {
    const colours = resolve();
    const names = Object.keys(colours);
    if (!names.includes(state.colour)) state.colour = names[0];
    box.querySelectorAll('[data-dim]').forEach(b => {
      const key = b.dataset.dim;
      const saved = state[key];
      state[key] = b.dataset.value;
      const exists = Object.keys(resolve()).length > 0;
      state[key] = saved;
      b.disabled = !exists;
      b.setAttribute('aria-pressed', String(state[key] === b.dataset.value));
    });
    if (!colourBox) return;
    colourBox.innerHTML = '';
    names.forEach(cn => {
      const b = document.createElement('button');
      b.type = 'button';
      b.className = 'pdp-thumb';
      b.setAttribute('aria-pressed', String(cn === state.colour));
      b.innerHTML = '<img src="/assets/img/products/' + cfg.imgdir + '/' + colours[cn] + '" alt="' + cn +
        '" width="70" height="70">';
      b.addEventListener('click', () => { state.colour = cn; render(); });
      colourBox.appendChild(b);
    });
    if (colours[state.colour]) {
      setMain('/assets/img/products/' + cfg.imgdir + '/' + colours[state.colour], cfg.title + ', ' + state.colour);
    }
    if (label) label.textContent = state.colour;
  };

  box.querySelectorAll('[data-dim]').forEach(b => b.addEventListener('click', () => {
    if (b.disabled) return;
    state[b.dataset.dim] = b.dataset.value;
    render();
  }));
  mainThumbs.forEach(t => t.addEventListener('click', () => {
    mainThumbs.forEach(x => x.setAttribute('aria-pressed', 'false'));
    t.setAttribute('aria-pressed', 'true');
    setMain(t.dataset.photo, cfg.title);
  }));
  render();
}

// ---- GA4 事件（2026-11-27）：只记行为，不记任何个人信息 ----
(function () {
  if (typeof window.gtag !== 'function') return;
  var page = location.pathname;
  function send(name, params) {
    params.page_path = page;
    if (name === 'generate_lead') params.transport_type = 'beacon';
    gtag('event', name, params);
  }
  document.addEventListener('click', function (e) {
    var a = e.target && e.target.closest ? e.target.closest('a[href]') : null;
    if (!a) return;
    var href = a.getAttribute('href') || '';
    if (href.indexOf('mailto:') === 0) send('generate_lead', { method: 'email' });
    else if (href.indexOf('https://wa.me/') === 0) send('generate_lead', { method: 'whatsapp' });
  }, true);
  document.addEventListener('submit', function (e) {
    var f = e.target;
    if (!f || !f.id) return;
    var channel = e.submitter && e.submitter.value;
    send('generate_lead', { method: channel === 'wa' ? 'whatsapp' : 'email', form: f.id });
  }, true);
  document.addEventListener('change', function (e) {
    var t = e.target;
    if (!t || t.type !== 'radio') return;
    var box = t.closest('[data-gallery],[data-variant-gallery]');
    if (!box) return;
    send('select_variant', { variant_value: t.value });
  }, true);
  document.addEventListener('toggle', function (e) {
    var d = e.target;
    if (!d || d.tagName !== 'DETAILS' || !d.open) return;
    var s = d.querySelector('summary');
    send('specs_open', { section: (s ? s.textContent : '').trim().slice(0, 60) });
  }, true);
  document.addEventListener('click', function (e) {
    var a = e.target && e.target.closest ? e.target.closest('a[href^="http"]') : null;
    if (!a || a.hostname === location.hostname) return;
    send('outbound_click', { link_domain: a.hostname, link_url: a.href });
  }, true);
})();
