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
