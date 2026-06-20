export interface IResponse<data>{
  results: number
  metadata: IMetadata
  data: data[]
}
export interface IMetadata {
  currentPage: number
  numberOfPages: number
  limit: number
}
export interface IResponseSingleData<data>{
    data : data
}
export interface IProduct {
  sold: number
  images: string[]
  subcategory: ISubcategory[]
  ratingsQuantity: number
  _id: string
  title: string
  slug: string
  description: string
  quantity: number
  price: number
  imageCover: string
  category: ICategory
  brand: IBrand
  ratingsAverage: number
  createdAt: string
  updatedAt: string
  id: string
  priceAfterDiscount?: number
  availableColors?: any[]
}

export interface ISubcategory {
  _id: string
  name: string
  slug: string
  category: string
}
export interface ICategory {
  _id: string
  name: string
  slug: string
  image: string
}
export interface IBrand {
  _id: string
  name: string
  slug: string
  image: string
}
///////////// Cart 
export interface ICartResponse {
  status: string
  numOfCartItems: number
  cartId: string
  data: ICartData
}
export interface ICartData {
  _id: string
  cartOwner: string
  products: IProductCart[]
  createdAt: string
  updatedAt: string
  __v: number
  totalCartPrice: number
}

export interface IProductCart {
  count: number
  _id: string
  product: IProduct
  price: number
}
/// Wishlist Response
export interface IWishlistResponse {
  status: string
  numOfCartItems: number
  cartId: string
  data: IProduct[]
}
//order response
export interface IOrdersResponse {
  status: string
  results: number
  data: IOrder[]
}

export interface IOrder {
  taxPrice: number
  shippingPrice: number
  totalOrderPrice: number
  paymentMethodType: string
  isPaid: boolean
  isDelivered: boolean
  _id: string
  user: IUser
  cartItems: ICartItem[]
  shippingAddress: IShippingAddress
  createdAt: string
  updatedAt: string
  id: number
}

export interface ICartItem {
  count: number
  _id: string
  product: IProduct
  price: number
}
export interface IShippingAddress {
  details: string
  phone: string
  city: string
}
//Iuser 
export interface IUsersResponse {
  totalUsers: number;
  metadata: IMetadata;
  users: IUser[];
}
export interface IUser {
  _id: string;
  name: string;
  email: string;
  phone: string;
  role?: string;
  createdAt?: string;
  updatedAt?: string;
}
export interface IUserResponse {
  message: string;
  user: IUser;
}
export interface IAddress {
  name: string;
  details: string;
  phone: string;
  city: string;
}