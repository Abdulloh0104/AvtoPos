import { Button, Table, Space } from "antd"; //, type TablePaginationConfig 
import { EditOutlined } from "@ant-design/icons";
import { useAdmin } from "@hooks"; // ,useGeneral
import { PopConfirm } from "@components";
import type { User } from "@types";
import { useState } from "react";
import { AdminColumns } from "@components";
import AdminModel from "./modal";
// import { useEffect, useState } from "react";
// import { useLocation } from "react-router-dom";
// import RoomModal from "./model";

const Admins = () => {
  const [open, setOpen] = useState(false);
  const [update, setUpdate] = useState<User | null>(null);
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
  const { data, useAdminDelete } = useAdmin();
  // const { handlePagination } = useGeneral();
  const { mutate: deleteFn, isPending: isDeleting } = useAdminDelete();
  const deleteItem = (id: number) => {
    deleteFn(id);
  };
  const editItem = (record: User) => {
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
    ...(AdminColumns ?? []),
    {
      title: "Action",
      key: "action",
      render: (_: any, record: User) => (
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
      {open && <AdminModel open={open} toggle={toggle} update={update} />}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Admins</h2>
        <Button type="primary" onClick={() => setOpen(true)}>
          + Add Admin
        </Button>
      </div>
      <Table<User>
        columns={columns}
        dataSource={data}
        rowKey={(row) => row.id!}
        pagination={{
          // current: params.page,
          // pageSize: params.limit,
          total: data,
          showSizeChanger: true,
          pageSizeOptions: ["4", "5", "6", "7", "10"],
        }}
        // onChange={handleTableChange}
      />
    </>
  );
};

export default Admins;
