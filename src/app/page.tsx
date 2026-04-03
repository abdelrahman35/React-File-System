"use client";

import { addNode } from "@/store/fileSystemSlice";
import FileContentEditor from "@/components/FileContentEditor";
import { v4 as uuid } from "uuid";
import { useAppSelector } from "@/store/hooks/useAppSelector";
import { useAppDispatch } from "@/store/hooks/useAppDisaptch";
import SideBar from "@/components/SideBar";

export default function Home() {
  const { currentDirId } = useAppSelector((s) => s.fileSystem);
  const dispatch = useAppDispatch();
  const addNodeHandler = (type: "file" | "folder") => {
    dispatch(
      addNode({
        parentId: currentDirId,
        node: {
          id: uuid(),
          name: type === "file" ? "New File" : "New Folder",
          type: type,
          content: "",
        },
      }),
    );
  };
  return (
    <div className="h-screen flex bg-gray-900 text-gray-200">
      <SideBar />
      <div className="w-full">
        <div className="p-3 border-b border-gray-700 flex items-center justify-end ">
          <div className="flex gap-2">
            <button
              onClick={() => addNodeHandler("file")}
              className="bg-blue-600 hover:bg-blue-500 px-3 py-1 rounded text-sm"
            >
              New File
            </button>
            <button
              onClick={() => addNodeHandler("folder")}
              className="bg-green-600 hover:bg-green-500 px-3 py-1 rounded text-sm"
            >
              New Folder
            </button>
          </div>
        </div>
        <div className="p-3">
          <FileContentEditor />
        </div>
      </div>
    </div>
  );
}
