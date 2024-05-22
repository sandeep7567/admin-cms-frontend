import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useFormContext } from "react-hook-form";

const ImageSection = () => {
  const { control } = useFormContext();

  return (
    <div className="grid sm:grid-cols-2 gap-4 py-4">
      <div>
        <h2 className="text-2xl font-bold">Image</h2>
        <FormDescription>
          Add a product image for listing on store of the product
        </FormDescription>
      </div>

      <div className="grid sm:grid-cols-1 items-center gap-4">
        <FormField
          control={control}
          name="imageFile"
          render={({ field }) => (
            <FormItem className="flex flex-col gap-2">
              <FormControl>
                <Input
                  {...field}
                  type="file"
                  id="imageFile"
                  accept=".jpg, .jpeg, .png"
                  onChange={(e) =>
                    field.onChange(e.target.files ? e.target.files[0] : null)
                  }
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
};

export default ImageSection;
