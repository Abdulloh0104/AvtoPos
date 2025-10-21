import { Button, Form, Input, Modal, Select} from "antd";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import type { ModalProps, Company, User } from "@types";
import { useCompany, useUser } from "@hooks";
import { companyFormSchema } from "@utils";
interface CompanyProps extends ModalProps {
  update: Company | null;
}

const CompanyModal = ({ open, toggle, update }: CompanyProps) => {
  console.log("update", update);
  const { useCompanyCreate, useCompanyUpdate } = useCompany(); // {page:1,limit:11}
  const {users} = useUser()
  const { mutate: createFn } = useCompanyCreate();
  const { mutate: updateFn } = useCompanyUpdate();
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(companyFormSchema),
    defaultValues: {
      name: "",
      owner: undefined,
    },
  });
  useEffect(() => {
    if (update?.id) {
      setValue("name", update.name ? update.name : "");
      setValue("owner", update.owner);
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
            console.log("Create Company", data);
            toggle();
          },
        }
      );
    }
  };
  return (
    <Modal
      title="Company Modal"
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
          name="name"
          validateStatus={errors.name ? "error" : ""}
          help={errors.name ? errors.name.message : ""}
        >
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                status={errors.name ? "error" : ""}
                placeholder="Company"
              />
            )}
          />
        </Form.Item>
        <Form.Item
          label="Owner"
          name="owner"
          validateStatus={errors.owner ? "error" : ""}
          help={errors.owner ? errors.owner.message : ""}
        >
          <Controller
            name="owner"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                showSearch
                status={errors.owner ? "error" : ""}
                placeholder="Select owner"
                optionFilterProp="label"
                filterSort={(optionA, optionB) =>
                  (optionA?.label ?? "")
                    .toLowerCase()
                    .localeCompare((optionB?.label ?? "").toLocaleLowerCase())
                }
                options={users?.data?.map((owner: User) => {
                  return {
                    value: owner.id,
                    label: `${owner.last_name} ${owner.first_name}`,
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

export default CompanyModal;
