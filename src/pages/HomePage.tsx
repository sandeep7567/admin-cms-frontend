import NoDataPage from "@/components/layout/NoDataPage";

function HomePage() {
  return (
    <NoDataPage
      btnLabel="Create"
      description="You have no products"
      info="You can start selling as soon as you add a product."
      title="Dashboard"
    />
  );
}

export default HomePage;
