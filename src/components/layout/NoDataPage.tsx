import { onToggle } from "@/redux/reducer/productSlice";
import { OpenSheetButton } from "../ui/open-sheet-button";
import { useAppDispatch } from "@/hooks/redux";

interface NoDataPageProps {
  title: string;
  description: string;
  info: string;
  btnLabel: string;
}

const NoDataPage: React.FC<NoDataPageProps> = ({
  btnLabel,
  description,
  info,
  title,
}) => {
  const dispatch = useAppDispatch();
  return (
    <>
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl">{title}</h1>
      </div>
      <div
        className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm"
        x-chunk="dashboard-02-chunk-1"
      >
        <div className="flex flex-col items-center gap-1 text-center">
          <h3 className="text-2xl font-bold tracking-tight">{description}</h3>
          <p className="text-sm text-muted-foreground">{info}</p>
          <OpenSheetButton
            btnLabel={btnLabel}
            onOpen={() => dispatch(onToggle())}
          />
        </div>
      </div>
    </>
  );
};

export default NoDataPage;
