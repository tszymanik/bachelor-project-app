export const updateObject = (oldObject, updatedProperties) => ({
  ...oldObject,
  ...updatedProperties,
});

export const validate = (value, rules) => {
  let valid = true;

  if (rules) {
    if (rules.required) {
      valid = value.trim() !== ''
        && valid;
    }

    if (rules.minLength) {
      valid = value.length >= rules.minLength
        && valid;
    }

    if (rules.maxLength) {
      valid = value.length <= rules.maxLength
        && valid;
    }

    if (rules.test) {
      valid = new RegExp(rules.test)
        .test(value)
        && valid;
    }
  }

  return valid;
};

export const capitalize = string => string.replace(/(?:^|\s)\S/g, a => a.toUpperCase());
