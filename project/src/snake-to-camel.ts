import _ from 'lodash';
// const _ = require('lodash')

export default function snakeToCamel(data: any) {
  const newData = data.map((el: any) => _.mapKeys(el, (_value:string, key:string) => _.camelCase(key)));
  // const newData = _.mapKeys(data, (_value:string, key:string) => _.camelCase(key));
  return newData;
}
