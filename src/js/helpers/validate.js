const regExpDic = {
  email: /^([a-zA-Z0-9_]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})$/,
  password: /^[0-9a-zA-Z]{4,}$/,
  birthdate: /^(3[01]|[12][0-9]|0?[1-9])\.(1[012]|0?[1-9])\.((?:19|20)\d{2})$/,
  require: /^([^а-яА-ЯёЁ]+)$/,
};

/**
 * Function validate. Check Input on RegExp provided in regExpDic by input data-required type
 * @param {HTMLInputElement} el
 * @returns {Boolean} - Return true if input valid or doesn't have data-required attr
 */
export function validate(el) {
  const regExpName = el.dataset.required;
  if (!regExpDic[regExpName]) return true;
  return regExpDic[regExpName].test(el.value);
}
