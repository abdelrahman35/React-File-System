import { FileNode } from "@/models";

export const initialTree: FileNode = {
  id: "root",
  name: "root",
  type: "folder",
  children: [],
};

export function findNode(tree: FileNode, id: string): FileNode | null {
  if (tree.id === id) return tree;

  for (const child of tree.children || []) {
    const found = findNode(child, id);
    if (found) return found;
  }

  return null;
}

export function insertNode(
  tree: FileNode,
  parentId: string,
  newNode: FileNode,
): FileNode {
  if (tree.id === parentId && tree.type === "folder") {
    return {
      ...tree,
      children: [...(tree.children || []), newNode],
    };
  }

  return {
    ...tree,
    children: tree.children?.map((child) =>
      insertNode(child, parentId, newNode),
    ),
  };
}

export function deleteNode(tree: FileNode, id: string): FileNode | null {
  if (tree.id === id) return null;

  return {
    ...tree,
    children: tree.children
      ?.map((child) => deleteNode(child, id))
      .filter(Boolean) as FileNode[],
  };
}

export function renameNode(tree: FileNode, id: string, name: string): FileNode {
  if (tree.id === id) return { ...tree, name };

  return {
    ...tree,
    children: tree.children?.map((child) => renameNode(child, id, name)),
  };
}

export function findParentNode(tree: FileNode, id: string): FileNode | null {
  if (!tree.children) return null;

  for (const child of tree.children) {
    if (child.id === id) {
      return tree;
    }

    const parent = findParentNode(child, id);
    if (parent) {
      return parent;
    }
  }

  return null;
}
