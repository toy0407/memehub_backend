const isNullorUndefined = (x: any) => {
  if (x === null || x === "undefined" || x === undefined) {
    return true;
  }
  return false;
};

const isDefined = (x: any) => {
  return !isNullorUndefined(x);
};

const isEmptyObject = (o: any) => {
  return !!o && Object.keys(o).length === 0 && o.constructor === Object;
};
const getRandomNumberInRange = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min)) + min;
};

const getUniqueArray = (arr: any[]) => {
  return Array.from(new Set(arr));
};

/**
 * Removes the duplicates from the list
 * @param list
 * @param filterByKey
 * @returns Filtered list with unique values
 */
const removeDuplicatesFromList = (list: { length: number; filter: (arg0: (v: any, i: any, a: any) => boolean) => any; map: (arg0: (item: any) => any[]) => Iterable<readonly [unknown, unknown]> | null | undefined; }, filterByKey: string | number, isKeepFirst = true) => {
  if (isNullorUndefined(filterByKey) || list.length == 0) {
    return [];
  }
  return isKeepFirst
    ? list.filter(
        (v: { [x: string]: any; }, i: any, a: any[]) =>
          a.findIndex((v2: { [x: string]: any; }) => v2[filterByKey] === v[filterByKey]) === i
      )
    : [...new Map(list.map((item: { [x: string]: any; }) => [item[filterByKey], item])).values()];
};

export const CommonUtils = {
    isNullorUndefined,
    isDefined,
    isEmptyObject,
    getRandomNumberInRange,
    getUniqueArray,
    removeDuplicatesFromList,
}