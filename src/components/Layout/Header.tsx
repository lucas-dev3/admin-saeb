import styled from "styled-components";
import { Menu, User, LogOut, UserCircle } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import logo from "../../assets/logo.png";

interface HeaderProps {
  onToggleSidebar: () => void;
}

const HeaderContainer = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 60px;
  padding: 0 12px;
  background: white;
  border-bottom: 1px solid #eee;
  top: 0;
  right: 0;
  left: 0;
  z-index: 100;
`;

const MenuButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border: none;
  background: transparent;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #f5f5f5;
  }

  svg {
    width: 24px;
    height: 24px;
    color: #666;
  }
`;

const ProfileButton = styled(MenuButton)`
  margin-left: auto;
  position: relative;
`;

const DropdownMenu = styled.div<{ isOpen: boolean }>`
  position: absolute;
  top: 100%;
  right: 0;
  margin-top: 8px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  display: ${props => props.isOpen ? 'block' : 'none'};
  min-width: 200px;
`;

const DropdownItem = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
  padding: 12px 16px;
  border: none;
  background: transparent;
  cursor: pointer;
  transition: background-color 0.2s;
  color: #333;

  &:hover {
    background-color: #f5f5f5;
  }

  &:first-child {
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
  }

  &:last-child {
    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;
    border-top: 1px solid #eee;
  }

  svg {
    width: 18px;
    height: 18px;
    color: #666;
  }
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

export function Header({ onToggleSidebar }: HeaderProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleProfileClick = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleAccountClick = () => {
    // Implementar navegação para a página de conta
    setIsDropdownOpen(false);
  };

  const handleLogout = () => {
    // Implementar lógica de logout
    setIsDropdownOpen(false);
  };

  return (
    <HeaderContainer>
      <MenuButton onClick={onToggleSidebar}>
        <Menu />
      </MenuButton>

      <LogoContainer>
        <img
          src={logo}
          alt="logo"
          width={32}
          height={32}
          style={{ marginLeft: "16px" }}
        />
        <h3 style={{ margin: "0" }}>SaebPro.</h3>
      </LogoContainer>

      <div ref={dropdownRef}>
        <ProfileButton onClick={handleProfileClick}>
          <User />
          <DropdownMenu isOpen={isDropdownOpen}>
            <DropdownItem onClick={handleAccountClick}>
              <UserCircle />
              Conta
            </DropdownItem>
            <DropdownItem onClick={handleLogout}>
              <LogOut />
              Sair
            </DropdownItem>
          </DropdownMenu>
        </ProfileButton>
      </div>
    </HeaderContainer>
  );
}
