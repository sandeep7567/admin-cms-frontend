import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import Actions from "@/pages/order/components/actions";
import { Order } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { ArrowUpDown } from "lucide-react";

export const OrderColumns: ColumnDef<Order>[] = [
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
    accessorKey: "userInfo",
    accessorFn: (formData) =>
      `${formData.userInfo.firstName} ${formData.userInfo.lastName}`,
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className=""
        >
          Full Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="ml-4">{`${row.original.userInfo.firstName} ${row.original.userInfo.lastName}`}</div>
    ),
  },
  {
    accessorKey: "address",
    header: "Address",
    cell: ({ row }) => <div className="ml-2">{row.original.address}</div>,
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => (
      <div className="ml-2">{row.original.userInfo.email}</div>
    ),
  },
  {
    accessorKey: "totalQty",
    header: "Qty",
    cell: ({ row }) => (
      <div className="flex items-center ml-2 gap-2 text-xs font-medium">
        {row.original.totalQty}
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
    cell: ({ row }) => (
      <div>{format(row.original.purchaseAt, "dd MMM yyyy")}</div>
    ),
  },
  {
    id: "actions",
    cell: ({ row, table }) => <Actions id={row.original._id} table={table} />,
  },
];
