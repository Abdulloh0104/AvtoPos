
// const Products = () => {
//   return (
//     <div>Products</div>
//   )
// }

// export default Products


import { Button, Table, Space,} from "antd";
import { EditOutlined } from "@ant-design/icons";
import { useProduct } from "@hooks";
import { PopConfirm } from "@components";
import type { Product } from "@types";
import { useState } from "react";
import ProductModal from "./modal";
import { ProductColums } from "@components";

const Products = () => {
  const [open, setOpen] = useState(false);
  const [update, setUpdate] = useState<Product | null>(null);
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
  const { data: product, useProductDelete } = useProduct();
  // const { handlePagination } = useGeneral();
  const { mutate: deleteFn, isPending: isDeleting } = useProductDelete();
  const deleteItem = (id: number) => {
    deleteFn(id);
  };
  const editItem = (record: Product) => {
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
    ...(ProductColums ?? []),
    {
      title: "Action",
      key: "action",
      render: (_: any, record: Product) => (
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
        <ProductModal
         open={open} toggle={toggle} update={update}
        />
      )}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Rooms</h2>
        <Button type="primary" onClick={() => setOpen(true)}>
          + Add Product
        </Button>
      </div>
      <Table<Product>
        columns={columns} // Error occured there
        dataSource={product?.data}
        rowKey={(row) => row.id!}
        pagination={{
          // current: params.page,
          // pageSize: params.limit,
          total: product?.data,
          showSizeChanger: true,
          pageSizeOptions: ["4", "5", "6", "7", "10"],
        }}
        // onChange={handleTableChange}
      />
    </>
  );
};

export default Products;
