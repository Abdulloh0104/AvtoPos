import { apiConfig } from "@api/config";
import { ApiUrls } from "../api/api-urls";
import type { Company } from "@types";

export const companyService = {
  async getCompanyById(id: number): Promise<any> {
    const res = await apiConfig().getRequest(`${ApiUrls.COMPANIES}${id}`);
    return res;
  },
  async getCompanies() {
    //params: ParamsType
    const res = await apiConfig().getRequest(ApiUrls.COMPANIES); // ,params
    return res;
  },
  async getCompaniesList() {
    //params: ParamsType
    const res = await apiConfig().getRequest(ApiUrls.COMPANIES_LIST); // ,params
    return res;
  },
  //Mutations
  async createCompany(model: Company) {
    const res = await apiConfig().postRequest(ApiUrls.COMPANIES, model);
    return res;
  },

  async updateCompany(id: number, model: Company) {
    const res = await apiConfig().patchRequest(
      `${ApiUrls.COMPANIES}${id}`,
      model
    );
    return res;
  },

  async deleteCompany(id: number) {
    const res = await apiConfig().removeRequest(`${ApiUrls.COMPANIES}${id}`);
    return res;
  },

  // async getCompanyStudents(id: number) {
  //   const res = await apiConfig().getRequest(
  //     `${ApiUrls.COMPANY_STUDENTS_BY_COMPANY_ID}/${id}`
  //   );
  //   return res;
  // },

  // async getCompanyLessons(id: number) {
  //   const res = await apiConfig().getRequest(`${ApiUrls.COMPANY_LESSONS}/${id}`);
  //   return res;
  // },

  // async getCompanyTeachers(id: number) {
  //   const res = await apiConfig().getRequest(
  //     `${ApiUrls.COMPANY_TEACHERS_BY_COMPANY_ID}/${id}`
  //   );
  //   return res;
  // },

  // async createCompanyStudent(model: CompanyStudentCreateType) {
  //   const res = await apiConfig().postRequest(ApiUrls.COMPANY_STUDENTS, model);
  //   return res;
  // },

  // async createCompanyTeacher(model: CompanyTeacherCreateType) {
  //   const res = await apiConfig().postRequest(ApiUrls.COMPANY_TEACHERS, model);
  //   return res;
  // },
};
