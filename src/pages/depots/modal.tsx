import { Button, Form, Input, Modal, Select } from "antd";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import type { ModalProps, Depot, User, Company } from "@types";
import { useCompany, useDepot, useUser } from "@hooks";
import { depotFormSchema } from "@utils";
interface DepotProps extends ModalProps {
  update: Depot | null;
}

const DepotModal = ({ open, toggle, update }: DepotProps) => {
  console.log("update", update);
  const { useDepotCreate, useDepotUpdate } = useDepot(); // {page:1,limit:11}
  const { users } = useUser();
  const { data: companies } = useCompany();
  const { mutate: createFn } = useDepotCreate();
  const { mutate: updateFn } = useDepotUpdate();
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(depotFormSchema),
    defaultValues: {
      title: "",
      user: undefined,
      company: undefined,
    },
  });
  useEffect(() => {
    if (update?.id) {
      setValue("title", update.title ? update.title : "");
      setValue("user", update.user);
      setValue("company", update.company);
    }
  }, [update, setValue]);
  const onSubmit = (data: any) => {
    if (update?.id) {
      updateFn(
        { id: update.id, data },
        {
          onSuccess: () => {
            // console.log("Update User", { ...data, id: update.id });
            toggle();
          },
        }
      );
    } else {
      createFn(
        { ...data },
        {
          onSuccess: () => {
            console.log("Create Depot", data);
            toggle();
          },
        }
      );
    }
  };
  return (
    <Modal
      title="Warehouse Modal"
      centered
      open={open}
      onCancel={toggle}
      width={700}
      closeIcon
      footer={null}
    >
      <Form
        layout="vertical"
        autoComplete="on"
        onFinish={handleSubmit(onSubmit)}
      >
        <Form.Item
          label="Name"
          name="title"
          validateStatus={errors.title ? "error" : ""}
          help={errors.title ? errors.title.message : ""}
        >
          <Controller
            name="title"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                status={errors.title ? "error" : ""}
                placeholder="Title"
              />
            )}
          />
        </Form.Item>

        <Form.Item
          label="Company"
          name="company"
          validateStatus={errors.company ? "error" : ""}
          help={errors.company ? errors.company.message : ""}
        >
          <Controller
            name="company"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                showSearch
                status={errors.company ? "error" : ""}
                placeholder="Select Commpany"
                optionFilterProp="label"
                filterSort={(optionA, optionB) =>
                  (optionA?.label ?? "")
                    .toLowerCase()
                    .localeCompare((optionB?.label ?? "").toLocaleLowerCase())
                }
                options={companies?.data.map((compan: Company) => {
                  return {
                    value: compan.id,
                    label: `${compan.name}`,
                  };
                })}
              />
            )}
          />
        </Form.Item>
        <Form.Item
          label="User"
          name="user"
          validateStatus={errors.user ? "error" : ""}
          help={errors.user ? errors.user.message : ""}
        >
          <Controller
            name="user"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                showSearch
                status={errors.user ? "error" : ""}
                placeholder="Select owner"
                optionFilterProp="label"
                filterSort={(optionA, optionB) =>
                  (optionA?.label ?? "")
                    .toLowerCase()
                    .localeCompare((optionB?.label ?? "").toLocaleLowerCase())
                }
                options={users?.data?.map((user: User) => {
                  return {
                    value: user.id,
                    label: `${user.last_name} ${user.first_name}`,
                  };
                })}
              />
            )}
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default DepotModal;
