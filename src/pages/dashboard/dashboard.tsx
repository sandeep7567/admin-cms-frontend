import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { formatter } from "@/lib/utils";
import { CreditCard, IndianRupee, Package } from "lucide-react";
import { Overview } from "./components/overview";
import { useParams } from "react-router-dom";
import { useGetOrdersQuery } from "@/redux/api/orderApiSlice";
import { useEffect, useState } from "react";
import { PRICE_CONVERSION } from "@/constants";

export interface GraphData {
  name: string;
  total: number;
}

const DahboardPage = () => {
  const { storeId } = useParams();

  const [totalRevenue, setTotalRevenue] = useState<number>(0);
  const [salesCount, setSalesCount] = useState<number>(0);
  const [stockCount, setStockCount] = useState<number>(0);

  const cardData = [
    {
      title: "Total Revenue",
      icon: <IndianRupee className="h-4 w-4 text-black/60" />,
      value: formatter.format(totalRevenue),
    },
    {
      title: "Sales",
      icon: <CreditCard className="h-4 w-4 text-black/60" />,
      value: salesCount,
    },
    {
      title: "Products In Stock",
      icon: <Package className="h-4 w-4 text-black/60" />,
      value: stockCount,
    },
  ];

  const graphData: GraphData[] = [
    { name: "Jan", total: 0 },
    { name: "Feb", total: 0 },
    { name: "Mar", total: 0 },
    { name: "Apr", total: 0 },
    { name: "May", total: 0 },
    { name: "Jun", total: 0 },
    { name: "Jul", total: 0 },
    { name: "Aug", total: 0 },
    { name: "Sep", total: 0 },
    { name: "Oct", total: 0 },
    { name: "Nov", total: 0 },
    { name: "Dec", total: 0 },
  ];

  const { data, isSuccess, refetch, isError } = useGetOrdersQuery({
    storeId: storeId as string,
    pageIndex: 1,
    pageSize: 100,
  });

  const paidOrders = data?.orders.map((order) => ({
    createdAt: new Date(order.createdAt).getMonth(),
    totalAmount: order.totalAmount / PRICE_CONVERSION,
  }));

  paidOrders?.forEach((order) => {
    graphData[order.createdAt]["total"] = order.totalAmount || 0;
  });

  useEffect(() => {
    if (isSuccess) {
      const totalRevenue =
        paidOrders?.reduce((total, order) => total + order.totalAmount, 0) || 0;

      setTotalRevenue(totalRevenue);
      setSalesCount(paidOrders?.length || 0);
      setStockCount(paidOrders?.length || 0);
    }
    if (isError) {
      refetch();
    }
  }, [isSuccess, isError, refetch, paidOrders]);

  return (
    <div className="flex-col -mt-6">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="">
          <h2 className="text-3xl font-bold tracking-tighter">Dashboard</h2>
          <p className="text-sm text-muted-foreground">
            Overview of your store
          </p>
        </div>
        <Separator />
        <div className="grid gap-4 grid-cols-3">
          {cardData.map((item, index) => (
            <Card key={index} className="">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {item.title}
                </CardTitle>
                {item.icon}
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{item.value}</div>
              </CardContent>
            </Card>
          ))}
        </div>
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Overview</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <Overview data={graphData} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DahboardPage;
