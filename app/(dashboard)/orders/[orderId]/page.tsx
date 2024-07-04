import { DataTable } from "@/components/custom ui/DataTable";
import { columns } from "@/components/orderItem/OrderItemColumn";
import { getOrderDetails } from "@/lib/actions/actions";
import { FormatRupiah } from "@arismun/format-rupiah";
import { format } from "date-fns";

const OrderDetails = async ({ params }: { params: { orderId: string } }) => {
  // const orderDetails = await getOrderDetails(params.orderId);
  const res = await fetch(
    `${process.env.DOMAIN_URL}/api/orders/${params.orderId}`
  );
  const { orderDetails, customer } = await res.json();

  const { street, city, state, postalCode, country } =
    orderDetails.shippingAddress;

  return (
    <div className="px-3 md:px-10 py-5">
      <h1 className="text-xl md:text-2xl font-semibold text-primaryBlack text-center mt-3">
        Detail Order
      </h1>
      <div className="flex flex-col py-2 md:p-10 gap-2 md:gap-4 mt-5">
        <p className="text-grey-1 text-sm md:text-lg">
          Order ID : <span className="text-grey-1">{orderDetails._id}</span>
        </p>
        <p className="text-grey-1 text-sm md:text-lg">
          Customer name : <span className="text-grey-1">{customer.name}</span>
        </p>
        <p className="text-grey-1 text-sm md:text-lg">
          Customer email : <span className="text-grey-1">{customer.email}</span>
        </p>
        {/* <p className="text-grey-1 text-sm md:text-lg">
          Status Order :{" "}
          <span className="text-grey-1">{orderDetails.statusOrder}</span>
        </p> */}
        <p className="text-grey-1 text-sm md:text-lg">
          Order Date :{" "}
          <span className="text-grey-1">
            {format(orderDetails.createdAt, "dd MMM yyyy")}
          </span>
        </p>
        <p className="text-grey-1 text-sm md:text-lg">
          Shipping address :{" "}
          <span className="text-grey-1">
            {street}, {city}, {state}, {postalCode}, {country}
          </span>
        </p>
        <p className="text-grey-1 text-sm md:text-lg">
          Total Paid :{" "}
          <span className="text-grey-1">
            <FormatRupiah value={orderDetails.totalAmount} />
          </span>
        </p>
        <p className="text-grey-1 text-sm md:text-lg">
          Customer Order ID :{" "}
          <span className="text-grey-1">{orderDetails.shippingRate}</span>
        </p>
        <DataTable
          columns={columns}
          data={orderDetails.products}
          searchKey="product"
        />
      </div>
    </div>
  );
};

export default OrderDetails;
