import * as mdast from "mdast";
import { Plugin } from "unified";
import * as unist from "unist";

//type Child<T> = T extends unist.Parent<infer U> ? U : never;
//type DescendantOrSelf<T> = T | DescendantOrSelf<Child<T>>;
type DescendantOrSelf<T> = T | (T extends unist.Parent<infer U> ? U : never);

function visit(node: DescendantOrSelf<mdast.Root> & Partial<mdast.Parent>) {
  for (const child of node.children ?? []) {
    visit(child);
  }
}

function transformer(tree: mdast.Root) {
  visit(tree);
  return tree;
}

const attacher: Plugin<[], mdast.Root> = () => transformer;
export default attacher;
