import { Modal, Form, Input, Button, InputNumber } from "antd";
import { useForm, Controller } from "react-hook-form";
import { useEffect } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import type { Product, ModalProps } from "@/types";
import { useProduct } from "@/hooks";

interface ProductModalProps extends ModalProps {
  update: Product | null;
}

/* ================================
   VALIDATION
================================ */
const productSchema = yup.object({
  name: yup.string().required("Name required"),
  barcode: yup.string().required("Barcode required"),
  selling_price: yup.number().required("Price required"),
});

/* ================================
   MODAL
================================ */
const ProductModal = ({ open, toggle, update }: ProductModalProps) => {
  const { useProductCreate, useProductUpdate } = useProduct();
  const { mutate: createFn } = useProductCreate();
  const { mutate: updateFn } = useProductUpdate();

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(productSchema),
    defaultValues: {
      name: "",
      barcode: "",
      selling_price: 0,
    },
  });

  /* 🔁 EDIT paytida formni to‘ldirish */
  useEffect(() => {
    if (update) {
      setValue("name", update?.name);
      setValue("barcode", update.barcode);
      setValue("selling_price", Number(update?.selling_price));
    }
  }, [update, setValue]);

  const onSubmit = (data: any) => {
    if (update?.id) {
      updateFn({ id: Number(update.id), data }, { onSuccess: toggle });
    } else {
      createFn(data, { onSuccess: toggle });
    }
  };

  return (
    <Modal
      title={update ? "Update Product" : "Add Product"}
      centered
      open={open}
      onCancel={toggle}
      footer={null}
      width={600}
    >
      <Form layout="vertical" onFinish={handleSubmit(onSubmit)}>
        {/* NAME */}
        <Form.Item
          label="Product name"
          validateStatus={errors.name ? "error" : ""}
          help={errors.name?.message}
        >
          <Controller
            name="name"
            control={control}
            render={({ field }) => <Input {...field} />}
          />
        </Form.Item>

        {/* BARCODE */}
        <Form.Item
          label="Barcode"
          validateStatus={errors.barcode ? "error" : ""}
          help={errors.barcode?.message}
        >
          <Controller
            name="barcode"
            control={control}
            render={({ field }) => <Input {...field} />}
          />
        </Form.Item>

        {/* PRICE */}
        <Form.Item
          label="Selling price"
          validateStatus={errors.selling_price ? "error" : ""}
          help={errors.selling_price?.message}
        >
          <Controller
            name="selling_price"
            control={control}
            render={({ field }) => (
              <InputNumber {...field} className="w-full" />
            )}
          />
        </Form.Item>

        <Button type="primary" htmlType="submit" block>
          {update ? "Update" : "Create"}
        </Button>
      </Form>
    </Modal>
  );
};

export default ProductModal;
