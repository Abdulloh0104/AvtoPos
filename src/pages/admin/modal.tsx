import {
  Button,
  Form,
  Input,
  Modal,
  Switch,
} from "antd";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import type { ModalProps, User } from "@types";
import { useUser } from "@hooks";
import { userFormSchema } from "@utils";
import { MaskedInput } from "antd-mask-input";
interface AdminProps extends ModalProps {
  update: User | null;
}

const AdminModel = ({ open, toggle, update }: AdminProps) => {
  const { useUserUpdate, useUserCreate } = useUser(); // {page:1,limit:11}
  const { mutate: createFn } = useUserCreate();
  const { mutate: updateFn } = useUserUpdate();
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(userFormSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      phone_number: "",
      is_active: false,
      is_staff: false,
      is_admin: false,
    },
  });
  useEffect(() => {
    if (update?.id) {
      setValue("first_name", update.first_name ? update.first_name : "");
      setValue("last_name", update.last_name ? update.last_name : "");
      setValue("email", update.email ? update.email : "");
      setValue("phone_number", update.phone_number ? update.phone_number : "");
      setValue("is_active", update.is_active);
      setValue("is_staff", update.is_staff);
      setValue("is_admin", update.is_admin);
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
            console.log("Create User", data);
            toggle();
          },
        }
      );
    }
  };
  return (
    <Modal
      title="User Modal"
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
          label="First name"
          name="first_name"
          validateStatus={errors.first_name ? "error" : ""}
          help={errors.first_name ? errors.first_name.message : ""}
        >
          <Controller
            name="first_name"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                status={errors.first_name ? "error" : ""}
                placeholder="First name"
              />
            )}
          />
        </Form.Item>
        <Form.Item
          label="Last name"
          name="last_name"
          validateStatus={errors.last_name ? "error" : ""}
          help={errors.last_name ? errors.last_name.message : ""}
        >
          <Controller
            name="last_name"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                status={errors.last_name ? "error" : ""}
                placeholder="Last name"
              />
            )}
          />
        </Form.Item>
        <Form.Item
          label="Email"
          name="email"
          validateStatus={errors.email ? "error" : ""}
          help={errors.email ? errors.email.message : ""}
        >
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                status={errors.email ? "error" : ""}
                placeholder="Email"
              />
            )}
          />
        </Form.Item>
        <Form.Item
          label="Phone"
          name="phone_number"
          validateStatus={errors.phone_number ? "error" : ""}
          help={errors.phone_number ? errors.phone_number.message : ""}
        >
          <Controller
            name="phone_number"
            control={control}
            render={({ field }) => (
              <MaskedInput
                {...field}
                mask="+998 (00) 000-00-00"
                value={update ? update.phone_number : ""}
              />
            )}
          />
        </Form.Item>

        <Form.Item
          // label="Active"
          name="is_active"
          valuePropName="checked"
          validateStatus={errors.is_active ? "error" : ""}
          help={errors.is_active ? errors.is_active.message : ""}
        >
          <Controller
            name="is_active"
            control={control}
            render={({ field }) => (
              <Switch
                {...field}
                checked={field.value}
                onChange={(checked) => field.onChange(checked)}
                checkedChildren="Active"
                unCheckedChildren="Inactive"
              />
            )}
          />
        </Form.Item>
        <Form.Item
          // label="Staff"
          name="is_staff"
          valuePropName="checked"
          validateStatus={errors.is_staff ? "error" : ""}
          help={errors.is_staff ? errors.is_staff.message : ""}
        >
          <Controller
            name="is_staff"
            control={control}
            render={({ field }) => (
              <Switch
                {...field}
                checked={field.value}
                onChange={(checked) => field.onChange(checked)}
                checkedChildren="Staff"
                unCheckedChildren="User"
              />
            )}
          />
        </Form.Item>
        <Form.Item
          // label="Admin"
          name="is_admin"
          valuePropName="checked"
          validateStatus={errors.is_admin ? "error" : ""}
          help={errors.is_admin ? errors.is_admin.message : ""}
        >
          <Controller
            name="is_admin"
            control={control}
            render={({ field }) => (
              <Switch
                {...field}
                checked={field.value}
                onChange={(checked) => field.onChange(checked)}
                checkedChildren="Admin"
                unCheckedChildren="User"
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

export default AdminModel;
