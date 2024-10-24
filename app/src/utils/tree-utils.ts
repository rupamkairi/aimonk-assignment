export const array = [
  { id: 1, name: "root", parentId: null },
  { id: 2, name: "child1", parentId: 1 },
  { id: 3, name: "child2", parentId: 1, data: "c2 World" },
  { id: 4, name: "child1-child1", parentId: 2, data: "c1-c1 Hello" },
  { id: 5, name: "child1-child2", parentId: 2, data: "c1-c2 JS" },
];

export function parseArrayToTree(array) {
  const nodes = new Map();

  for (let item of array) {
    nodes.set(item.id, { ...item });
  }
  // console.log(nodes);

  const tree = [];
  for (let item of array) {
    if (!item.parentId) {
      tree.push(nodes.get(item.id));
      continue;
    }

    const parent = nodes.get(item.parentId);
    if (!parent.children) {
      parent.children = [];
    }
    parent.children.push(nodes.get(item.id));
  }

  return tree[0];
}

export function parseTreeToArray(tree) {
  const array = [];

  function traverse(node) {
    const { children, ...rest } = node;
    array.push(rest);

    if (children) {
      children.forEach((child) => traverse(child));
    }
  }

  traverse(tree);
  return array;
}
