import { IClassObject } from '@typings/index';

/*!
 * getClassNames
 * @param {string|string[]} classNames - A className or array of classNames for lookup in classObject
 * @param {object} classObject - An object containing classNames
 * @returns {string}
 */
const getClassNames = (classNames: string | string[], classObject: IClassObject) => {
  if (typeof classObject !== 'object' || !classObject) {
    throw new Error('Error in getClassNames.js: classObject argument must be an object.');
  }

  if (typeof classNames === 'string') return classObject[classNames];

  if (!Array.isArray(classNames)) {
    throw new Error(
      'Error in getClassNames.js: classNames argument must be of type string or an array of strings.',
    );
  }

  let res = '';
  classNames.forEach(className => {
    if (typeof className === 'string') {
      res = res.concat(' ', classObject[className]);
    }
  });

  return res;
};
export default getClassNames;
