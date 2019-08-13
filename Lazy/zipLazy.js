import map from "../Strict/map.js";
import toIter from '../Strict/toIter.js';
import curry from '../Strict/curry.js';
import go from "../Strict/go.js";
import mapLazy from "./mapLazy.js";
import rangeLazy from "./rangeLazy.js";
import takeWhileLazy from "./takeWhileLazy.js";
import someBy from "../Strict/someBy.js";

export default curry(function zipLazy(...iterables) {
  const iterators = map(toIter, iterables);
  return go(
    rangeLazy(Infinity),
    mapLazy(_ => map(it => it.next(), iterators)),
    takeWhileLazy(someBy(cur => !cur.done)),
    mapLazy(map(cur => cur.value)))
});