import { assertEquals } from "./utils.ts";

// Write a data structure for a simple binary tree, and a function that prints a given tree.

class Node {
  value: number;
  left: Node | null;
  right: Node | null;

  constructor(v: number) {
    this.value = v;
    this.left = null;
    this.right = null;
  }
}

const printTree = (root: Node): string => {
  return "";
};

Deno.test("test", () => {
  const root = new Node(1);
  root.left = new Node(2);
  root.right = new Node(3);

  assertEquals(
    printTree(root),
    String.raw`
  1
 / \
2   3
`,
  );

  root.left.right = new Node(4);
  assertEquals(
    printTree(root),
    String.raw`
  1
 / \
2   3
 \
  4
`,
  );

  root.left.left = new Node(5);
  assertEquals(
    printTree(root),
    String.raw`
    1
   / \
  2   3
 / \
5   4
`,
  );

  root.right.right = new Node(6);
  assertEquals(
    printTree(root),
    String.raw`
    1
   / \
  2   3
 / \   \
5   4   6
`,
  );

  root.right.left = new Node(7);
  assertEquals(
    printTree(root),
    String.raw`
     1
    / \
   /   \
  2     3
 / \   / \
5   4 7   6
`,
  );
});
