/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useEffect } from "react";
import axios from "axios";
import {
  BrandType,
  CartType,
  ColorType,
  DeviceColorType,
  DeviceType,
  FavoritesType,
  ImageType,
  MemoryType,
  OrderedItemsType,
  PersonalInfoType,
  ProcessorType,
  PropType,
} from "@/app/types/types";

export function useDataFetching(
  user_id?: number,
  device_id?: number,
  device_type?: string
) {
  const [cartItems, setCartItems] = useState<CartType[]>([]);
  const [refresh, setRefresh] = useState<boolean>();
  const [userInfo, setUserInfo] = useState<PersonalInfoType[]>([]);
  const [userInfo2, setUserInfo2] = useState<PersonalInfoType[]>([]);
  const [images, setImages] = useState<ImageType[]>([]);
  const [devices, setDevices] = useState<DeviceType[]>([]);
  const [allDevices, setAllDevices] = useState<DeviceType[]>([]);
  const [colors, setColors] = useState<ColorType[]>([]);
  const [memory, setMemory] = useState<MemoryType[]>([]);
  const [brand, setBrand] = useState<BrandType[]>([]);
  const [deviceColors, setDeviceColors] = useState<DeviceColorType[]>([]);
  const [properties, setProperties] = useState<PropType[]>([]);
  const [processors, setProcessors] = useState<ProcessorType[]>([]);
  const [shipping, setShipping] = useState<number>(20);
  const [edit, setEdit] = useState<boolean>(false);
  const [hasLoaded, setHasLoaded] = useState<boolean>(true);
  const [selectedImage, setSelectedImage] = useState<ImageType>();
  const [favorites, setFavorites] = useState<FavoritesType[]>([]);
  const [minPrice, setMinPrice] = useState<number>();
  const [maxPrice, setMaxPrice] = useState<number>();
  const [checkedBrand, setCheckedBrand] = useState<number[]>([]);
  const [checkedMemory, setCheckedMemory] = useState<number[]>([]);
  const [checkedColor, setCheckedColor] = useState<number[]>([]);
  const [checkedProcessor, setCheckedProcessor] = useState<number[]>([]);
  const [orders, setorders] = useState<OrderedItemsType[]>([]);

  useEffect(() => {
    async function downloadData() {
      try {
        const responseOrder = await axios.get("/api/order");
        const dataOrder: OrderedItemsType[] = responseOrder.data.message;
        setorders(dataOrder);

        const responseFav = await axios.get("/api/favorites");
        setFavorites(responseFav.data.message);

        const responseCart = await axios.get("/api/cart");
        setCartItems(responseCart.data.message);

        const responseAllDev = await axios.get(
          `/api/getDevices/${device_type}`
        );
        const data: DeviceType[] = responseAllDev.data.message;

        const brandList: DeviceType[] = checkedBrand.length
          ? data.filter((brand) => checkedBrand.includes(brand.brand_id))
          : data;
        setAllDevices(brandList);

        const response = await axios.get("/api/getDevices");
        setDevices(response.data.message);

        const responseImg = await axios.get("/api/getImages");
        setImages(responseImg.data.message);

        const responseProp = await axios.get("/api/getProps");
        const dataProp: PropType[] = responseProp.data.message;

        const propsList2: PropType[] = dataProp
          .filter((item) =>
            checkedMemory.length ? checkedMemory.includes(item.memory_id) : true
          )
          .filter((item) =>
            checkedProcessor.length
              ? checkedProcessor.includes(item.processor_id)
              : true
          )
          .filter((item) =>
            maxPrice && minPrice
              ? item.price <= maxPrice && item.price >= minPrice
              : true
          );
        setProperties(propsList2);

        const responseDevColor = await axios.get("/api/getDeviceColor");
        const dataColorDev: DeviceColorType[] = responseDevColor.data.message;

        const ColorList: DeviceColorType[] = checkedColor.length
          ? dataColorDev.filter((brand) =>
              checkedColor.includes(brand.color_id)
            )
          : dataColorDev;
        setDeviceColors(ColorList);

        const responseColor = await axios.get("/api/getColors");
        setColors(responseColor.data.message);

        const responseBrand = await axios.get("/api/getBrand");
        setBrand(responseBrand.data.message);

        const responseMemory = await axios.get("/api/getMemory");
        setMemory(responseMemory.data.message);

        const responseProc = await axios.get("/api/getProcessor");
        setProcessors(responseProc.data.message);

        const prp = responseProp.data.message.find(
          (im: PropType) => im.id == device_id
        );
        const deviceColor = responseDevColor.data.message.find(
          (im: DeviceColorType) => im.id === prp?.device_color_id
        );
        const selectedImg = responseImg.data.message.find(
          (im: ImageType) =>
            im.device_color_id === deviceColor?.id && im.presentation == true
        );
        setSelectedImage(selectedImg);

        if (user_id && hasLoaded) {
          setHasLoaded(false);
          const responseInfo = await axios.get(
            `/api/editPersonalInfo/${user_id}`
          );
          setUserInfo(responseInfo.data.message);
          setUserInfo2(responseInfo.data.message);
        }
      } catch (error) {
        console.log("Error downloading data: ", error);
      }
    }
    downloadData();
  }, [refresh, user_id, hasLoaded, minPrice, maxPrice]);

  return {
    cartItems,
    refresh,
    userInfo,
    userInfo2,
    images,
    devices,
    colors,
    memory,
    brand,
    deviceColors,
    properties,
    processors,
    shipping,
    edit,
    hasLoaded,
    selectedImage,
    favorites,
    minPrice,
    maxPrice,
    checkedBrand,
    checkedMemory,
    checkedColor,
    checkedProcessor,
    allDevices,
    orders,
    setRefresh,
    setEdit,
    setUserInfo2,
    setHasLoaded,
    setSelectedImage,
    setCheckedBrand,
    setCheckedColor,
    setCheckedMemory,
    setCheckedProcessor,
    setMaxPrice,
    setMinPrice,
  };
}
