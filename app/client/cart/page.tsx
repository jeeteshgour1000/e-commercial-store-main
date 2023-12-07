"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  OrdersType,
  PersonalInfoType,
} from "@/app/types/types";
import { useSession } from "next-auth/react";
import Order from "@/app/components/order";
import { toast } from "react-toastify";
import GooglePayButton from "@google-pay/button-react";
import { useDataFetching } from "@/app/components/useDataFetching";
import LoadingIcons from "react-loading-icons";
import { redirect } from "next/navigation";

function page() {
  const session = useSession({ required: false });
  const user = session.data?.user;
  const [loading, setLoading] = useState<boolean>(true);

  if (!session.data?.user.token) {
    redirect("/");
  }

const {
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
  setRefresh,
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
  }, [
    cartItems,
    images,
    devices,
    colors,
    memory,
    brand,
    deviceColors,
    properties,
  ]);

  const clientItems: OrdersType[] = properties
    .filter(
      (p) =>
        p.id ==
        cartItems.find((i) => i.item_id == p.id && i.client_id == user?.id)
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
        quantity: cartItems.find(
          (i) => i.item_id == prp.id && i.client_id == user?.id
        )?.quantity,
        item_id: cartItems.find(
          (i) => i.item_id == prp.id && i.client_id == user?.id
        )?.item_id,
      };
    });

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

  const handleDeleteOrder = (item_id?: number) => {
    try {
      axios.post("/api/cart/deleteItem", item_id);
      toast.success("The item deleted successfully");
    } catch {
      toast.success("Somthing went wrong while deleting the item");
    }
    setRefresh(!refresh);
  };

  const handleChangeAddress = () => {
    try {
      axios.post(`/api/editPersonalInfo/${user?.id}`, userInfo2);
      toast.success("The address edited successfully");
    } catch {
      toast.success("Somthing went wrong while editing");
    }
    setRefresh(!refresh);
    setHasLoaded(true);
    setEdit(!edit);
  };

  let total = 0;
  clientItems.map(
    (i) => i.price && i.quantity && (total += i.price * i.quantity)
  );

  const handlePaymentAuthorized = (
    paymentData: google.payments.api.PaymentData
  ): google.payments.api.PaymentAuthorizationResult => {
    if (paymentData.paymentMethodData?.tokenizationData?.token) {
      for (const m of clientItems) {
        const property = properties.find((im) => im.id === m.item_id);

        const data = {
          id: cartItems.find(
            (i) => i.item_id == m.item_id && i.client_id == user?.id
          )?.id,
          client_id: user?.id,
          item_id: m.item_id,
          quantity: m.quantity,
          left_items:
            property?.quantity && m.quantity
              ? property.quantity - m.quantity
              : 0,
        };

        axios.post("/api/order", data);
      }
      toast.success("Your order has replaced successfully");
      setRefresh(!refresh);
      return {
        transactionState: "SUCCESS",
      };
    } else {
      toast.success("There was a problem");
      return {
        transactionState: "ERROR",
      };
    }
  };

  return (
    <div>
      {loading ? (
        <div className=" flex w-screen h-[400px] justify-center items-center  ">
          <LoadingIcons.ThreeDots stroke="blue" />
          <h1 className="text-sm font-bold px-4">loading...</h1>
        </div>
      ) : (
        <div className="my-10 mx-16 flex lg:flex-row sm:flex-col lg:text-[16px] sm:text-xxsm">
          <div>
            <h1 className="text-sm text-darkGray font-bold p-1">Your Items</h1>
            <div className="border border-lightGray lg:p-5 sm:p-1 lg:w-[1000px] sm:w-[320px] rounded-2xl">
              {clientItems &&
                clientItems.map((item, index) => (
                  <Order
                    key={index}
                    handleDeleteOrder={() =>
                      handleDeleteOrder(
                        cartItems.find(
                          (i) =>
                            i.item_id == item.item_id && i.client_id == user?.id
                        )?.id
                      )
                    }
                    order={item}
                  />
                ))}
              {!clientItems.length && (
                <h1 className="lg:text-sm sm:text-xsm text-darkGray font-bold flex items-center justify-center p-5">
                  You have not added any items to your cart yet!
                </h1>
              )}
              <div className="border-t-[1px] lg:w-[900px] sm:w-[300px] p-2 border-lightGray"></div>
              <div className="flex w-full justify-between p-2">
                {edit && userInfo ? (
                  <div className="flex flex-col">
                    <h1 className="lg:text-sm sm:text-xxsm my-3 text-darkGray font-bold py-3">
                      Delivery Information
                    </h1>
                    <input
                      value={userInfo2[0]?.name}
                      placeholder="name and surname"
                      className=" py-2 px-4 lg:my-3 sm:my-1 border border-lightGray lg:w-[400px] sm:w-[200px] rounded-xl"
                      onChange={(e) => handleInputChange(e, "name")}
                    />
                    <input
                      value={userInfo2[0]?.phone}
                      placeholder="phone"
                      className=" py-2 px-4 lg:my-3 sm:my-1 border border-lightGray lg:w-[400px] sm:w-[200px]  rounded-xl"
                      onChange={(e) => handleInputChange(e, "phone")}
                    />
                    <input
                      value={userInfo2[0]?.address}
                      placeholder="address"
                      className=" py-2 px-4 lg:my-3 sm:my-1 border border-lightGray lg:w-[400px] sm:w-[200px] ] rounded-xl"
                      onChange={(e) => handleInputChange(e, "address")}
                    />
                    <h1 className=" lg:pt-8 font-medium">Estimated in 3 days</h1>
                  </div>
                ) : (
                  <div>
                    <h1 className="lg:text-sm sm:text-xxsm text-darkGray font-bold py-3">
                      Delivery Information
                    </h1>
                    <h1 className="font-bold py-1 ">
                      {userInfo && userInfo[0]?.name}
                    </h1>
                    <h1 className=" text-darkGray">
                      {userInfo && userInfo[0]?.phone}
                    </h1>
                    <h1 className=" text-darkGray py-3">
                      {userInfo && userInfo[0]?.address}
                    </h1>
                    <h1 className=" lg:pt-8  font-medium">Estimated in 3 days</h1>
                  </div>
                )}
                <button
                  className="border border-blue px-4 py-2 font-medium text-blue rounded-xl h-[45px]"
                  onClick={() =>
                    edit ? handleChangeAddress() : setEdit(!edit)
                  }
                >
                  {edit ? "save changes" : "Edit Address"}
                </button>
              </div>
            </div>
          </div>
          <div className="border border-lightGray w-[250px] lg:h-[300px] sm:h-[230px] sm:mt-3 rounded-2xl ml-10 p-1">
            <h1 className="font-semibold py-3 px-4">Order Summary</h1>
            <span className="text-darkGray flex justify-between px-4">
              <p>Sub Total</p>
              <p>${total}</p>
            </span>
            <span className="text-darkGray flex justify-between px-4">
              <p>Shipping</p>
              <p>${shipping}</p>
            </span>
            <span className="text-darkGray flex justify-between px-4">
              <p>Tax(10%)</p>
              <p>${((total + shipping) * 10) / 100}</p>
            </span>
            <div className="border-t-[1px] width-[200px] m-4 border-lightGray" />
            <span className="font-bold lg:text-sm sm:text-xxsm flex justify-between px-4">
              <p>Total</p>
              <p>${((total + shipping) * 10) / 100 + shipping + total}</p>
            </span>
            {clientItems.length != 0 && (
              <GooglePayButton
                className="w-full py-4"
                environment="TEST"
                paymentRequest={{
                  apiVersion: 2,
                  apiVersionMinor: 0,
                  allowedPaymentMethods: [
                    {
                      type: "CARD",
                      parameters: {
                        allowedAuthMethods: ["PAN_ONLY", "CRYPTOGRAM_3DS"],
                        allowedCardNetworks: ["MASTERCARD", "VISA"],
                      },
                      tokenizationSpecification: {
                        type: "PAYMENT_GATEWAY",
                        parameters: {
                          gateway: "example",
                          gatewayMerchantId: "exampleGatewayMerchantId",
                        },
                      },
                    },
                  ],
                  merchantInfo: {
                    merchantId: "12345678901234567890",
                    merchantName: "Demo Merchant",
                  },
                  transactionInfo: {
                    totalPriceStatus: "FINAL",
                    totalPriceLabel: "Total",
                    totalPrice: "0",
                    currencyCode: "USD",
                    countryCode: "US",
                  },
                }}
                onLoadPaymentData={(paymentData) => {
                  // Check the actual structure of paymentData
                  if (paymentData.paymentMethodData?.tokenizationData?.token) {
                    // Payment is successful, call handlePaymentAuthorized
                    handlePaymentAuthorized(paymentData);
                    return {
                      transactionState: "SUCCESS",
                    };
                  } else {
                    // Payment failed, return an error state
                    return {
                      transactionState: "ERROR",
                      error: {
                        reason: "PAYMENT_FAILED",
                        message: "Payment authorization failed",
                        intent: "PAYMENT_AUTHORIZATION",
                      },
                    };
                  }
                }}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default page;
