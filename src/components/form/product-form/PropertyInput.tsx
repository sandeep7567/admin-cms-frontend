import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { TrashIcon } from "lucide-react";
import React from "react";
import { useFormContext } from "react-hook-form";

interface PropertyInputProps {
  index: number;
  removeProperty: () => void;
}

const PropertyInput: React.FC<PropertyInputProps> = ({
  index,
  removeProperty,
}) => {
  const { control } = useFormContext();
  return (
    <div className="flex flex-row gap-2 items-end">
      <FormField
        control={control}
        name={`properties.${index}.name`}
        render={({ field }) => (
          <FormItem>
            <FormLabel className="flex items-center gap-1">
              Name
              <FormMessage />
            </FormLabel>
            <FormControl>
              <Input
                {...field}
                placeholder="Color"
                type="text"
                id={`properties.${index}.name`}
              />
            </FormControl>
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name={`properties.${index}.value`}
        render={({ field }) => (
          <FormItem>
            <FormLabel className="flex items-center gap-1">
              Value
              <FormMessage />
            </FormLabel>
            <FormControl>
              <Input
                {...field}
                placeholder="#000,#fff,#47e4e4"
                type="text"
                id={`properties.${index}.value`}
              />
            </FormControl>
          </FormItem>
        )}
      />

      <Button
        type="button"
        onClick={removeProperty}
        variant={"destructive"}
        size={"icon"}
      >
        <TrashIcon />
      </Button>
    </div>
  );
};

export default PropertyInput;
