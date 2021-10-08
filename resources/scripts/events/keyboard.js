
$(document).on('keyup', event => {
  switch (event.keyCode) {
    case 27: // esc-key
      return $('.btn-close').click();

    case 37: // left-key
      return $('.btn-prev').click();

    case 39: // right-key
      return $('.btn-next').click();

    default:
      return;
  }
});
