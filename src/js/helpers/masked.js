import IMask from 'imask';

/**
 * Function masked
 * @param {HTMLInputElement} el
 */
export default function masked(el) {
  const maskPattern = el.dataset.mask;

  if (!maskPattern) return;

  const config = {
    mask: maskPattern,
  };
  // eslint-disable-next-line consistent-return
  return new IMask(el, config);
}
