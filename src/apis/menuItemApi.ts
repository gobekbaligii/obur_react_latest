import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const menuItemApi = createApi({
  reducerPath: "menuItemApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://oburapi.azurewebsites.net/api/",
    prepareHeaders: (headers: Headers, api) => {
      const token = localStorage.getItem("token");
      token && headers.append("Authorization", "Bearer " + token);
    },
  }),
  tagTypes: ["MenuItems"],
  endpoints: (builder) => ({
    getMenuItems: builder.query({
      query: () => ({
        url: "menuitem",
      }),
      providesTags: ["MenuItems"],
    }),
    getMenuItemById: builder.query({
      query: (id) => ({
        url: `menuitem/${id}`,
      }),
      providesTags: ["MenuItems"],
    }),
    CreateMenuItem: builder.mutation({
      query: (data) => ({
        url: "menuitem",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["MenuItems"],
    }),
    updateMenuItem: builder.mutation({
      query: ({ data, id }) => ({
        url: "menuitem/" + id,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["MenuItems"],
    }),
    deleteMenuItem: builder.mutation({
      query: (id) => ({
        url: "menuitem/" + id,
        method: "DELETE",
      }),
      invalidatesTags: ["MenuItems"],
    }),
    getMenuItemsByRestaurant: builder.query({
      query: (restaurantId) => ({
        url: `menuitem/restaurants/${restaurantId}`,
        params: {
          ...(restaurantId && { restaurantId }),
        },
      }),
      providesTags: ["MenuItems"],
    }),
  }),
});

export const {
  useGetMenuItemsByRestaurantQuery,
  useGetMenuItemsQuery,
  useGetMenuItemByIdQuery,
  useCreateMenuItemMutation,
  useDeleteMenuItemMutation,
  useUpdateMenuItemMutation,
} = menuItemApi;
export default menuItemApi;
