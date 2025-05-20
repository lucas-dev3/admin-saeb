import { ReactNode } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

interface MenuItemProps {
  icon: ReactNode
  text: string
  to: string
  isCollapsed: boolean
}

const ItemContainer = styled(Link)<{ $isCollapsed: boolean }>`
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 12px 16px;
  color: #666;
  text-decoration: none;
  border-radius: 8px;
  margin: 4px 8px;
  transition: all 0.3s ease;

  &:hover {
    background-color: #f5f5f5;
    color: #1a1a1a;
  }

  svg {
    width: 20px;
    height: 20px;
    min-width: 20px;
  }
`

const ItemText = styled.span<{ $isCollapsed: boolean }>`
  margin-left: 12px;
  font-size: 0.9rem;
  white-space: nowrap;
  opacity: ${props => props.$isCollapsed ? 0 : 1};
  transition: opacity 0.3s ease;
`

export function MenuItem({ icon, text, to, isCollapsed }: MenuItemProps) {
  return (
    <ItemContainer to={to} $isCollapsed={isCollapsed}>
      {icon}
      <ItemText $isCollapsed={isCollapsed}>{text}</ItemText>
    </ItemContainer>
  )
} 