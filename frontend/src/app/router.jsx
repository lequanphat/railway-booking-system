import { useQueryClient } from "@tanstack/react-query";
import { useMemo } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AdminLayout from "~/components/layouts/admin-layout";

const createAppRouter = () =>
  createBrowserRouter([
    // Home route
    {
      path: "/",
      lazy: async () => {
        const HomeRoute = await import("./routes/customer/home");
        return { Component: HomeRoute.default };
      },
    },
    // Admin routes
    {
      path: "/admin",
      element: <AdminLayout />,
      children: [
        {
          path: "",
          lazy: async () => {
            const HomeRoute = await import("./routes/admin/home");
            return { Component: HomeRoute.default };
          },
        },
        {
          path: "employees",
          lazy: async () => {
            const EmployeePage = await import("./routes/admin/employees");
            return { Component: EmployeePage.default };
          },
        },
      ],
    },
    // Auth routes
    {
      path: "/auth/login",
      lazy: async () => {
        let LoginRoute = await import("./routes/auth/login");
        return { Component: LoginRoute.default };
      },
    },
    // Not found route
    {
      path: "*",
      lazy: async () => {
        let NotFoundRoute = await import("./routes/not-found");
        return { Component: NotFoundRoute.default };
      },
    },
  ]);

export const AppRouter = () => {
  const queryClient = useQueryClient();

  const router = useMemo(() => createAppRouter(queryClient), [queryClient]);
  return <RouterProvider router={router} />;
};
