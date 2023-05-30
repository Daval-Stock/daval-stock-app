import { GoGraph } from "react-icons/go";
import Dashboard from "./Dashboard/Dashboard";

const Library = () => {
  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between px-5 py-4">
        <div className="inline-flex items-center gap-x-2">
          <GoGraph size={26} className="text-neutral-400" />
          <p className="text-neutral-400 font-medium text-md">Dashboard</p>
        </div>
      </div>
    </div>
  );
};

export default Library;
