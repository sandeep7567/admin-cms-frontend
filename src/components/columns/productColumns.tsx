import { ColumnDef } from "@tanstack/react-table";

import { X, Check } from "lucide-react";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type ProductColumn = {
  _id: string;
  imageFile: string;
  name: string;
  price: number;
  featured: boolean;
  archived: boolean;
  createdAt: string;
};

export const ProductColumns: ColumnDef<ProductColumn>[] = [
  {
    accessorKey: "imageFile",
    header: "Image",
    cell: ({ row }) => (
      <div className="w-full h-full flex items-center gap-2">
        <img
          src={row.original.imageFile}
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
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => (
      <div className="flex items-center gap-2 text-xs font-medium">
        {row.original.name}
      </div>
    ),
  },
  {
    accessorKey: "archived",
    header: "Archived",
    cell: ({ row }) => (
      <div className="h-fit w-1/2 aspect-square flex justify-center items-center">
        {row?.original?.archived ? (
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
        {row?.original?.featured ? (
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
      <div>hi</div>;
      // return <ProductCellAction data={row.original} />;
    },
  },
];
