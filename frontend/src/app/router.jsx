import { useQueryClient } from "@tanstack/react-query";
import { useMemo } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AdminLayout from "~/components/layouts/admin-layout";
import AuthLayout from "~/components/layouts/auth-layout";
import MainLayout from "~/components/layouts/main-layout";

const createAppRouter = () =>
  createBrowserRouter([
    // Home route
    {
      path: "/",
      element: <MainLayout />,
      children: [
        {
          path: "/",
          lazy: async () => {
            const HomeRoute = await import("./routes/customer/home");
            return { Component: HomeRoute.default };
          },
        },
        {
          path: "/schedule",
          lazy: async () => {
            const SchedulePage = await import("./routes/customer/schedule");
            return { Component: SchedulePage.default };
          },
        },
        {
          path: "/tickets",
          lazy: async () => {
            const TicketsPage = await import("./routes/customer/tickets");
            return { Component: TicketsPage.default };
          },
        },
        {
          path: "/orders",
          lazy: async () => {
            const OrdersPage = await import("./routes/customer/orders");
            return { Component: OrdersPage.default };
          },
        },
        {
          path: "/contacts",
          lazy: async () => {
            const ContactPage = await import("./routes/customer/contact");
            return { Component: ContactPage.default };
          },
        },
        {
          path: "/about",
          lazy: async () => {
            const AboutPage = await import("./routes/customer/about");
            return { Component: AboutPage.default };
          },
        },
      ],
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
      path: "/auth",
      element: <AuthLayout />,
      children: [
        {
          path: "login",
          lazy: async () => {
            let LoginRoute = await import("./routes/auth/login");
            return { Component: LoginRoute.default };
          },
        },
        {
          path: "register",
          lazy: async () => {
            let RegisterRoute = await import("./routes/auth/register");
            return { Component: RegisterRoute.default };
          },
        },
      ],
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
