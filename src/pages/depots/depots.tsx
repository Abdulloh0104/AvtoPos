import { Button, Table, Space} from "antd";
import { EditOutlined } from "@ant-design/icons";
import {useDepot } from "@hooks";
import { PopConfirm } from "@components";
import type { Depot } from "@types";
import { useState } from "react";
import DepotModal from "./modal";
import { DepotColums } from "@components";
// import { useEffect, useState } from "react";
// import { useLocation } from "react-router-dom";
// import RoomModal from "./model";

const Rooms = () => {
  const [open, setOpen] = useState(false);
  const [update, setUpdate] = useState<Depot | null>(null);
  // const [params, setParams] = useState({
  //   page: 1,
  //   limit: 5,
  // });
  // const location = useLocation();
  // useEffect(() => {
  //   const searchParams = new URLSearchParams(location.search);
  //   const page = searchParams.get("page");
  //   const limit = searchParams.get("limit");
  //   if (page && limit) {
  //     setParams(() => ({
  //       page: Number(page),
  //       limit: Number(limit),
  //     }));
  //   }
  // }, [location.search]);
  const { data, useDepotDelete } = useDepot();
  // const { handlePagination } = useGeneral();
  const { mutate: deleteFn, isPending: isDeleting } = useDepotDelete();
  const deleteItem = (id: number) => {
    deleteFn(id);
  };
  const editItem = (record: Depot) => {
    setUpdate(record);
    setOpen(true);
  };

  const toggle = () => {
    setOpen(!open);
    if (update) {
      setUpdate(null);
    }
  };

  // const handleTableChange = (pagination: TablePaginationConfig) => {
  //   handlePagination({ pagination, setParams });
  // };

  const columns = [
    ...(DepotColums ?? []),
    {
      title: "Action",
      key: "action",
      render: (_: any, record: Depot) => (
        <Space size="middle">
          <Button type="primary" onClick={() => editItem(record)} size="small">
            <EditOutlined />
          </Button>
          <PopConfirm
            handleDelete={() => deleteItem(record.id!)}
            loading={isDeleting}
          />
        </Space>
      ),
    },
  ];

  return (
    <>
      {open && <DepotModal open={open} toggle={toggle} update={update} />}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Warehouses</h2>
        <Button type="primary" onClick={() => setOpen(true)}>
          + Add Depot
        </Button>
      </div>
      <Table<Depot>
        columns={columns} // Error occured there
        dataSource={data?.data}
        rowKey={(row) => row.id!}
        pagination={{
          // current: params.page,
          // pageSize: params.limit,
          total: data?.data,
          showSizeChanger: true,
          pageSizeOptions: ["4", "5", "6", "7", "10"],
        }}
        // onChange={handleTableChange}
      />
    </>
  );
};

export default Rooms;
