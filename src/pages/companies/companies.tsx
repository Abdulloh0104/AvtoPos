// import { useCompany } from "@hooks";

// const Companies = () => {
//   const { data:company } = useCompany();

//   console.log("Company",company?.data);
//   return <div>Companies</div>;
// };

// export default Companies;

import { Button, Table, Space } from "antd";
import { EditOutlined } from "@ant-design/icons";
import { useCompany } from "@hooks";
import { PopConfirm } from "@components";
import type { Company } from "@types";
import { useState } from "react";
import CompanyModal from "./modal";
import { CompanyColums } from "@components";
// import { useEffect, useState } from "react";
// import { useLocation } from "react-router-dom";
// import RoomModal from "./model";

const Rooms = () => {
  const [open, setOpen] = useState(false);
  const [update, setUpdate] = useState<Company | null>(null);
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
  const { data: company, useCompanyDelete } = useCompany();
  console.log("Company44", company?.data);
  // const { handlePagination } = useGeneral();
  const { mutate: deleteFn, isPending: isDeleting } = useCompanyDelete();
  const deleteItem = (id: number) => {
    deleteFn(id);
  };
  const editItem = (record: Company) => {
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
    ...(CompanyColums ?? []),
    {
      title: "Action",
      key: "action",
      render: (_: any, record: Company) => (
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
      {open && (
        <CompanyModal
         open={open} toggle={toggle} update={update}
        />
      )}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Kompaniyalar</h2>
        <Button type="primary" onClick={() => setOpen(true)}>
          + Add Company
        </Button>
      </div>
      <Table<Company>
        columns={columns} // Error occured there
        dataSource={company?.data}
        rowKey={(row) => row.id!}
        pagination={{
          // current: params.page,
          // pageSize: params.limit,
          total: company?.data,
          showSizeChanger: true,
          pageSizeOptions: ["4", "5", "6", "7", "10"],
        }}
        // onChange={handleTableChange}
      />
    </>
  );
};

export default Rooms;
