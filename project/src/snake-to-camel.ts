import _ from 'lodash';
import { FilmsDescription } from './types/films';

export default function snakeToCamel(data: any): FilmsDescription[] {
  const newData = data.map((el: any) => _.mapKeys(el, (_value:string, key:string) => _.camelCase(key)));
  return newData;
}
