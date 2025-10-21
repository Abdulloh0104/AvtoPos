import moment from "moment";
import dayjs from "dayjs";
import { Tag, Tooltip } from "antd";
import type { Company, Depot, Product, User } from "@types";
import type { TableProps } from "antd";

// COMPANY COLUMNS
export const CompanyColums: TableProps<Company>["columns"] = [
  {
    title: "Company",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Owner",
    dataIndex: "owner",
    key: "owner",
  },
  // {
  //   title: "Call number",
  //   dataIndex: "call_number",
  //   key: "call_number",
  // },
  // {
  //   title: "teachers",
  //   dataIndex: "teachers",
  //   key: "teachers",
  //   render: (teachers: Teacher[]) => {
  //     if (!teachers || teachers.length === 0) return <span>-</span>;

  //     const firstTeacher = teachers[0].first_name;
  //     const allTeacherNames = teachers.map((b) => b.first_name).join("\n"); // Tooltip uchun: \n bilan ajratilgan

  //     return (
  //       <Tooltip title={<pre style={{ margin: 0 }}>{allTeacherNames}</pre>}>
  //         <span color="geekblue">{firstTeacher}</span>
  //       </Tooltip>
  //     );
  //   },
  // },
];


// COMPANY COLUMNS
export const DepotColums: TableProps<Depot>["columns"] = [
  {
    title: "Warehouses",
    dataIndex: "title",
    key: "title",
  },
  {
    title: "User",
    dataIndex: "user",
    key: "user",
  },
  {
    title: "Company",
    dataIndex: "company",
    key: "company",
  },
];


// USER COLUMNS
export const UserColumns: TableProps<User>["columns"] = [
  {
    title: "First name",
    dataIndex: "first_name",
    key: "first_name",
  },
  {
    title: "Last name",
    dataIndex: "last_name",
    key: "last_name",
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
  },
  {
    title: "Phone number",
    dataIndex: "phone_number",
    key: "phone_number",
  },
  {
    title: "Active",
    dataIndex: "is_active",
    key: "is_active",
    render: (value: boolean) => (
      // <Tag color={value ? "blue" : "red"}>{value ? "Active" : "Inactive"}</Tag>
      <Tag color={value ? "green" : "volcano"}>
        {value ? "✅ Active" : "❌ Inactive"}
      </Tag>
    ),
  },
  {
    title: "Register Date",
    dataIndex: "created_at",
    key: "created_at",
    render: (value: string) => moment(value).format("DD MMM YYYY"),
  },
  {
    title: "Updated Date",
    dataIndex: "updated_at",
    key: "updated_at",
    render: (value: string) => (
      <Tag color="geekblue">{moment(value).format("DD MMM YYYY")}</Tag>
    ),
  },
  // {
  //   title: "Branches",
  //   dataIndex: "branches",
  //   key: "branches",
  //   render: (branches: Branch[]) => {
  //     if (!branches || branches.length === 0) return <span>-</span>;

  //     const firstBranch = branches[0].name;
  //     const allBranchNames = branches.map((b) => b.name).join("\n"); // Tooltip uchun: \n bilan ajratilgan

  //     return (
  //       <Tooltip title={<pre style={{ margin: 0 }}>{allBranchNames}</pre>}>
  //         <Tag color="geekblue">{firstBranch}</Tag>
  //       </Tooltip>
  //     );
  //   },
  // },
];


// USER COLUMNS
export const AdminColumns: TableProps<User>["columns"] = [
  {
    title: "First name",
    dataIndex: "first_name",
    key: "first_name",
  },
  {
    title: "Last name",
    dataIndex: "last_name",
    key: "last_name",
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
  },
  {
    title: "Phone number",
    dataIndex: "phone_number",
    key: "phone_number",
  },
  {
    title: "Active",
    dataIndex: "is_active",
    key: "is_active",
    render: (value: boolean) => (
      // <Tag color={value ? "blue" : "red"}>{value ? "Active" : "Inactive"}</Tag>
      <Tag color={value ? "green" : "volcano"}>
        {value ? "✅ Active" : "❌ Inactive"}
      </Tag>
    ),
  },
  {
    title: "Staff",
    dataIndex: "is_staff",
    key: "is_staff",
    render: (value: boolean) => (
      <Tag color={value ? "blue" : "default"}>{value ? "Staff" : "User"}</Tag>
    ),
  },
  {
    title: "Admin",
    dataIndex: "is_admin",
    key: "is_admin",
    render: (value: boolean) => (
      <Tag color={value ? "gold" : "blue"}>{value ? "Admin" : ""}</Tag>
    ),
  },
  {
    title: "Register Date",
    dataIndex: "created_at",
    key: "created_at",
    render: (value: string) => moment(value).format("DD MMM YYYY"),
  },
  {
    title: "Updated Date",
    dataIndex: "updated_at",
    key: "updated_at",
    render: (value: string) => (
      <Tag color="geekblue">{moment(value).format("DD MMM YYYY")}</Tag>
    ),
  },
  // {
  //   title: "Branches",
  //   dataIndex: "branches",
  //   key: "branches",
  //   render: (branches: Branch[]) => {
  //     if (!branches || branches.length === 0) return <span>-</span>;

  //     const firstBranch = branches[0].name;
  //     const allBranchNames = branches.map((b) => b.name).join("\n"); // Tooltip uchun: \n bilan ajratilgan

  //     return (
  //       <Tooltip title={<pre style={{ margin: 0 }}>{allBranchNames}</pre>}>
  //         <Tag color="geekblue">{firstBranch}</Tag>
  //       </Tooltip>
  //     );
  //   },
  // },
];

