import React from "react";
import { OrdersType } from "../types/types";
import Link from "next/link";

const OrderItem = ({ order }: { order?: OrdersType}) => {

  return (
    <div className=" flex lg:text-[16px] sm:text-xxsm">
      <Link
        href={`/client/device-info/${order?.item_id}`}
        className="flex lg:w-[700px] sm:w-[300px]"
      >
        <img
          className="lg:w-[170px] sm:w-[50px] border border-lightGray rounded-xl m-4"
          alt={`image-${order?.name}`}
          src={order?.image}
        />
        <div className="flex flex-col justify-center ">
          <h1 className="py-2 lg:text-sm sm:text-xxsm font-medium">
            {order?.brand?.toUpperCase()} {order?.name} {order?.memory}
            GB {order?.processor} {order?.color}
          </h1>
          <h1 className="text-darkGray">
            {order?.quantity}{" "}
            {order?.quantity && order?.quantity > 1 ? "items" : "item"}
          </h1>
          <h1 className="text-darkGray">
            {order?.color} | {order?.memory}GB | {order?.processor}
          </h1>
          <h1 className="font-medium lg:text-sm sm:text-xxsm">
            ${order?.price && order?.quantity&&order?.price * order?.quantity}
          </h1>
        </div>
      </Link>
      <p
        className="flex justify-center items-center w-1/4 text-darkGray"
      >
        {order?.status}
      </p>
    </div>
  );
};

export default OrderItem;
