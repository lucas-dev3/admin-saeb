import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { getToken } from "../services/auth";
import { Layout } from "../components/Layout";
import { Dashboard } from "../pages/Dashboard";
import { Login } from "../pages/Login";
import { Questoes } from "../pages/Questoes";
import { NovaQuestao } from "../pages/Nova-Questao";
import { Private } from "./Private";

interface Route {
  path: string;
  private: boolean;
  children: React.ReactNode;
}

const routes: Route[] = [
  {
    path: "/",
    private: true,
    children: <Navigate to="/organizations" />,
  },
  {
    path: "/dashboard",
    private: true,
    children: (
      <Layout>
        <Dashboard />
      </Layout>
    ),
  },
  {
    path: "/login",
    private: false,
    children: getToken() ? <Navigate to={"/dashboard"} /> : <Login />,
  },
  {
    path: "/questoes",
    private: true,
    children: (
      <Layout>
        <Questoes />
      </Layout>
    ),
  },
  {
    path: "/questoes/:subjectId/criar",
    private: true,
    children: (
      <Layout>
        <NovaQuestao />
      </Layout>
    ),
  },
];

export function Navigation() {
  return (
    <Routes>
      {routes.map((route) =>
        route.private ? (
          <Route key={route.path} path={route.path} element={<Private />}>
            <Route path={route.path} element={route.children} />
          </Route>
        ) : (
          <Route key={route.path} path={route.path} element={route.children} />
        )
      )}
    </Routes>
  );
}
