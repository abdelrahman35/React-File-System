"use client";

import React, { useState } from "react";
import { FiFolder, FiFile, FiEdit, FiTrash } from "react-icons/fi";
import {
  setCurrentDir,
  selectFile,
  renameNodeById,
  deleteNodeById,
} from "@/store/fileSystemSlice";
import { FileNode } from "@/models";
import { useAppDispatch } from "@/store/hooks/useAppDisaptch";
import { useAppSelector } from "@/store/hooks/useAppSelector";

function FileTree({ node }: { node: FileNode }) {
  const dispatch = useAppDispatch();
  const { currentDirId, selectedFileId } = useAppSelector((s) => s.fileSystem);

  const [editingId, setEditingId] = useState<string | null>(null);
  const [name, setName] = useState("");
  const isDirectory = node.type === "folder";
  const isFile = node.type === "file";

  const isSelected = selectedFileId
    ? isFile && node.id === selectedFileId
    : isDirectory && node.id === currentDirId;

  const viewFileHandler = () => {
    if (isDirectory) {
      dispatch(setCurrentDir(node.id));
    } else {
      dispatch(selectFile(node.id));
    }
  };
  return (
    <div className="ml-2">
      <div
        onClick={(event) => {
          event.stopPropagation();
          viewFileHandler();
        }}
        className={`cursor-pointer px-2 py-1 rounded text-sm transition-colors flex items-center justify-between group ${
          isSelected
            ? "bg-blue-500 text-white"
            : "hover:bg-gray-700 text-gray-200"
        }`}
      >
        <span className="inline-flex items-center gap-2 flex-1">
          {node.type === "folder" ? <FiFolder /> : <FiFile />}
          {editingId === node.id ? (
            <input
              className="bg-gray-800 border border-gray-600 rounded px-1 text-sm flex-1"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onBlur={() => {
                if (name.trim()) {
                  dispatch(renameNodeById({ id: node.id, name }));
                }
                setEditingId(null);
              }}
              onClick={(e) => e.stopPropagation()}
              autoFocus
            />
          ) : (
            <span>{node.name}</span>
          )}
        </span>

        <div className="flex gap-1 opacity-0 group-hover:opacity-100">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setEditingId(node.id);
              setName(node.name);
            }}
            className="text-gray-400 hover:text-gray-200 text-sm"
          >
            <FiEdit />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              dispatch(deleteNodeById(node.id));
            }}
            className="text-red-400 hover:text-red-300 text-sm"
          >
            <FiTrash />
          </button>
        </div>
      </div>

      {node.children?.length ? (
        <div className="ml-3 border-l border-gray-700 pl-2">
          {node.children.map((child) => (
            <FileTree key={child.id} node={child} />
          ))}
        </div>
      ) : null}
    </div>
  );
}

export default React.memo(FileTree);
