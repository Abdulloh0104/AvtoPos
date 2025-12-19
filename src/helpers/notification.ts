import { notification } from "antd";

type NotificationType = "success" | "info" | "warning" | "error";

export const Notification = (
  type: NotificationType,
  title: string,
  description?: string
) => {
  notification[type]({
    title, //message edi antd design 4 da
    description,
    placement: "topRight",
    duration: 2,
    showProgress: true,
  });
};
