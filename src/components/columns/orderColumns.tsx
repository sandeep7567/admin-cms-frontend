import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import Actions from "@/pages/order/components/actions";
import { OrderStatus } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";

export type OrderColumn = {
  _id: string;
  name: string;
  qty: number;
  price: number;
  totalAmount: number;
  referenceId: string;
  status: OrderStatus;
  purchaseAt: string;
};

export const OrderColumns: ColumnDef<OrderColumn>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className=""
        >
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <div className="ml-4">{row.original.name}</div>,
  },
  {
    accessorKey: "referenceId",
    header: "Reference Id",
    cell: ({ row }) => <div className="ml-2">{row.original.referenceId}</div>,
  },
  {
    accessorKey: "price",
    header: "Price",
    cell: ({ row }) => (
      <div className="flex items-center ml-2 gap-2 text-xs font-medium">
        {row.original.price / 100}
      </div>
    ),
  },
  {
    accessorKey: "qty",
    header: "Qty",
    cell: ({ row }) => (
      <div className="flex items-center ml-2 gap-2 text-xs font-medium">
        {row.original.qty}
      </div>
    ),
  },
  {
    accessorKey: "totalAmount",
    header: "Amount",
    cell: ({ row }) => (
      <div className="flex items-center ml-5 gap-2 text-xs font-medium">
        {row.original.totalAmount / 100}
      </div>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "purchaseAt",
    header: "Purchase At",
  },
  {
    id: "actions",
    cell: ({ row, table }) => <Actions id={row.original._id} table={table} />,
  },
];
