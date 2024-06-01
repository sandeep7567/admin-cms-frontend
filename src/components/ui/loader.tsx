import { LoaderIcon } from "lucide-react";
import NoDataPage from "../layout/NoDataPage";
import { Skeleton } from "./skeleton";

export const Loader = () => {
  return (
    <div className="relative h-screen w-full flex bg-gray-200/50">
      <NoDataPage description="" info="" title="">
        <LoaderIcon
          size={80}
          className="animate-spin flex size-6 items-center text-primary/40 justify-center"
        />
        <Skeleton className="h-8 w-48" />
      </NoDataPage>
    </div>
  );
};
