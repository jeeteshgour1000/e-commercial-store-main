"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { ImageType } from "@/app/types/types";
import { FaRegStar } from "react-icons/fa";
import { useSession } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";
import { useDataFetching } from "@/app/components/useDataFetching";
import LoadingIcons from "react-loading-icons";

const Page = ({ params }: { params: { id: number } }) => {
  const session = useSession();
  const user = session.data?.user;
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(true);


  const {
    cartItems,
    refresh,
    images,
    devices,
    colors,
    memory,
    brand,
    deviceColors,
    properties,
    processors,
    selectedImage,
    favorites,
    setRefresh,
    setSelectedImage,
  } = useDataFetching(user?.id, params.id);

  const [quantity, setQuantity] = useState<number>(
    cartItems.find(
      (item) => item.item_id === params.id && user?.id === item.client_id
    )?.quantity ?? 1
  );
  

  useEffect(() => {
    if (
      images.length > 0 &&
      devices.length > 0 &&
      colors.length > 0 &&
      brand.length > 0 &&
      deviceColors.length > 0 &&
      properties.length > 0 &&
      selectedImage
    ) {
      setLoading(false);
    }
    setQuantity(cartItems.find(
      (item) => item.item_id == params.id && user?.id == item.client_id
    )?.quantity??1)
  }, [
    cartItems,
    images,
    devices,
    colors,
    memory,
    brand,
    deviceColors,
    properties,
    selectedImage,
  ]);

  const prp = properties.find((im) => im.id == params.id);
  const deviceColor = deviceColors.find((im) => im.id === prp?.device_color_id);
  const selectedColor = colors.find((im) => im.id === deviceColor?.color_id);
  const proces = processors.find((im) => im.id === prp?.processor_id);
  const device = devices?.find((dev) => dev.id == deviceColor?.device_id);
  const brnd = brand.find((br) => br.id == device?.brand_id);
  const img = images.filter((im) => im.device_color_id === deviceColor?.id);
  const mmry = memory.find((mr) => mr.id === prp?.memory_id);

  const handleImageClick = (image: ImageType) => {
    setSelectedImage(image);
  };

  const handleAddToCart = (qunt:number) => {
    if (!session.data?.user) {
      redirect("/auth/login");
    } else {
      const itemFound = cartItems.find(
        (item) => item.item_id == params.id && user?.id == item.client_id
      );
      if (itemFound) {
        const data = {
          id: itemFound.id,
          quantity: qunt,
        };

        axios.post("/api/addMoreFromTheItem", data);
        return;
      }
      else{
        const data = {
          client_id: user?.id,
          item_id: params.id,
          quantity: qunt,
          left_items: prp ? prp?.quantity - qunt : 0,
        };
        axios.post("/api/cart", data);
      }

      setRefresh(!refresh);
    }
  };

  const handleAddToFavorites = () => {
    if (session.status == "unauthenticated") {
      router.push("/auth/login");
    } else {
      const data = {
        client_id: user?.id,
        item_id: params.id,
      };
      axios.post("/api/favorites", data);
      setRefresh(!refresh);
    }
  };

  return (
    <div>
      {loading ? (
        <div className=" flex w-screen h-[400px] justify-center items-center ">
          <LoadingIcons.ThreeDots stroke="blue" />
          <h1 className="text-sm font-bold px-4">loading...</h1>
        </div>
      ) : (
        <div className="lg:m-10 sm:m-4 flex sm:flex-col lg:flex-row">
          <div className="flex flex-col">
            <img
              src={selectedImage?.image_url}
              className="lg:w-[450px] sm:w-[250px] border border-lightGray rounded-xl"
            />
            <div className="flex">
              {img.map((item, index) => (
                <img
                  src={item.image_url}
                  key={index}
                  className="lg:w-[100px] sm:w-[50px] lg:m-1.5 sm:m-1 border border-lightGray rounded-xl cursor-pointer"
                  onClick={() => handleImageClick(item)}
                />
              ))}
            </div>
          </div>
          <div className="lg:p-8 sm:p-2 lg:w-[600px] sm:w-[230px]">
            <h1 className="sm:text-sm lg:text-xsm font-medium">
              {brnd?.brand_name.toUpperCase()} {device?.name}{" "}
              {mmry?.memory_size}GB {proces?.processor}{" "}
              {selectedColor?.color_name}
            </h1>
            <h1 className="lg:text-lg  sm:text-sm font-bold my-4">{prp?.price}$</h1>
            <p className="flex flex-row justify-center items-center bg-yellow-300 w-14 rounded-lg">
              {device?.stars.toFixed(1)} <FaRegStar className="h-7" />
            </p>
            <p className="border-t-[1px] w-[530px] border-lightGray my-5" />
            <p className="text-xsm text-darkGray">Sent from Chicago, USA</p>
            <p className="text-xsm text-darkGray">Shipping Cost $20</p>
            <p className="text-xsm text-darkGray">Estimated Delivery 3 days</p>
            <h1 className="bg-blue text-secondary my-3 p-2 w-[80px] rounded-xl font-semibold">
              Details
            </h1>
            <p className="lg:text-xsm sm:text-xxsm ">{prp?.details}</p>
          </div>
          <div className=" border border-lightGray rounded-xl w-[270px] lg:py-16 sm:py-8 lg:h-[240px] sm:h-[100px] shadow-md ml-5 p-5">
            {prp?.quantity ? (
              <>
                {cartItems.find(
                  (item) =>
                    item.item_id == params.id && user?.id == item.client_id
                ) ? (
                  <>
                    <span className="flex my-5">
                      <p
                        className="font-bold bg-blue text-secondary flex justify-center items-center rounded-tl-md rounded-bl-md p-1 w-[50px] cursor-pointer"
                        onClick={() => {
                          0 < quantity
                            ? (setQuantity(quantity - 1),
                              handleAddToCart(quantity - 1))
                            : "";
                        }}
                      >
                        -
                      </p>
                      <p className="font-bold  flex justify-center items-center p-2 w-[130px] border border-lightGray">
                        {quantity}
                      </p>
                      <p
                        className="font-bold bg-blue text-secondary flex justify-center items-center rounded-tr-md rounded-br-md p-1 w-[50px] cursor-pointer"
                        onClick={() => {
                          prp?.quantity && prp?.quantity > quantity
                            ? (setQuantity(quantity + 1),
                              handleAddToCart(quantity + 1))
                            : "";
                        }}
                      >
                        +
                      </p>
                    </span>
                    <p className="text-xsm">
                      Only {prp?.quantity && prp?.quantity - quantity} items
                      left!
                    </p>
                  </>
                ) : (
                  <p
                    className="font-bold border border-blue text-blue flex justify-center items-center rounded-md p-2 m-2 w-[200px] cursor-pointer"
                    onClick={() => handleAddToCart(quantity)}
                  >
                    Add To Cart
                  </p>
                )}

                <p
                  className="flex justify-items py-5 border-b items-center cursor-pointer"
                  onClick={() => {
                    const itemFound = favorites.find(
                      (item) =>
                        item.item_id === params.id &&
                        user?.id === item.client_id
                    );
                    if (!itemFound) {
                      handleAddToFavorites();
                    }
                  }}
                >
                  <FaRegStar
                    className={`${
                      favorites.find(
                        (item) =>
                          item.item_id == params.id &&
                          user?.id == item.client_id
                      )
                        ? "text-yellow-500"
                        : ""
                    } `}
                  />
                  Add To favorites
                </p>
              </>
            ) : (
              <>
                <p className="font-bold bg-darkGray text-secondary flex justify-center items-center rounded-md p-2 m-2 w-[200px] ">
                  Buy Now
                </p>
                <p className="font-bold border border-lightGray text-lightGray flex justify-center items-center rounded-md p-2 m-2 w-[200px]">
                  Add To Cart
                </p>
                <p
                  className="flex justify-items border-b py-5 items-center cursor-pointer"
                  onClick={() => {
                    const itemFound = favorites.find(
                      (item) =>
                        item.item_id === params.id &&
                        user?.id === item.client_id
                    );
                    if (!itemFound) {
                      handleAddToFavorites();
                    }
                  }}
                >
                  <FaRegStar
                    className={`${
                      favorites.find(
                        (item) =>
                          item.item_id == params.id &&
                          user?.id == item.client_id
                      )
                        ? "text-yellow-500"
                        : ""
                    } `}
                  />
                  Add To favorites
                </p>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Page;
