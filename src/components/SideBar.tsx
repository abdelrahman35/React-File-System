import { useAppSelector } from "@/store/hooks/useAppSelector";
import FileTree from "./FileTree";

const SideBar = () => {
  const { tree } = useAppSelector((s) => s.fileSystem);

  return (
    <div className="w-72 bg-gray-800 p-3 overflow-auto border-r border-gray-700">
      <h2 className="text-sm font-semibold mb-2 text-gray-200 ">
        React File System
      </h2>
      <FileTree node={tree} />
    </div>
  );
};

export default SideBar;
