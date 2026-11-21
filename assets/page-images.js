// Image slots are rendered statically in the HTML.
// Kept as a no-op so older markup with data-photo-slot does not error.
for (const slot of document.querySelectorAll('[data-photo-slot]')) { slot.hidden = true; }
