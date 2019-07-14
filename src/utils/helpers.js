/**
 * Compose several validators
 * @param {Array} validators
 */
export const composeValidators = (...validators) => value => {
  validators.reduce((error, validator) => error || validator(value), undefined);
};

export const required = value => (value ? undefined : 'Field should not be empty');

export const isEmail = value => (value.indexOf('@') > 0 ? undefined : 'Incorrect email');

/**
 * Merge old object with new properties
 *
 * @param {Object} oldObject
 * @param {Object} updatedProperties
 * @returns {Object}
 */
export const updateObject = (oldObject, updatedProperties) => {
  return {
    ...oldObject,
    ...updatedProperties,
  };
};

/**
 * Check if array exists and not empty
 * @param {Array} array
 * @return {Boolean} bool
 */
export const isArrayNotEmpty = (array) => array && array.length >= 1;

/**
 * Check if object is empty
 * @param {Object} object
 * @returns {Boolean}
 */
export const isEmpty = object => Object.keys(object).length === 0 && object.constructor === Object;

/**
 * Check if value is object
 * @param {Any} value
 * @return {Boolean}
 */
export const isObject = value => {
  const type = typeof value;
  return type === 'function' || (type === 'object' && !!value);
};
