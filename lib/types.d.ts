type CategoryType = {
  _id: string;
  title: string;
  description: string;
  image: string;
  products: ProductType[];
};

type ProductType = {
  _id: string;
  title: string;
  description: string;
  media: [string];
  category: CategoryType;
  tags: [string];
  brand: string;
  colors: [string];
  price: number;
  createdAt: Date;
  updatedAt: Date;
};

type OrderColumnType = {
  _id: string;
  customer: string;
  products: number;
  statusOrder: string;
  shippingRate: string;
  totalAmount: number;
  createdAt: string;
};

type OrderItemType = {
  product: ProductType;
  _id: string;
  title: string;
  color: string;
  brand: string;
  quantity: number;
};

type CustomerType = {
  clerkId: string;
  name: string;
  email: string;
};
