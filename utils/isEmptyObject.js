/**
 * @summary - Util function to check if the element is an object and empty
 * @param {object} - object to check
 * @returns {bool} - true or false
 */

export default function isEmptyObject(elem) {
  return Object.keys(elem).length === 0 && elem.constructor === Object;
}
