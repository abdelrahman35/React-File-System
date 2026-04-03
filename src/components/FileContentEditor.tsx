"use client";

import { updateFileContent } from "@/store/fileSystemSlice";
import { useAppDispatch } from "@/store/hooks/useAppDisaptch";
import { useAppSelector } from "@/store/hooks/useAppSelector";

import { findNode } from "@/utils";

export default function FileContentEditor() {
  const { tree, selectedFileId } = useAppSelector((s) => s.fileSystem);
  const dispatch = useAppDispatch();

  const file = selectedFileId ? findNode(tree, selectedFileId) : null;

  if (!file || file.type !== "file") {
    return <div className="text-gray-500 text-sm">Select a file to edit</div>;
  }

  return (
    <textarea
      className="w-full h-full bg-gray-900 text-green-400 p-3 font-mono text-sm border border-gray-700 rounded outline-none"
      value={file.content || ""}
      onChange={(e) =>
        dispatch(
          updateFileContent({
            id: file.id,
            content: e.target.value,
          }),
        )
      }
    />
  );
}
