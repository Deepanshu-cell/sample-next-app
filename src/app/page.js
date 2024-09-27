"use client";
import { cameraTableColumns } from "@/components/custom/columns";
import { DataTable } from "@/components/custom/data-table";
import { useEffect, useState } from "react";
import { GET } from "../../utils/https-methods";
import { toast } from "sonner";

export default function Home() {
  const [cameraData, setCameraData] = useState([]);

  // Getting camera data
  const getCameraData = async () => {
    const { data } = await GET(
      `https://api-app-staging.wobot.ai/app/v1/fetch/cameras`
    );

    // Setting camera data
    if (data?.length > 0) {
      setCameraData(data);
    }
  };

  useEffect(() => {
    getCameraData();
  }, []);

  // Delete handler
  const handleDeleteRow = (Row) => {
    setCameraData((prevData) => prevData.filter((row) => row?.id !== Row?.id));
    toast.success(`${Row?.name} deleted successfully`,{position:'top-right'});
  };

  return (
    <div className="main-container m-5">
      {/* Page Header */}
      <div className="heading-container text-center mt-3">
        <h3 className="text-blue-500 text-3xl font-semibold">Wobot AI</h3>
      </div>

      {/* Table container */}
      <div className="mx-auto table-container px-5 py-3 mt-5">
        <DataTable
          columns={cameraTableColumns(handleDeleteRow)}
          data={cameraData}
          heading={"Cameras"}
          desc={"Manage Your Cameras here"}
        />
      </div>
    </div>
  );
}
