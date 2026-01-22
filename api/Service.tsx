import axios from "axios";
import type {
  CategoryResponse,
  BlogCategoryResponse,
  AboutContent,
  PageWithContents,
  HeroContent,
  ContactFormData,
  ServiceResponse,
  BlogResponse,
} from "@/types/types";
import type { BatchResponse, Feature } from "@/types/types";

import type { ApiResponse } from "@/types/apiResponse";

// Create axios instance
const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add interceptors
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.request.use(
  (config) => config,
  (error) => Promise.reject(error)
);

// ---------- BATCH REQUEST ----------
export async function getBatchData(
  features: Feature[]
): Promise<BatchResponse> {
  const response = await axiosInstance.post<BatchResponse>("/batch", {
    features,
  });

  return response.data;
}

export async function getAbout(): Promise<AboutContent> {
  const response = await axiosInstance.get<ApiResponse<AboutContent>>(
    "/contents"
  );

  return response.data.data;
}

// fetch pages with active contents
export async function getPagesWithContents(): Promise<PageWithContents[]> {
  const response = await axiosInstance.get<ApiResponse<PageWithContents[]>>(
    "/pages"
  );

  return response.data.data;
}

// ---------- HERO DATA BUILDER ----------
export function buildHeroContents(pages: PageWithContents[]): HeroContent[] {
  return pages.flatMap((page) =>
    page.active_contents.map((content) => ({
      id: content.id,
      page: page.page_identifier,
      title: content.title,
      description: content.detail,
      image: content.image_path,
      type: content.type,
      order: content.order,
    }))
  );
}

// ---------- CONTACT FORM ----------
export async function postContactForm<T extends ContactFormData>(data: T) {
  const response = await axiosInstance.post<ApiResponse<T>>(
    "/contact-message",
    data
  );

  return response.data.data;
}

// ---------- PRODUCTS ----------
export async function getProducts() {
  const response = await axiosInstance.get<ApiResponse<unknown>>("/ecommerce");
  return response.data.data;
}

export async function getProductBySlug(id: string) {
  const response = await axiosInstance.get<ApiResponse<unknown>>(
    `/products/${id}`
  );
  return response.data.data;
}

export async function getProductCategories(): Promise<CategoryResponse> {
  const response = await axiosInstance.get<CategoryResponse>(
    "/ecommerce/categories"
  );
  return response.data;
}

//service by slug
export async function getServiceBySlug(slug: string): Promise<ServiceResponse> {
  const response = await axiosInstance.get<ServiceResponse>(
    `/services/slug/${slug}`
  );
  return response.data;
}

//blog by slug
export async function getBlogBySlug(slug: string): Promise<BlogResponse> {
  const response = await axiosInstance.get<BlogResponse>(`/blog/slug/${slug}`);
  return response.data;
}

// ---------- BLOGS ----------
export async function getBlogCategories(): Promise<BlogCategoryResponse> {
  const response = await axiosInstance.get<BlogCategoryResponse>(
    "/blog/categories"
  );
  return response.data;
}

export async function getBlogs() {
  const response = await axiosInstance.get<ApiResponse<unknown>>("/blogs");
  return response.data.data;
}

// ---------- OTHER API ROUTES ----------
export async function getAllTestimonials() {
  const response = await axiosInstance.get<ApiResponse<unknown>>(
    "/testimonials"
  );
  return response.data.data;
}

export async function getAllClients() {
  const response = await axiosInstance.get<ApiResponse<unknown>>("/partners");
  return response.data.data;
}

export async function getAllTeamMembers() {
  const response = await axiosInstance.get<ApiResponse<unknown>>(
    "/team-members"
  );
  return response.data.data;
}

export async function getAllAboutUsData() {
  const response = await axiosInstance.get<ApiResponse<unknown>>("/contents");
  return response.data.data;
}

export async function getAllContactUsData() {
  const response = await axiosInstance.get<ApiResponse<unknown>>("/setup");
  return response.data.data;
}

// ---------- FORMS ----------
export async function postNewsletterSubscription<T>(data: T) {
  const response = await axiosInstance.post<ApiResponse<unknown>>(
    "/newsletter-subscription",
    data
  );
  return response.data.data;
}

export async function postProductInquiry<T>(data: T) {
  const response = await axiosInstance.post<ApiResponse<unknown>>(
    "/enquiry",
    data
  );
  return response.data.data;
}

// ---------- PROJECTS ----------
export async function getAllAwards() {
  const response = await axiosInstance.get<ApiResponse<unknown>>("/awards");
  return response.data.data;
}

export async function getProjects() {
  const response = await axiosInstance.get<ApiResponse<unknown>>("/projects");
  return response.data.data;
}

export async function getSingleProject(id: string) {
  const response = await axiosInstance.get<ApiResponse<unknown>>(
    `/projects/${id}`
  );
  return response.data.data;
}
