export type DevicesType = {
  type: string;
};

export type DeviceType = {
  id: number;
  name: string;
  brand_id: number;
  type: string;
  stars: number;
};

export type ImageType = {
  id: number;
  image_url: string;
  device_color_id: number;
  presentation: boolean;
};

export type PropType = {
  id: number;
  memory_id: number;
  device_color_id: number;
  size: string;
  processor_id: number;
  quantity: number;
  price: number;
  details: string;
};

export type DeviceColorType = {
  id: number;
  device_id: number;
  color_id: number;
};

export type ColorType = {
  id: number;
  color_name: string;
};

export type BrandType = {
  id: number;
  brand_name: string;
};

export type MemoryType = {
  id: number;
  memory_size: number;
};

export type ProcessorType = {
  id: number;
  processor: string;
};

export type CartType = {
  id: number;
  client_id: number;
  item_id: number;
  quantity: number;
};

export type FavoritesType = {
  id: number;
  client_id: number;
  item_id: number;
};

export type OrderedItemsType = {
  id: number;
  client_id: number;
  item_id: number;
  quantity: number;
  status: string;
};

export type OrdersType = {
  name?: string;
  color?: string;
  memory?: number;
  brand?: string;
  processor?: string;
  image?: string;
  price?: number;
  quantity?: number;
  item_id?: number;
  status?: string
};

export type PersonalInfoType = {
  id: number;
  name: string;
  address: string;
  phone: number;
  email: string;
  type: string
};