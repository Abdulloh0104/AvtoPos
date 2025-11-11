// import { Button, Form, Input, Modal, Select} from "antd";
// import { useForm, Controller } from "react-hook-form";
// import { yupResolver } from "@hookform/resolvers/yup";
// import type { ModalProps, Company, User } from "@types";
// import { useAuth} from "@hooks";
// import { sensOTPFormSchema } from "@utils";
// interface CompanyProps extends ModalProps {
//   update: Company | null;
// }

// const CompanyModal = ({ open, toggle, update }: CompanyProps) => {
//   const { useSendOtp } = useAuth(); // {page:1,limit:11}
//   const { mutate: sendOtp} = useSendOtp();
//   const {
//     control,
//     handleSubmit,
//     formState: { errors },
//   } = useForm({
//     resolver: yupResolver(sensOTPFormSchema),
//     defaultValues: {
//       phone_number: "",
//     },
//   });
//   const onSubmit = (data: any) => {
//       sendOtp(
//         { ...data },
//         {
//           onSuccess: () => {
//             console.log("OTP sent to your telegram via Telegram bot", data);
//             toggle();
//           },
//         }
//       );
//     }
//   };
//   return (
//     <Modal
//       title="Sign in"
//       centered
//       open={open}
//       onCancel={toggle}
//       width={700}
//       closeIcon
//       footer={null}
//     >
//       <Form
//         layout="vertical"
//         autoComplete="on"
//         onFinish={handleSubmit(onSubmit)}
//       >
// <Form.Item
//           label="Phone"
//           name="phone_number"
//           validateStatus={errors.phone_number ? "error" : ""}
//           help={errors.phone_number ? errors.phone_number.message : ""}
//         >
//           <Controller
//             name="phone_number"
//             control={control}
//             render={({ field }) => (
//               <MaskedInput
//                 {...field}
//                 mask="+998 (00) 000-00-00"
//                 value={update ? update.phone_number : ""}
//               />
//             )}
//           />
//         </Form.Item>
//         <Form.Item
//           label="Owner"
//           name="owner"
//           validateStatus={errors.owner ? "error" : ""}
//           help={errors.owner ? errors.owner.message : ""}
//         >
//           <Controller
//             name="owner"
//             control={control}
//             render={({ field }) => (
//               <Select
//                 {...field}
//                 showSearch
//                 status={errors.owner ? "error" : ""}
//                 placeholder="Select owner"
//                 optionFilterProp="label"
//                 filterSort={(optionA, optionB) =>
//                   (optionA?.label ?? "")
//                     .toLowerCase()
//                     .localeCompare((optionB?.label ?? "").toLocaleLowerCase())
//                 }
//                 options={users?.data?.map((owner: User) => {
//                   return {
//                     value: owner.id,
//                     label: `${owner.last_name} ${owner.first_name}`,
//                   };
//                 })}
//               />
//             )}
//           />
//         </Form.Item>
//         <Form.Item>
//           <Button type="primary" htmlType="submit">
//             Submit
//           </Button>
//         </Form.Item>
//       </Form>
//     </Modal>
//   );
// };

// export default CompanyModal;
