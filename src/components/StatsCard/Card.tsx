import styled from "styled-components";
import { ArrowUpOutlined, ArrowDownOutlined } from "@ant-design/icons";

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 16px;
  border-radius: 16px;
  border: 1px solid #e0e0e0;
  background-color: white;
  width: 256px;
  min-width: 256px;
  height: 128px;
  flex: 1;
  min-width: 180px;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const IconWrapper = styled.div<{ bg: string }>`
  padding: 8px;
  border-radius: 8px;
  background-color: ${({ bg }) => bg};
`;

const Label = styled.p<{ color: string }>`
  font-size: 12px;
  color: ${({ color }) => color};
  margin: 0;
`;

const Value = styled.p<{ color: string }>`
  font-size: 24px;
  font-weight: bold;
  color: ${({ color }) => color};
  margin: 0;
`;

const Footer = styled.div<{ color: string }>`
  display: flex;
  align-items: center;
  font-size: 14px;
  margin-top: 8px;
  color: ${({ color }) => color};
`;

const Percent = styled.span`
  margin-left: 4px;
  font-weight: 600;
`;

const Subtitle = styled.span`
  margin-left: 8px;
  color: #888;
`;

interface CardProps {
  icon: React.ReactNode;
  bg: string;
  label: string;
  labelColor: string;
  value: string | number;
  valueColor: string;
  trend: "up" | "down";
  percent: number;
  subtitle: string;
  trendColor: string;
}

export const Card = ({
  icon,
  bg,
  label,
  labelColor,
  value,
  valueColor,
  trend,
  percent,
  subtitle,
  trendColor,
}: CardProps) => {
  return (
    <CardContainer>
      <Header>
        <IconWrapper bg={bg}>{icon}</IconWrapper>
        <div>
          <Label color={labelColor}>{label}</Label>
          <Value color={valueColor}>{value}</Value>
        </div>
      </Header>
      <Footer color={trendColor}>
        {trend === "up" ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
        <Percent>{percent}%</Percent>
        <Subtitle>{subtitle}</Subtitle>
      </Footer>
    </CardContainer>
  );
};
