export class ApiUrls {
  // AUTH
  public static LOGIN: string = "/users/login/";
  public static SEND_OTP: string = "/users/send-otp/";
  public static VERIFY_OTP: string = "/users/verify-otp/";

  // ADMIN
  public static ADMIN: string = "/admin";
  public static CHANGE_ADMIN_PASSWORD: string = this.ADMIN + "/change-password";

  // COMPANIES
  public static COMPANIES: string = this.ADMIN + "/companies/";

  // USERS
  public static USERS: string = this.ADMIN + "/users/";

  // PRODUCTS
  public static PRODUCTS: string = this.ADMIN + "/products/";

  // WAREHOUSES
  public static WAREHOUSES: string = this.ADMIN + "/warehouses/";

  // STATISTICS
  public static STATISTICS: string = this.ADMIN + "/statistics/";
  public static TOP_SALES: string = this.ADMIN + "/statistics/top-sales/";
}
