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
  public static COMPANIES_LIST: string = this.ADMIN + "/companies-list/";

  // USERS
  public static USERS: string = this.ADMIN + "/users/";

  // PRODUCTS
  public static PRODUCTS: string = this.ADMIN + "/products/";

  // WAREHOUSES
  public static WAREHOUSES: string = this.ADMIN + "/warehouses/";

  // STATISTICS
  public static STATISTICS: string = this.ADMIN + "/statistics/";
  public static TOP_SALES: string = this.ADMIN + "/statistics/top-sales/";
  public static STATISTICS_COUNT: string = this.ADMIN + "/statistics-count/";
  public static WEEKLY_SALES: string = this.ADMIN + "/weekly-sales/";

  // ANALYTICS STATISTICS
  public static ANALYTICS_STATISTICS: string =
    this.ADMIN + "/analytics-statistics/";
  public static ANALYTICS_FINANCE: string = this.ADMIN + "/analytics-finance/";

  public static ANALYTICS_SHOPS: string = this.ADMIN + "/analytics-shops/";
  public static ANALYTICS_TOTAL: string = this.ADMIN + "/analytics-total/";
  public static ANALYTICS_TOP_PRODUCTS: string =
    this.ADMIN + "/analytics-top-products/";
  public static ANALYTICS_TOP_EMPLOYEE: string =
    this.ADMIN + "/analytics-top-employee/";
}