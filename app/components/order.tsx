/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { OrdersType } from "../types/types";
import Link from "next/link";

const Order = ({ order,handleDeleteOrder }: { order?: OrdersType, handleDeleteOrder: any }) => {

  return (
    <div className=" flex ">
      <Link
        href={`/client/device-info/${order?.item_id}`}
        className="flex lg:w-[700px] sm:w-[250px]"
      >
        <img
          className="lg:w-[170px] sm:w-[80px] border border-lightGray rounded-xl sm:m-4 lg:m-1"
          alt={`image-${order?.name}`}
          src={order?.image}
        />
        <div className="flex flex-col justify-center lg:text-[16px] sm:text-xxsm">
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
          <h1 className="font-medium lg:text-sm sm:text-xsm">
            ${order?.price }
          </h1>
        </div>
      </Link>
      <button
        className="flex justify-center items-center w-1/4 text-darkGray lg:text-[16px] sm:text-xxsm"
        onClick={() => handleDeleteOrder(order?.item_id)}
      >
        Delete
      </button>
    </div>
  );
};

export default Order;
