import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { onToggle } from "@/redux/reducer/productSlice";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { SheetForm } from "../ui/sheetForm";

const ProductSheet = () => {
  const { isOpen } = useAppSelector((state) => state.product);
  const dispatch = useAppDispatch();

  return (
    <SheetForm
      title="Create Product"
      description="Make changes to your profile here. Click save when
    you're done."
      side="product"
      openBtnText="Open"
      open={isOpen}
      onOpen={() => dispatch(onToggle())}
    >
      {/* <Form {...registerForm}>
        <form
          onSubmit={registerForm.handleSubmit(onRegisterSubmit)}
          className="grid gap-4"
        >
          <RegisterForm form={registerForm} />

          <Button type="submit" className="w-full">
            {submitBtnLabel}
          </Button>
        </form>
      </Form> */}
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="name" className="text-right">
            Name
          </Label>
          <Input id="name" value="Pedro Duarte" className="col-span-3" />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="username" className="text-right">
            Username
          </Label>
          <Input id="username" value="@peduarte" className="col-span-3" />
        </div>
      </div>
    </SheetForm>
  );
};

export default ProductSheet;
