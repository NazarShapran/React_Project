import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SneakerWarehousePage from "../pages/Warehouse/pages/SneakerWarehousePage/SneakerWarehousePage";
import SneakerListPage from "../pages/SneakerList/pages/SneakerListPage/SneakerListPage";
import WarehousePage from "../pages/Warehouse/pages/WarehousePage/WarehousePage";
import CategoryPage from "../pages/SneakerList/pages/CategoryPage/CategoryPage";
import SneakerListPageLayout from "../pages/SneakerList/SneakerListPageLayout";
import WarehousePageLayout from "../pages/Warehouse/WarehousePageLayout";
import BrandPage from "../pages/SneakerList/pages/BrandPage/BrandPage";
import StatusPage from "../pages/Order/pages/StatusPage/StatusPage";
import OrderPage from "../pages/Order/pages/OrderPage/OrderPage";
import UsersPage from "../pages/Users/pages/UserPage/UsersPage";
import RolePage from "../pages/Users/pages/RolePage/RolePage";
import OrderPageLayout from "../pages/Order/OrderPageLayout";
import UserPageLayout from "../pages/Users/UserPageLayout";
import NotFoundPage from "../pages/NotFound/NotFoundPage";
import Layout from "../common/components/Layout/Layout";
import ProtectedRoute from "./ProtectedRoute";
import HomePage from "../pages/Home/HomePage";
import Login from "../pages/Auth/Login/LoginPage";
import RegisterPage from "../pages/Auth/Register/RegisterPage";
import AuthPageLayout from "../pages/Auth/AuthPageLayout";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="auth" element={<AuthPageLayout />} />

        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />

          <Route path="sneakers" element={<SneakerListPageLayout />}>
            <Route index element={<SneakerListPage />} />
            <Route
              path="brands"
              element={
                <ProtectedRoute allowedRoles={["Admin"]}>
                  <BrandPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="categories"
              element={
                <ProtectedRoute allowedRoles={["Admin"]}>
                  <CategoryPage />
                </ProtectedRoute>
              }
            />
          </Route>

          <Route
            path="users"
            element={
              <ProtectedRoute allowedRoles={["Admin"]}>
                <UserPageLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<UsersPage />} />
            <Route path="roles" element={<RolePage />} />
          </Route>

          <Route path="orders" element={<OrderPageLayout />}>
            <Route
              index
              element={
                <ProtectedRoute allowedRoles={["Admin", "User"]}>
                  <OrderPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="status"
              element={
                <ProtectedRoute allowedRoles={["Admin"]}>
                  <StatusPage />
                </ProtectedRoute>
              }
            />
          </Route>

          <Route
            path="warehouses"
            element={
              <ProtectedRoute allowedRoles={["Admin"]}>
                <WarehousePageLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<WarehousePage />} />
            <Route
              path="sneaker-warehouse"
              element={<SneakerWarehousePage />}
            />
          </Route>
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
