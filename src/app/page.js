"use client";
import { cameraTableColumns } from "@/components/custom/columns";
import { DataTable } from "@/components/custom/data-table";
import { useEffect, useState } from "react";
import { GET } from "../../utils/https-methods";

export default function Home() {
  const data = [
    {
      id: "728ed52f",
      amount: 100,
      status: "pending",
      email: "m@example.com",
    },
    {
      id: "489e1d42",
      amount: 125,
      status: "processing",
      email: "example@gmail.com",
    },
  ];

  const [cameraData, setCameraData] = useState([]);

  // Getting camera data
  const getCameraData = async () => {
    const { data } = await GET(
      `https://api-app-staging.wobot.ai/app/v1/fetch/cameras`
    );

  console.log(data, "data here");
    // Setting camera data
    if(data?.length>0){
      setCameraData(data);
    }
  };

  useEffect(() => {
    getCameraData();
  }, []);

  return (
    <div className="main-container m-5">
      <div className="heading-container text-center mt-3">
        <h3 className="text-blue-500 text-3xl font-semibold">Wobot AI</h3>
      </div>
      {/* table outside container */}
      <div className="mx-auto table-container px-5 py-3 mt-5">
        <DataTable columns={cameraTableColumns} data={cameraData} />
      </div>
    </div>
  );
}
