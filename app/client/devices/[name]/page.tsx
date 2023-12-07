"use client";
import React, { useEffect, useState } from "react";
import LoadingIcons from "react-loading-icons";
import Device from "@/app/components/device";
import { useDataFetching } from "@/app/components/useDataFetching";

const Page = ({ params }: { params: { name: string } }) => {

   const [loading, setLoading] = useState<boolean>(true);

 const {
   refresh,
   images,
   allDevices,
   colors,
   memory,
   brand,
   deviceColors,
   properties,
   processors,
   checkedBrand,
   checkedMemory,
   checkedColor,
   checkedProcessor,
   setRefresh,
   setCheckedBrand,
   setCheckedColor,
   setCheckedMemory,
   setCheckedProcessor,
   setMaxPrice,
   setMinPrice,
 } = useDataFetching(0,0,params.name);

   useEffect(() => {
     if (
       images.length > 0 &&
       allDevices.length > 0 &&
       colors.length > 0 &&
       brand.length > 0 &&
       deviceColors.length > 0 &&
       memory.length > 0 &&
       processors.length > 0 &&
       properties.length > 0
     ) {
       setLoading(false);
     }
   }, [
     images,
     allDevices,
     colors,
     memory,
     brand,
     processors,
     deviceColors,
     properties,
   ]);

  
  const handleCheckBrand = (item: number) => {
    const checkedIndex = checkedBrand.indexOf(item);
    if (checkedIndex === -1) {
      setCheckedBrand([...checkedBrand, item]);
    } else {
      const updatedChecked = [...checkedBrand];
      updatedChecked.splice(checkedIndex, 1);
      setCheckedBrand(updatedChecked);
    }
    setRefresh(!refresh);
  };

  const handleCheckColor = (item: number) => {
    const checkedIndex = checkedColor.indexOf(item);
    if (checkedIndex === -1) {
      setCheckedColor([...checkedColor, item]);
    } else {
      const updatedChecked = [...checkedColor];
      updatedChecked.splice(checkedIndex, 1);
      setCheckedColor(updatedChecked);
    }
    setRefresh(!refresh);
  };

  const handleCheckMemory = (item: number) => {
    const checkedIndex = checkedMemory.indexOf(item);
    if (checkedIndex === -1) {
      setCheckedMemory([...checkedMemory, item]);
    } else {
      const updatedChecked = [...checkedMemory];
      updatedChecked.splice(checkedIndex, 1);
      setCheckedMemory(updatedChecked);
    }
    setRefresh(!refresh);
  };

  const handleCheckProcessor = (item: number) => {
    const checkedIndex = checkedProcessor.indexOf(item);
    if (checkedIndex === -1) {
      setCheckedProcessor([...checkedProcessor, item]);
    } else {
      const updatedChecked = [...checkedProcessor];
      updatedChecked.splice(checkedIndex, 1);
      setCheckedProcessor(updatedChecked);
    }
    setRefresh(!refresh);
  };

  return (
    <div>
      {loading ? (
        <div className=" flex w-screen h-[400px] justify-center items-center ">
          <LoadingIcons.ThreeDots stroke="blue" />
          <h1 className="text-sm font-bold px-4">loading...</h1>
        </div>
      ) : (
        <div className="flex flex-row lg:p-10 sm:p-5">
          <div className=" border border-lightGray lg:mr-8 sm:mr-2 rounded-lg lg:p-5 sm:p-3 lg:w-[250px] sm:w-[120px] lg:text-[16px] sm:text-xxsm lg:h-[600px] sm:h-[500px]">
            <form className="py-2">
              <label className="block mb-2 font-bold">Brand</label>
              {brand.map((brnd, index) => (
                <p key={index} className="mb-1 lg:text-xsm sm:text-xxsm">
                  <input
                    type="checkbox"
                    onChange={() => handleCheckBrand(brnd.id)}
                    checked={checkedBrand.includes(brnd.id)}
                    className="mr-2"
                  />
                  {brnd.brand_name}
                </p>
              ))}
            </form>
            <form className="py-2">
              <label className="block mb-2 font-bold ">Memory</label>
              {memory.map((memr, index) => (
                <p key={index} className="mb-1 lg:text-xsm sm:text-xxsm">
                  <input
                    type="checkbox"
                    onChange={() => handleCheckMemory(memr.id)}
                    checked={checkedMemory.includes(memr.id)}
                    className="mr-2"
                  />
                  {memr.memory_size}GB
                </p>
              ))}
            </form>
            <form className="py-2">
              <label className="block mb-2 font-bold">Color</label>
              {colors.map((cl, index) => (
                <p key={index} className="mb-1 lg:text-xsm sm:text-xxsm">
                  <input
                    type="checkbox"
                    onChange={() => handleCheckColor(cl.id)}
                    checked={checkedColor.includes(cl.id)}
                    className="mr-2"
                  />
                  {cl.color_name}
                </p>
              ))}
            </form>
            <form className="py-2">
              <label className="block mb-2 font-bold">Processor</label>
              {processors.map((pro, index) => (
                <p key={index} className="mb-1 lg:text-xsm sm:text-xxsm">
                  <input
                    type="checkbox"
                    onChange={() => handleCheckProcessor(pro.id)}
                    checked={checkedProcessor.includes(pro.id)}
                    className="mr-2"
                  />
                  {pro.processor}
                </p>
              ))}
            </form>
            <form className="py-2">
              <label className="block mb-2 font-bold">Price</label>
              <p className="flex lg:text-xsm sm:text-xxsm items-center ">
                <input
                  type="number"
                  placeholder="minimum price"
                  onChange={(e) => setMinPrice(parseInt(e.target.value))}
                  className="mr-2 px-2 py-1 border rounded-md lg:w-20 sm:w-10"
                />
                {" - "}
                <input
                  type="number"
                  placeholder="maximum price"
                  onChange={(e) => setMaxPrice(parseInt(e.target.value))}
                  className="px-2 py-1 border rounded-md lg:w-20 sm:w-10"
                />
              </p>
            </form>
          </div>
          <div className="grid lg:grid-cols-4 sm:grid-cols-1">
            {properties.map((prp, index) => {
              const deviceColor = deviceColors.find(
                (im) => im.id === prp.device_color_id
              );
              const color = colors.find(
                (im) => im.id === deviceColor?.color_id
              );
              const device = allDevices.find(
                (dev) => dev.id == deviceColor?.device_id
              );
              const brnd = brand.find((br) => br.id == device?.brand_id);
              const img = images.find(
                (im) =>
                  im.device_color_id === deviceColor?.id && im.presentation
              );
              console.log(allDevices);
              const mmry = memory.find((mr) => mr.id === prp.memory_id);
              if (device && brnd && img && color) {
                return (
                  <Device
                    key={index}
                    image={img}
                    device={device}
                    prop={prp}
                    brand={brnd}
                    memory={mmry}
                    color={color}
                  />
                );
              } else {
                return null;
              }
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default Page;
