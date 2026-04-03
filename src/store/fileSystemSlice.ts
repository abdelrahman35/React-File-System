import { FileNode } from "@/models";
import {
  deleteNode,
  findParentNode,
  initialTree,
  insertNode,
  renameNode,
} from "@/utils";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface State {
  tree: FileNode;
  currentDirId: string;
  selectedFileId?: string;
}

const initialState: State = {
  tree: initialTree,
  currentDirId: "root",
};

const slice = createSlice({
  name: "fileSystem",
  initialState,
  reducers: {
    setCurrentDir(state, action: PayloadAction<string>) {
      state.currentDirId = action.payload;
      state.selectedFileId = undefined;
    },

    selectFile(state, action: PayloadAction<string>) {
      state.selectedFileId = action.payload;

      const parent = findParentNode(state.tree, action.payload);
      if (parent) {
        state.currentDirId = parent.id;
      }
    },

    addNode(
      state,
      action: PayloadAction<{ parentId: string; node: FileNode }>,
    ) {
      state.tree = insertNode(
        state.tree,
        action.payload.parentId,
        action.payload.node,
      );
    },

    deleteNodeById(state, action: PayloadAction<string>) {
      if (action.payload === "root") return;

      const updated = deleteNode(state.tree, action.payload);
      if (updated) {
        state.tree = updated;
        state.currentDirId = "root";
      }
    },

    renameNodeById(state, action: PayloadAction<{ id: string; name: string }>) {
      state.tree = renameNode(
        state.tree,
        action.payload.id,
        action.payload.name,
      );
    },

    updateFileContent(
      state,
      action: PayloadAction<{ id: string; content: string }>,
    ) {
      const update = (node: FileNode): FileNode => {
        if (node.id === action.payload.id) {
          return { ...node, content: action.payload.content };
        }
        return {
          ...node,
          children: node.children?.map(update),
        };
      };

      state.tree = update(state.tree);
    },
  },
});

export const {
  setCurrentDir,
  addNode,
  deleteNodeById,
  renameNodeById,
  selectFile,
  updateFileContent,
} = slice.actions;

export default slice.reducer;
