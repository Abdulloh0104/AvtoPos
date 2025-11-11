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
import { cleanPhoneNumber, formatPhoneNumber, userFormSchema } from "@utils";
import { MaskedInput } from "antd-mask-input";
interface UserProps extends ModalProps {
  update: User | null;
}

const UserModel = ({ open, toggle, update }: UserProps) => {
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
      setValue(
        "phone_number",
        update.phone_number ? formatPhoneNumber(update.phone_number) : ""
      );
      setValue("is_active", update.is_active);
      setValue("is_staff", update.is_staff);
      setValue("is_admin", update.is_admin);
    }
  }, [update, setValue]);
  // const onSubmit = (data: any) => {
  //   if (update?.id) {
  //     updateFn(
  //       { id: update.id, data },
  //       {
  //         onSuccess: () => {
  //           // console.log("Update User", { ...data, id: update.id });
  //           toggle();
  //         },
  //       }
  //     );
  //   } else {
  //     createFn(
  //       { ...data },
  //       {
  //         onSuccess: () => {
  //           console.log("Create User", data);
  //           toggle();
  //         },
  //       }
  //     );
  //   }
  // };
  
  const onSubmit = (data: any) => {
    const cleanedData = {
      ...data,
      phone_number: cleanPhoneNumber(data.phone_number), // ✅ backend uchun +998901234567 format
    };

    if (update?.id) {
      updateFn({ id: update.id, data: cleanedData }, { onSuccess: toggle });
    } else {
      createFn(cleanedData, { onSuccess: toggle });
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
                placeholder="+998 (__) ___-__-__"
                status={errors.phone_number ? "error" : ""}
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
        {/* {!update?.id && (
          <>
            <Form.Item
              label="Password"
              name="password_hash"
              validateStatus={errors.password_hash ? "error" : ""}
              help={errors.password_hash ? errors.password_hash.message : ""}
            >
              <Controller
                name="password_hash"
                control={control}
                render={({ field }) => (
                  <Input.Password
                    {...field}
                    type="password"
                    status={errors.password_hash ? "error" : ""}
                    placeholder="Password"
                  />
                )}
              />
            </Form.Item>
          </>
        )}
        <Form.Item
          label="Gender"
          name="gender"
          validateStatus={errors.gender ? "error" : ""}
          help={errors.gender ? errors.gender.message : ""}
        >
          <Controller
            name="gender"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                placeholder="Select role"
                status={errors.gender ? "error" : ""}
                options={[
                  { value: "male", label: "male" },
                  { value: "female", label: "female" },
                ]}
              />
            )}
          />
        </Form.Item>{" "}
        <Form.Item
          label="date_of_birth date"
          name="date_of_birth"
          validateStatus={errors.date_of_birth ? "error" : ""}
          help={errors.date_of_birth ? errors.date_of_birth.message : ""}
        >
          <Controller
            name="date_of_birth"
            control={control}
            render={({ field }) => (
              <DatePicker
                {...field}
                value={
                  field.value
                    ? typeof field.value === "string"
                      ? field.value
                        ? dayjs(field.value)
                        : null
                      : field.value
                    : null
                }
                onChange={(date, dateString) => {
                  field.onChange(date);
                  handleChange(date, dateString);
                }}
                placeholder="Start date"
              />
            )}
          />
        </Form.Item> */}
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default UserModel;
