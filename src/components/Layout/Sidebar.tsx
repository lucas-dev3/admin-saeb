import styled from 'styled-components'
import { Book, FileQuestion, Home } from 'lucide-react'
import { MenuItem } from './MenuItem'

interface SidebarProps {
  isCollapsed: boolean
}

const SidebarContainer = styled.div<{ isCollapsed: boolean }>`
  width: ${props => props.isCollapsed ? '60px' : '240px'};
  transition: width 0.3s ease;
  background-color: white;
  height: 100%;
  border-right: 1px solid #eee;
`

const MenuContainer = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 4px;
`

export function Sidebar({ isCollapsed }: SidebarProps) {
  return (
    <SidebarContainer isCollapsed={isCollapsed}>
      <MenuContainer>
        <MenuItem
          icon={<Home />}
          text="Dashboard"
          to="/dashboard"
          isCollapsed={isCollapsed}
        />
        <MenuItem
          icon={<Book />}
          text="Assuntos"
          to="/assuntos"
          isCollapsed={isCollapsed}
        />
        <MenuItem
          icon={<FileQuestion />}
          text="Questões"
          to="/questoes"
          isCollapsed={isCollapsed}
        />
      </MenuContainer>
    </SidebarContainer>
  )
} 