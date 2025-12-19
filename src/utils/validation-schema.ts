import * as yup from "yup";

// COMPANY FORM
export const companyFormSchema = yup.object().shape({
  name: yup.string().min(1).required("Name is required"),
  owner: yup.number().required("Owner is required"),
});

// SENDOTP FORM
export const signInFormSchema = yup.object().shape({
  phone_number: yup.string().required("Phone number is required"),
  password: yup.string().required("Password is required"),
});


// SENDOTP FORM
export const sendOTPFormSchema = yup.object().shape({
  phone_number: yup.string().required("Phone number is required"),
});

// VERIFYOTP FORM
export const verifyOTPFormSchema = yup.object().shape({
  phone_number: yup.string().required("Phone number is required"),
  otp_code: yup.string().required("Code is required"),
});

// utils/phoneUtils.ts

// +998 (90) 123-45-67 -> +998901234567
export const cleanPhoneNumber = (value: string): string => {
  if (!value) return "";
  return `+${value.replace(/\D/g, "")}`;
};

// +998901234567 -> +998 (90) 123-45-67
export const formatPhoneNumber = (value: string): string => {
  if (!value) return "";
  const digits = value.replace(/\D/g, "");

  if (digits.length < 12) return value; // noto‘liq raqam kiritilsa

  return `+${digits.slice(0, 3)} (${digits.slice(3, 5)}) ${digits.slice(
    5,
    8
  )}-${digits.slice(8, 10)}-${digits.slice(10, 12)}`;
};

// GROUP FORM
export const groupFormSchema = yup.object().shape({
  name: yup.string().min(2).required("Name is required"),
  status: yup.string().required("Status is required"),
  courseId: yup.number().required("Course is required"),
  roomId: yup.number().required("Room is required"),
  start_date: yup.string().required("Start date is required"),
  start_time: yup.string().required("Start time is required"),
});

// WAREHOUSE FORM
export const depotFormSchema = yup.object().shape({
  title: yup.string().min(1).required("Title is required"),
  user: yup.number().required("User is required"),
  company: yup.number().nullable().notRequired(),
});

// COURSE FORM
export const courseFormSchema = yup.object().shape({
  title: yup.string().min(2).required("Title is required"),
  duration: yup.number().required("Duration is required"),
  lessons_in_a_month: yup
    .number()
    .required("Lesson count is required for a month"),
  lessons_in_a_week: yup
    .number()
    .required("Lesson count is required for a week"),
  lesson_duration: yup
    .number()
    .required("Lesson duration is required by minutes"),
  price: yup.number().required("Price is required"),
  description: yup.string(),
});

// BRANCH FORM
export const branchFormSchema = yup.object().shape({
  name: yup.string().min(2).required("Name is required"),
  address: yup.string().required("Address is required"),
  call_number: yup.string().required("Call number is required"),
});

// TEACHER FORM
export const teacherFormSchema = yup.object().shape({
  first_name: yup.string().required("First name is required"),
  last_name: yup.string().required("Last name is required"),
  email: yup.string().required("Email is required"),
  password: yup.string(),
  phone: yup.string().required("Phone number is required"),
  role: yup.string().required("Role is required"),
  branchId: yup.array().of(yup.number()).required("Choose branches"), //------
  avatar_url: yup.string(),
});

// STUDENT FORM
export const userFormSchema = yup.object().shape({
  first_name: yup.string(),
  last_name: yup.string(),
  phone_number: yup.string().required("Phone number is required"),
  email: yup
    .string()
    .email("Email format is invalid (must include @)")
    .required("Email is required"),
  is_active: yup.boolean(),
  is_staff: yup.boolean(),
  is_admin: yup.boolean(),
  active_company: yup.number(),
});

export const passwordFormSchema = yup.object().shape({
  old_password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/[0-9]/, "Password must contain at least one number")
    .matches(
      /[@$!%*?&]/,
      "Password must contain at least one special character (@, $, !, etc.)"
    ),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/[0-9]/, "Password must contain at least one number")
    .matches(
      /[@$!%*?&]/,
      "Password must contain at least one special character (@, $, !, etc.)"
    ),
  confirm_password: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("Please confirm your password"),
});

// GROUP_LESSON FORM
export const groupLessonFormSchema = yup.object().shape({
  note: yup.string().required("Title is required"),
  status: yup.string().required("Status is required"),
  date: yup.string().required("Lesson date is required"),
});

export const groupTeacherFormSchema = yup.object().shape({
  groupId: yup.number(),
  teacherId: yup.array().of(yup.number()).required("Choose teachers"), //------
});

export const groupStudentFormSchema = yup.object().shape({
  groupId: yup.number(),
  studentId: yup.array().of(yup.number()).required("Choose students"), //------
});
