import IMask from 'imask';

/**
 * Function masked
 * @param {HTMLInputElement} el
 */
export function masked(el) {
  const maskPattern = el.dataset.mask;

  if (!maskPattern) return;

  const config = {
    mask: maskPattern
  };

  return new IMask(el, config);
}
