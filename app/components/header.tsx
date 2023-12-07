"use client";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { FaRegStar, FaShoppingCart } from "react-icons/fa";
import { AiOutlineLogout } from "react-icons/ai";
import { AiOutlineUser } from "react-icons/ai";
import { OrdersType } from "@/app/types/types";
import { useDataFetching } from "./useDataFetching";

const Header = () => {
  const session = useSession();
  const [searchTerm, setSearchTerm] = useState<string>();
  const [filteredDevices, setFilteredDevices] = useState<OrdersType[]>([]);
  const [showResults, setShowResults] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const {
    images,
    devices,
    colors,
    memory,
    brand,
    deviceColors,
    properties,
    processors,
  } = useDataFetching();

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setShowResults(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const Items: OrdersType[] = properties.map((prp) => {
    const deviceColor = deviceColors.find(
      (im) => im.id === prp?.device_color_id
    );
    const selectedColor = colors.find((im) => im.id === deviceColor?.color_id);
    const proces = processors.find((im) => im.id === prp?.processor_id);
    const device = devices?.find((dev) => dev.id == deviceColor?.device_id);
    const brnd = brand.find((br) => br.id == device?.brand_id);
    const mmry = memory.find((mr) => mr.id === prp?.memory_id);
    const selectedImg = images.find(
      (im) => im.device_color_id === deviceColor?.id && im.presentation == true
    );
    return {
      name: device?.name,
      color: selectedColor?.color_name,
      memory: mmry?.memory_size,
      brand: brnd?.brand_name,
      processor: proces?.processor,
      image: selectedImg?.image_url,
      price: prp.price,
      item_id: prp.id,
    };
  });

  const handleSearch = (inputValue: string) => {
    const searchValue = inputValue?.toLowerCase();

    const filtered = Items.filter(
      (device) =>
        device?.name?.toLowerCase().includes(searchValue) ||
        device?.color?.toLowerCase().includes(searchValue) ||
        device?.memory === parseInt(inputValue) ||
        device?.processor?.toLowerCase().includes(searchValue)
    );
    console.log(filtered);
    setFilteredDevices(filtered);
  };

  return (
    <div>
      <div className="flex flex-row sm:py-4">
        <Link className="text-blue lg:text-[32px] sm:text-xsm font-black lg:p-4 sm:p-2" href={"/"}>TechMarket</Link>
        <div>
          <div className="border-[1px] lg:text-[16px] sm:text-xxsm lg:w-[689px] sm:w-[180px] lg:h-[58px] sm:h-[20px] border-lightGray lg:mx-4 lg:mt-4 sm:mt-2 rounded-[8px] flex justify-between lg:ml-[250px]">
            <input
              ref={inputRef}
              placeholder="🔎 Search device..."
              className="lg:p-4 m-1 outline-none border-lightGray"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                handleSearch(e.target.value);
                setShowResults(true);
              }}
            />
          </div>
          {showResults && filteredDevices.length > 0 && (
            <div className="flex absolute flex-col max-h-[400px] overflow-y-auto">
              {filteredDevices.map((device) => (
                <Link
                  className="bg-secondary lg:text-[16px] sm:text-xxsm border lg:w-[689px] sm:w-[180px] lg:h-[48px] sm:h-[35px] border-lightGray py-2 px-4 rounded-[8px] lg:ml-[250px] "
                  key={device.item_id}
                  href={`/client/device-info/${device.item_id}`}
                >
                  {device?.brand?.toUpperCase()} {device?.name} {device?.memory}
                  GB {device?.processor} {device?.color}
                </Link>
              ))}
            </div>
          )}
        </div>
        {session.status != "authenticated" && (
          <Link
            href={"/auth/login"}
            className="lg:w-[90px] sm:w-[50px] sm:h-[20px] lg:h-[40px] flex justify-center items-center h-[36px] rounded-[8px] bg-blue lg:text-[18px] sm:text-xsm lg:m-6 sm:m-1  text-secondary"
          >
            Log In
          </Link>
        )}
        {session.status == "authenticated" && (
          <div className="flex lg:pl-20 sm:pl-1 mt-1">
            <div className="group">
              <Link href={"/client/user-account"}>
                <AiOutlineUser  className="icon lg:mt-8 lg:m-1 cursor-pointer" />
              </Link>
              <div className=" absolute hidden border border-blue rounded-xl group-hover:block px-5 py-2 mr-16 bg-secondary">
                My Account
              </div>
            </div>
            <div className="group">
              <Link href={"/client/favorites"}>
                <FaRegStar className="icon lg:mt-8 lg:m-1 cursor-pointer" />
              </Link>
              <div className=" absolute hidden border  border-blue rounded-xl group-hover:block px-5 py-2 mr-16 bg-secondary">
                Favorites
              </div>
            </div>
            <div className="group">
              <Link href={"/client/cart"}>
                <FaShoppingCart className="icon lg:mt-8 lg:m-1 cursor-pointer" />
                <div className=" absolute hidden border border-blue rounded-xl group-hover:block px-5 py-2 bg-secondary">
                  Cart
                </div>
              </Link>
            </div>
            <button onClick={() => signOut({ redirect: true })}>
              <AiOutlineLogout className=" icon lg:mt-3 lg:m-1 cursor-pointer" />
            </button>
          </div>
        )}
      </div>
      <div className="border-t-[1px] width-full sm:text-xsm border-lightGray"></div>
      <div className="flex w-full justify-center items-center">
        <div className="flex flex-row text-darkGray font-medium sm:text-xsm lg:text-[20px] lg:w-[800px] sm:w-[300px] justify-between p-2">
          <Link href={"/client/devices/phone"}>Phone</Link>
          <Link href={"/client/devices/tablet"}>Tablet</Link>
          <Link href={"/client/devices/laptop"}>Laptop</Link>
          <Link href={"/client/devices/headphones"}>Headphones</Link>
          <Link href={"/client/devices/watch"}>Watch</Link>
        </div>
      </div>
      <div className="border-t-[1px] width-full border-lightGray "></div>
    </div>
  );
};

export default Header;
