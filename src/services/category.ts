import { ApiResponse, Category, CreateCategory, EditCategory } from "../types";
import { Option } from "../types/common";
import { api } from "./api";

export const categoryApi = api.injectEndpoints({
  endpoints: ({mutation, query}) => ({
    getCategories: query<Option[], void>({
      query: () => ({
        url: '/category',
      }),
      transformResponse: (response: { statusCode: number; categories: Category[] }) =>
        response.categories.map((el: Category) => ({
          value: el.id,
          label: el.name,
        })),
      providesTags: ['categories']
    }),
    getCategory: query<ApiResponse<Category>, number>({
      query: (id: number) => ({
        url: `/category/${id}`
      }),
    }),
    createCategory: mutation<CreateCategory['Response'], CreateCategory['Request']>({
      query: (body) => ({
        url: '/category',
        method: 'POST',
        body
      }),
      invalidatesTags: ['categories']
    }),
    updateCategory: mutation<EditCategory['Response'], EditCategory['Request']>({
      query: ({id, body}) => ({
        url: `/category/${id}`,
        method: 'PATCH',
        body
      }),
      invalidatesTags: ['categories']
    }),
    deleteCategory: mutation<ApiResponse<object>, number>({
      query: (id) => ({
        url: `/category/${id}`,
        method: 'DELETE'
      }),
      invalidatesTags: ['categories']
    })
  }),
});

export const { 
  useGetCategoriesQuery, 
  useCreateCategoryMutation, 
  useUpdateCategoryMutation, 
  useDeleteCategoryMutation,
  useGetCategoryQuery
} = categoryApi;
