import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { onOpen } from "@/redux/reducer/storeSlice";
import { useEffect } from "react";

const SetupPage = () => {
  const { isOpen } = useAppSelector((state) => state.store);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!isOpen) {
      dispatch(onOpen());
    }
  }, [dispatch, isOpen]);

  return null;
};

export default SetupPage;
