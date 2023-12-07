"use client";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { OrdersType, PersonalInfoType } from "@/app/types/types";
import { toast } from "react-toastify";
import OrderedItem from "@/app/components/orderedItem";
import { useDataFetching } from "@/app/components/useDataFetching";
import LoadingIcons from "react-loading-icons";
import { redirect } from "next/navigation";

const page = () => {
  const [activeTab, setActiveTab] = useState<string>("Tab 1");
  const session = useSession({ required: false });
  const user = session.data?.user;
  const [loading, setLoading] = useState<boolean>(true);

    
  if (!session.data?.user) {
    redirect("/");
  }

  const {
    orders,
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
    edit,
    setEdit,
    setUserInfo2,
    setHasLoaded,
  } = useDataFetching(user?.id);

  useEffect(() => {
    if (
      images.length > 0 &&
      devices.length > 0 &&
      colors.length > 0 &&
      brand.length > 0 &&
      deviceColors.length > 0 &&
      properties.length > 0
    ) {
      setLoading(false);
    }
  }, [images, devices, colors, memory, brand, deviceColors, properties]);

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: keyof PersonalInfoType
  ) => {
    const updatedData: PersonalInfoType = {
      ...userInfo2[0],
      [field]: e.target.value,
    };

    setUserInfo2([updatedData]);
  };

  const handleChangeInfo = () => {
    try {
      axios.post(`/api/editPersonalInfo/${user?.id}`, userInfo2);
      toast.success("The address edited successfully");
    } catch {
      toast.success("Somthing went wrong while editing");
    }
    setHasLoaded(true);
    setEdit(!edit);
  };

  const clientItems: OrdersType[] = properties
    .filter(
      (p) =>
        p.id ==
        orders.find((i) => i.item_id == p.id && i.client_id == user?.id)
          ?.item_id
    )
    .map((prp) => {
      const deviceColor = deviceColors.find(
        (im) => im.id === prp?.device_color_id
      );
      const selectedColor = colors.find(
        (im) => im.id === deviceColor?.color_id
      );
      const proces = processors.find((im) => im.id === prp?.processor_id);
      const device = devices?.find((dev) => dev.id == deviceColor?.device_id);
      const brnd = brand.find((br) => br.id == device?.brand_id);
      const mmry = memory.find((mr) => mr.id === prp?.memory_id);
      const selectedImg = images.find(
        (im) =>
          im.device_color_id === deviceColor?.id && im.presentation == true
      );
      return {
        name: device?.name,
        color: selectedColor?.color_name,
        memory: mmry?.memory_size,
        brand: brnd?.brand_name,
        processor: proces?.processor,
        image: selectedImg?.image_url,
        price: prp.price,
        quantity: orders.find(
          (i) => i.item_id == prp.id && i.client_id == user?.id
        )?.quantity,
        item_id: orders.find(
          (i) => i.item_id == prp.id && i.client_id == user?.id
        )?.item_id,
        status: orders.find(
          (i) => i.item_id == prp.id && i.client_id == user?.id
        )?.status,
      };
    });

  return (
    <div>
      {loading ? (
        <div className=" flex w-screen h-[400px] justify-center items-center ">
          <LoadingIcons.ThreeDots stroke="blue" />
          <h1 className="text-sm font-bold px-4">loading...</h1>
        </div>
      ) : (
        <div className="flex w-full justify-center items-center flex-col">
          <div className="lg:text-sm sm:text-xsm flex flex-row space-x-4 p-5">
            <button
              onClick={() => handleTabClick("Tab 1")}
              className={`py-2 px-4 rounded-md border ${
                activeTab === "Tab 1"
                  ? "bg-blue-500 text-blue border-blue"
                  : "bg-gray-300 text-darkGray border-lightGray"
              }`}
            >
              Personal Information
            </button>
            <button
              onClick={() => handleTabClick("Tab 2")}
              className={`py-2 px-4 rounded-md border ${
                activeTab === "Tab 2"
                  ? "bg-blue-500 text-blue border-blue"
                  : "bg-gray-300 text-darkGray border-lightGray"
              }`}
            >
              My Orders
            </button>
          </div>
          {activeTab == "Tab 1" && (
            <div className="border border-lightGray lg:w-[1000px] sm:w-[300px] lg:p-10 sm:p-2 rounded-2xl">
              <div className="flex w-full justify-between">
                {edit && userInfo ? (
                  <div className="flex flex-col lg:text-[16px] sm:text-xxsm">
                    <span className="flex justify-between items-center p-2">
                      <p className="font-semibold ">Name And Surname</p>
                      <input
                        value={userInfo2[0]?.name}
                        placeholder="name and surname"
                        className=" py-2 px-4 border border-lightGray lg:w-[400px] sm:w-[150px] rounded-xl"
                        onChange={(e) => handleInputChange(e, "name")}
                      />
                    </span>
                    <span className="flex justify-between items-center lg:p-2">
                      <p className="font-semibold ">Phone</p>
                      <input
                        value={userInfo2[0]?.phone}
                        placeholder="phone"
                        className=" py-2 px-4 border border-lightGray lg:w-[400px] sm:w-[150px] rounded-xl"
                        onChange={(e) => handleInputChange(e, "phone")}
                      />
                    </span>
                    <span className="flex justify-between items-center p-2">
                      <p className="font-semibold">Address</p>
                      <input
                        value={userInfo2[0]?.address}
                        placeholder="address"
                        className=" py-2 px-4 border border-lightGray lg:w-[400px] sm:w-[150px] rounded-xl"
                        onChange={(e) => handleInputChange(e, "address")}
                      />
                    </span>
                    <span className="flex justify-between items-center p-2">
                      <p className="font-semibold">Email</p>
                      <input
                        value={userInfo2[0]?.email}
                        placeholder="email"
                        className=" py-2 px-4  border border-lightGray lg:w-[400px] sm:w-[150px] rounded-xl"
                        onChange={(e) => handleInputChange(e, "email")}
                      />
                    </span>
                  </div>
                ) : (
                  <div className="lg:w-[700px] sm:w-[300px] lg:text-[16px] sm:text-xxsm">
                    <span className="flex justify-between p-2">
                      <p className="font-semibold ">Name And Surname</p>
                      <h1>{userInfo && userInfo[0]?.name}</h1>
                    </span>
                    <span className="flex justify-between p-2">
                      <p className="font-semibold ">Phone</p>
                      <h1>{userInfo && userInfo[0]?.phone}</h1>
                    </span>
                    <span className="flex justify-between p-2">
                      <p className="font-semibold ">Address</p>
                      <h1>{userInfo && userInfo[0]?.address}</h1>
                    </span>
                    <span className="flex justify-between p-2">
                      <p className="font-semibold ">Email</p>
                      <h1>{userInfo && userInfo[0]?.email}</h1>
                    </span>
                  </div>
                )}
                <button
                  className="border border-blue lg:px-4 lg:py-2 sm:p-1 font-medium text-blue rounded-xl h-[45px]  lg:text-[16px] sm:text-xxsm"
                  onClick={() => (edit ? handleChangeInfo() : setEdit(!edit))}
                >
                  {edit ? "save changes" : "Edit"}
                </button>
              </div>
            </div>
          )}
          {activeTab == "Tab 2" && (
            <div className="border border-lightGray lg:p-5 sm:p-2  lg:w-[1000px] sm:w-[300px] rounded-2xl">
              {clientItems &&
                clientItems.map((item, index) => (
                  <OrderedItem key={index} order={item} />
                ))}
              {!clientItems.length && (
                <h1 className="text-sm text-darkGray font-bold flex items-center justify-center p-5">
                  You have not ordered anything yet!
                </h1>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default page;
