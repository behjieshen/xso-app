/**
 * @summary - Util function to find nested objects such as "education.degree.yearGraduated"
 * @param {string} - String of nestedKey from parent
 * @param {object} - Data object to find value at the nestedKey
 * @returns {any} - Nested key-value data
 */

export const getNestedValueInObject = (nestedKey, data) => {
  if (nestedKey.includes(".")) {
    let temp = data;
    let nestedKeyArray = nestedKey.split(".");
    nestedKeyArray.forEach((key) => {
      temp = temp[key] || "";
    });
    return temp;
  }

  return data[nestedKey];
};
