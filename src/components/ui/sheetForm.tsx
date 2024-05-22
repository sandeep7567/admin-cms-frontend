import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import React from "react";

interface SheetFormProps {
  children: React.ReactNode;
  side: "left" | "right" | "top" | "bottom" | "product";
  title: string;
  description: string;
  openBtnText: string;
  open: boolean;
  onOpen: (isOpen: boolean) => void;
}

export const SheetForm: React.FC<SheetFormProps> = ({
  children,
  side,
  title,
  description,
  open,
  onOpen,
}) => {
  return (
    <Sheet onOpenChange={onOpen} open={open}>
      <SheetContent side={side}>
        <SheetHeader>
          <SheetTitle>{title}</SheetTitle>
          <SheetDescription>{description}</SheetDescription>
        </SheetHeader>
        {children}
        <SheetFooter>
          <SheetClose asChild>
            <Button type="submit">Save changes</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};