// GROUP COLUMNS
export const ProductColums: TableProps<Product>["columns"] = [
  {
    title: "Photo",
    dataIndex: "image",
    key: "image",
    render: (image) => (
      <img
        src={image || "/images/Aicon.jpg"}
        alt="Avatar"
        style={{ width: 40, height: 40, borderRadius: "50%" }}
      />
    ),
  },
  {
    title: "Title",
    dataIndex: "title",
    key: "title",
  },
  {
    title: "Manufacture Date",
    dataIndex: "manufacture_date",
    key: "manufacture_date",
    render: (value: string) => (
      <Tag color="geekblue">{moment(value).format("DD MMM YYYY")}</Tag>
    ),
  },
  {
    title: "Expiration Date",
    dataIndex: "expiration_date",
    key: "expiration_date",
    render: (value: string) => (
      <Tag color="orange">{moment(value).format("DD MMM YYYY")}</Tag>
    ),
  },
  {
    title: "Barcode",
    dataIndex: "barcode",
    key: "barcode",
  },
  {
    title: "Unit",
    dataIndex: "unit",
    key: "unit",
  },
  {
    title: "Quantity",
    dataIndex: "quantity",
    key: "quantity",
  },
  {
    title: "Cost price",
    dataIndex: "cost_price",
    key: "cost_price",
  },

  {
    title: "Sprofit_marginelling price",
    dataIndex: "selling_price",
    key: "selling_price",
  },
  {
    title: "Profit margin",
    dataIndex: "profit_margin",
    key: "profit_margin",
  },
  {
    title: "Barcode",
    dataIndex: "barcode",
    key: "barcode",
  },
  {
    title: "Course",
    dataIndex: "course",
    key: "course",
    render: (course: { title: string }) => <span>{course.title}</span>,
  },
  {
    title: "Start time",
    dataIndex: "start_time",
    key: "start_time",
    render: (value: string) =>
      value ? dayjs(value, "HH:mm:ss").format("HH:mm") : "-",
  },
  {
    title: "End time",
    dataIndex: "end_time",
    key: "end_time",
    render: (value: string) =>
      value ? dayjs(value, "HH:mm:ss").format("HH:mm") : "-",
  },

  // {
  //   title: "End date",
  //   dataIndex: "end_date",
  //   key: "end_date",
  //   render: (value: string) => moment(value).format("DD-MM-YYYY"),
  // },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    render: (value: string) => (
      <Tag
        color={
          value === "new"
            ? "blue"
            : value === "active"
            ? "green"
            : value === "completed"
            ? "gray"
            : value === "cancelled"
            ? "red"
            : "default"
        }
      >
        {value}
      </Tag>
    ),
  },
  // {
  //   title: "Room",
  //   dataIndex: "room",
  //   key: "room",
  //   render: (room: { name: string }) => <span>{room.name}</span>,
  // },
];

// COURSE COLUMNS
export const CourseColums: TableProps<"something">["columns"] = [
  {
    title: "Photo",
    dataIndex: "image",
    key: "image",
    render: (image) => (
      <img
        src={image || "/images/Aicon.jpg"}
        alt="Avatar"
        style={{ width: 40, height: 40, borderRadius: "50%" }}
      />
    ),
  },
  {
    title: "Title",
    dataIndex: "title",
    key: "title",
  },
  {
    title: "Description",
    dataIndex: "description",
    key: "description",
    render: (branches: string) => {
      if (!branches) return <span>-</span>;

      const isShort = branches.length <= 30;
      const preview = branches.slice(0, 30);

      const tagContent = (
        <span>
          {preview}
          {!isShort && "..."}
        </span>
      );

      return isShort ? (
        tagContent
      ) : (
        <Tooltip
          title={<pre className="m-0 whitespace-pre-wrap">{branches}</pre>}
        >
          {tagContent}
        </Tooltip>
      );
    },
  },

  {
    title: "Price",
    dataIndex: "price",
    key: "price",
  },
  {
    title: "Duration",
    dataIndex: "duration",
    key: "duration",
  },
  {
    title: "Lessons in a month",
    dataIndex: "lessons_in_a_month",
    key: "lessons_in_a_month",
  },
  {
    title: "Lessons in a week",
    dataIndex: "lessons_in_a_week",
    key: "lessons_in_a_week",
  },
  {
    title: "Lesson duration",
    dataIndex: "lesson_duration",
    key: "lesson_duration",
  },
  {
    title: "Is active",
    dataIndex: "is_active",
    key: "is_active",
    render: (value: boolean) => (
      <Tag color={value ? "blue" : "gold"}>{value ? "Active" : "Inactive"}</Tag>
    ),
  },
];
