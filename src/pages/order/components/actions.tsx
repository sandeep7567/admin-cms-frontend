import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useConfirm } from "@/hooks/ui/useConfirm";
import { useDeleteOrderMutation } from "@/redux/api/orderApiSlice";
import { Order } from "@/types";
import { Table } from "@tanstack/react-table";
import { MoreHorizontal, Trash } from "lucide-react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

interface ActionsProps {
  id: string;
  table: Table<Order>;
}

export const Actions = ({ id, table }: ActionsProps) => {
  const { storeId } = useParams();
  // const dispatch = useAppDispatch();
  const [ConfirmDialog, confirm] = useConfirm(
    "Are you sure?",
    "You are about to perform a delete."
  );

  const [deleteOrder, { isLoading: isDeleting }] = useDeleteOrderMutation();

  const onDelete = async () => {
    const ok = await confirm();

    if (ok && storeId) {
      const { data, error } = await deleteOrder({ orderId: id, storeId });

      if (data) {
        toast.success("Order deleted");
        table.reset();
        table.firstPage();
      }

      if (error) {
        toast.error("Order deleted failed");
      }
    }
  };

  return (
    <>
      <ConfirmDialog />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant={"ghost"} className="size-8 p-0">
            <MoreHorizontal className="size-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {/* <DropdownMenuItem
            disabled={isDeleting}
            onClick={() => dispatch(onEditToggle({ id }))}
            className="cursor-pointer"
          >
            <Edit className="size-4 mr-2" />
            Edit
          </DropdownMenuItem> */}
          <DropdownMenuItem
            disabled={isDeleting}
            onClick={onDelete}
            className="cursor-pointer"
          >
            <Trash className="size-4 mr-2" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default Actions;
