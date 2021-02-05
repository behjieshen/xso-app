export default function isEmptyObject(elem) {
  return Object.keys(elem).length === 0 && elem.constructor === Object;
}
