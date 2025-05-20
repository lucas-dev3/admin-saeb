import { useState } from "react";
import styled from "styled-components";
import { Header } from "./Header";
import { Sidebar } from "./Sidebar";

const LayoutContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: hidden;
`;

const MainContent = styled.main`
  display: flex;
  flex: 1;
`;

const Content = styled.div`
  flex: 1;
  padding: 24px;
  max-height: calc(100vh - 60px);
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #888;
    border-radius: 4px;
    border: 1px solid transparent;
    background-clip: padding-box; /* Faz o fundo não ultrapassar a borda */
  }
  
  &::-webkit-scrollbar-thumb:hover {
    background-color: #555;
  }
`;

export function Layout({ children }: { children: React.ReactNode }) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleToggleSidebar = () => {
    setIsCollapsed((prev) => !prev);
  };

  return (
    <LayoutContainer>
      <Header onToggleSidebar={handleToggleSidebar} />
      <MainContent>
        <Sidebar isCollapsed={isCollapsed} />
        <Content>{children}</Content>
      </MainContent>
    </LayoutContainer>
  );
}
