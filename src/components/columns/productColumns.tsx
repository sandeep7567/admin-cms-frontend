import { ColumnDef } from "@tanstack/react-table";

import { X, Check } from "lucide-react";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type ProductColumn = {
  _id: string;
  image: string;
  email: string;
  firstName: string;
  lastName: string;
  price: string;
  isFeatured: boolean;
  isArchived: boolean;
  createdAt: string;
};

export const ProductColumns: ColumnDef<ProductColumn>[] = [
  {
    accessorKey: "image",
    header: "Image",
    cell: ({ row }) => (
      <div className="w-full h-full flex items-center gap-2">
        <img
          src={row.original.image}
          alt="image"
          width={400}
          height={400}
          style={{
            aspectRatio: "1/1",
            objectFit: "fill",
            objectPosition: "center",
            backgroundRepeat: "no-repeat",
            width: "4rem",
            height: "4rem",
          }}
        />
      </div>
    ),
  },
  {
    accessorKey: "firstName" || "lastName",
    header: "Name",
    cell: ({ row }) => (
      <div className="flex items-center gap-2 text-xs font-medium">
        {row.original.firstName.toUpperCase() + " " + row.original.lastName}
      </div>
    ),
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => (
      <div className="flex items-center gap-2 text-xs font-medium">
        {row.original.email}
      </div>
    ),
  },
  {
    accessorKey: "archived",
    header: "Archived",
    cell: ({ row }) => (
      <div className="h-fit w-1/2 aspect-square flex justify-center items-center">
        {row?.original?.isArchived ? (
          <Check size={16} style={{ color: "green" }} />
        ) : (
          <X size={16} style={{ color: "red" }} />
        )}
      </div>
    ),
  },
  {
    accessorKey: "featured",
    header: "Featured",
    cell: ({ row }) => (
      <div className="h-fit w-1/2 aspect-square flex justify-center items-center">
        {row?.original?.isFeatured ? (
          <Check size={16} style={{ color: "green" }} />
        ) : (
          <X size={16} style={{ color: "red" }} />
        )}
      </div>
    ),
  },
  {
    accessorKey: "price",
    header: "Price",
  },
  // {
  //   accessorKey: "color",
  //   header: "Color",
  //   cell: ({ row }) => (
  //     <div className="flex items-center gap-2">
  //       {/* {row.original.color} */}
  //       <div
  //         className="h-6 w-6 rounded-full border"
  //         style={{ backgroundColor: row.original.color }}
  //       />
  //     </div>
  //   ),
  // },
  {
    accessorKey: "createdAt",
    header: "Date",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      console.log(row);
      // return <ProductCellAction data={row.original} />;
    },
  },
];
