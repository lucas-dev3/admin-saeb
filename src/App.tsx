import { Routes, Route, Navigate } from "react-router-dom";
import { Login } from "./pages/Login";
import { Layout } from "./components/Layout";
import { Dashboard } from "./pages/Dashboard";
import { Questoes } from "./pages/Questoes";
import { Assuntos } from "./pages/Assuntos";
import { NovaQuestao } from "./pages/Nova-Questao";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<Login />} />
      <Route
        path="/dashboard"
        element={
          <Layout>
            <Dashboard />
          </Layout>
        }
      />
      <Route
        path="/questoes"
        element={
          <Layout>
            <Questoes />
          </Layout>
        }
      />
      <Route
        path="/nova-questao"
        element={
          <Layout>
            <NovaQuestao />
          </Layout>
        }
      />
      <Route
        path="/assuntos"
        element={
          <Layout>
            <Assuntos />
          </Layout>
        }
      />
    </Routes>
  );
}
