import { QueryClient, useQueryClient } from '@tanstack/react-query';
import { useMemo } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import AdminLayout from '~/components/layouts/admin-layout';
import AuthLayout from '~/components/layouts/auth-layout';
import MainLayout from '~/components/layouts/main-layout';
import AdminRoutes from './guards/admin-routes';
import AuthRoutes from './guards/auth-routes';
import UserRoutes from './guards/user-routes';
import PrivateRoutes from './guards/private-routes';

const queryClient = new QueryClient();

const createAppRouter = () =>
  createBrowserRouter(
    [
      // user routes
      {
        path: '/',
        element: (
          <UserRoutes>
            <MainLayout />
          </UserRoutes>
        ),
        errorElement: async () => {
          let NotFoundRoute = await import('./routes/not-found');
          return { Component: NotFoundRoute.default };
        },
        children: [
          {
            path: '/',
            lazy: async () => {
              const HomeRoute = await import('./routes/customer/home');
              return { Component: HomeRoute.default };
            },
          },
          {
            path: '/booking',
            lazy: async () => {
              const BookingPage = await import('./routes/customer/booking');
              return { Component: BookingPage.default };
            },
          },
          {
            path: '/ticket-booking/callback',
            lazy: async () => {
              const TicketBookingCallback = await import('./routes/customer/ticket-booking/callback');
              return { Component: TicketBookingCallback.default };
            },
          },
          {
            path: '/tickets',
            lazy: async () => {
              const TicketsPage = await import('./routes/customer/tickets');
              return { Component: TicketsPage.default };
            },
          },

          {
            path: '/contacts',
            lazy: async () => {
              const ContactPage = await import('./routes/customer/contact');
              return { Component: ContactPage.default };
            },
          },
          {
            path: '/about',
            lazy: async () => {
              const AboutPage = await import('./routes/customer/about');
              return { Component: AboutPage.default };
            },
          },
          {
            path: '/search',
            lazy: async () => {
              const SearchPage = await import('./routes/customer/search-routes');
              return { Component: SearchPage.default };
            },
          },
        ],
      },
      // private routes
      {
        path: '/orders',
        element: (
          <PrivateRoutes>
            <MainLayout />
          </PrivateRoutes>
        ),
        children: [
          {
            path: '',
            lazy: async () => {
              const OrdersPage = await import('./routes/customer/orders');
              return { Component: OrdersPage.default };
            },
          },
        ],
      },
      {
        path: '/tickets',
        element: (
          <PrivateRoutes>
            <MainLayout />
          </PrivateRoutes>
        ),
        children: [
          {
            path: '',
            lazy: async () => {
              const TicketPage = await import('./routes/customer/tickets');
              return { Component: TicketPage.default };
            },
          },
        ],
      },
      // Admin routes
      {
        path: '/admin',
        element: (
          <AdminRoutes>
            <AdminLayout />
          </AdminRoutes>
        ),
        children: [
          {
            path: '',
            lazy: async () => {
              const HomeRoute = await import('./routes/admin/home');
              return { Component: HomeRoute.default };
            },
          },
          {
            path: 'employees',
            lazy: async () => {
              const EmployeePage = await import('./routes/admin/employees');
              return { Component: EmployeePage.default };
            },
          },
          {
            path: 'customers',
            lazy: async () => {
              const CustomerPage = await import('./routes/admin/customers');
              return { Component: CustomerPage.default };
            },
          },
          {
            path: 'carriage-layouts',
            lazy: async () => {
              const CarriagesManagement = await import('./routes/admin/carriages');
              return { Component: CarriagesManagement.default };
            },
          },
          {
            path: 'carriage-layouts/create',
            lazy: async () => {
              const CreateCarriage = await import('./routes/admin/carriages/create');
              return { Component: CreateCarriage.default };
            },
          },
          {
            path: 'carriage-layouts/:id',
            lazy: async () => {
              const CarriageDetails = await import('./routes/admin/carriages/[id]');
              return { Component: CarriageDetails.default };
            },
          },
          {
            path: 'carriage-layouts/:id/edit',
            lazy: async () => {
              const EditCarriagePage = await import('./routes/admin/carriages/[id]/edit');
              return { Component: EditCarriagePage.default };
            },
          },
          {
            path: 'seats',
            lazy: async () => {
              const SeatsManagement = await import('./routes/admin/seat-types');
              return { Component: SeatsManagement.default };
            },
          },
          {
            path: 'trains',
            lazy: async () => {
              const TrainsManagement = await import('./routes/admin/trains');
              return { Component: TrainsManagement.default };
            },
          },
          {
            path: 'trains/create',
            lazy: async () => {
              const CreateTrain = await import('./routes/admin/trains/create');
              return { Component: CreateTrain.default };
            },
          },
          {
            path: 'trains/:id',
            lazy: async () => {
              const TrainDetails = await import('./routes/admin/trains/[id]');
              return { Component: TrainDetails.default };
            },
          },
          {
            path: 'trains/:id/edit',
            lazy: async () => {
              const EditTrainPage = await import('./routes/admin/trains/[id]/edit');
              return { Component: EditTrainPage.default };
            },
          },
          {
            path: 'trains/:trainId/route-segments',
            lazy: async () => {
              const CreateTrain = await import('./routes/admin/trains/route-segments');
              return { Component: CreateTrain.default };
            },
            loader: async ({ params }) => {
              const { RouteSegmentsLoader } = await import('./routes/admin/trains/route-segments');
              return RouteSegmentsLoader(queryClient)({ params });
            },
          },
          {
            path: 'schedules/generate-route-segments',
            lazy: async () => {
              const GenerateSchedule = await import('./routes/admin/generate-route-segments');
              return { Component: GenerateSchedule.default };
            },
          },
          {
            path: 'generate-schedules',
            lazy: async () => {
              const GenerateSchedulesPage = await import('./routes/admin/train-schedules/generate-schedules');
              return { Component: GenerateSchedulesPage.default };
            },
          },
          {
            path: 'train-schedules',
            lazy: async () => {
              const TrainScheDulesPage = await import('./routes/admin/train-schedules');
              return { Component: TrainScheDulesPage.default };
            },
          },
          {
            path: 'orders',
            lazy: async () => {
              const OrderManagement = await import('./routes/admin/orders');
              return { Component: OrderManagement.default };
            },
          },
          {
            path: 'reports/tickets',
            lazy: async () => {
              const TicketReport = await import('./routes/admin/reports');
              return { Component: TicketReport.default };
            },
          },
          {
            path: 'settings/objects',
            lazy: async () => {
              const ObjectsManagement = await import('./routes/admin/settings/objects');
              return { Component: ObjectsManagement.default };
            },
          },
          {
            path: 'passengers',
            lazy: async () => {
              const ManagePassengerPage = await import('./routes/admin/train-schedules/manage-passengers');
              return { Component: ManagePassengerPage.default };
            },
          },
        ],
      },
      // Auth routes
      {
        path: '/auth',
        element: (
          <AuthRoutes>
            <AuthLayout />
          </AuthRoutes>
        ),
        children: [
          {
            path: 'login',
            lazy: async () => {
              let LoginRoute = await import('./routes/auth/login');
              return { Component: LoginRoute.default };
            },
          },
          {
            path: 'register',
            lazy: async () => {
              let RegisterRoute = await import('./routes/auth/register');
              return { Component: RegisterRoute.default };
            },
          },
          {
            path: 'verify-account',
            lazy: async () => {
              let AccountVerification = await import('./routes/auth/verify-account');
              return { Component: AccountVerification.default };
            },
          },
          {
            path: 'verify-account/:token',
            lazy: async () => {
              let AccountVerificationResult = await import('./routes/auth/verify-account-result');
              return { Component: AccountVerificationResult.default };
            },
          },
        ],
      },
      // Not found route
      {
        path: '*',
        lazy: async () => {
          let NotFoundRoute = await import('./routes/not-found');
          return { Component: NotFoundRoute.default };
        },
      },
    ],
    {
      future: {
        v7_relativeSplatPath: true,
        v7_fetcherPersist: true,
      },
    },
  );

export const AppRouter = () => {
  const queryClient = useQueryClient();

  const router = useMemo(() => createAppRouter(queryClient), [queryClient]);
  return (
    <RouterProvider
      router={router}
      future={{
        v7_startTransition: true,
      }}
    />
  );
};
