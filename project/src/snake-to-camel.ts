import _ from 'lodash';
import { FilmsDescription } from './types/films';


export default function snakeToCamel(data: FilmsDescription[]): FilmsDescription[] {
  const newData = data.map((el: FilmsDescription) => _.mapKeys(el, (_value, key:string) => _.camelCase(key)));
  return newData as FilmsDescription[];
}
