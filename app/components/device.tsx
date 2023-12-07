import React from "react";
import { BrandType, ColorType, DeviceType, ImageType, MemoryType, PropType } from "../types/types";
import { FaRegStar } from "react-icons/fa";
import Link from "next/link";

const Device = ({
  image,
  device,
  prop,
  brand,
  memory,
  color,
}: {
  image?: ImageType;
  device?: DeviceType;
  prop?: PropType;
  brand?: BrandType;
  memory?: MemoryType;
  color?: ColorType;
}) => {
  return (
    <div className="border-lightGray border lg:w-[270px] lg:h-[350px] sm:w-[170px] sm:h-[250px] p-4 cursor-pointer">
      <Link href={`/client/device-info/${prop?.id}`}>
        <img
          className="w-[200px] "
          alt={`image-${image?.id}`}
          src={image?.image_url}
        />
        <h1 className="font-bold lg:text-[16px] sm:text-xsm">${prop?.price}</h1>
        <h1 className="lg:py-2 lg:text-[16px] sm:text-xsm">
          {brand?.brand_name?.toUpperCase()} {device?.name}{" "}
          {memory?.memory_size}GB {color?.color_name}
        </h1>
        <p className="flex flex-row justify-center items-center lg:text-[16px] sm:text-xsm bg-yellow-100 w-14 rounded-lg">
          {device?.stars.toFixed(1)}
          <FaRegStar className="h-7 text-yellow-500" />
        </p>
      </Link>
    </div>
  );
};

export default Device;
