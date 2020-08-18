/**
 * Serialize all form data into a query string
 * @param  {HTMLFormElement}   form The form to serialize
 * @return {Object}      The serialized form data
 */
export default function serialize(form) {
  const serialized = {};

  // Loop through each field in the form
  for (let i = 0; i < form.elements.length; i++) {
    const field = form.elements[i];

    // Don't serialize fields without a name, submits, buttons,
    // file and reset inputs, and disabled fields
    // eslint-disable-next-line no-continue
    if (!field.name || field.disabled || field.type === 'file' || field.type === 'reset' || field.type === 'submit' || field.type === 'button') continue;

    // If a multi-select, get all selections
    if (field.type === 'select-multiple') {
      const values = [];
      for (let n = 0; n < field.options.length; n++) {
        // eslint-disable-next-line no-continue
        if (!field.options[n].selected) continue;
        values.push(field.options[n].value);
      }
      serialized[field.name] = values;
    } else if ((field.type !== 'checkbox' && field.type !== 'radio') || field.checked) {
      serialized[field.name] = field.value;
    }
  }
  return serialized;
}
