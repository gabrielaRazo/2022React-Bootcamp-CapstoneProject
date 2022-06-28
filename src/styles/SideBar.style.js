import styled from 'styled-components';
import * as colors from './Colors.style';

import { ShoppingCart } from '@styled-icons/feather/ShoppingCart';

export const SSidebar = styled.div`
  height: 100%;
  padding: 24px;
  border-right: 1px solid ${colors.colors.lightGray};
  position: relative;
`;

export const Layout = styled.div`
  display: flex;
`;

export const ProductContainer = styled.div`
  padding: 16px;
`;

export const Divider = styled.div`
  height: 1px;
  background-color: ${colors.colors.lightGray};
  width: 100%;
  margin: 24px 0;
  ${({ noSpace }) =>
    noSpace &&
    `
    margin:0
  `}
`;

export const LogoSBar = styled.div`
  width: 60px;

  img {
    max-width: 100%;
    height: auto;
  }
  cursor: pointer;

  margin-bottom: 24px;
`;

export const IconContainer = styled.div`
  img {
    width: 20px;
    height: 20px;
    margin-left: 10px;
  }
  span {
    font-size: 15px;
    margin-left: 10px;
  }
  cursor: pointer;
  color: ${colors.colors.inputGray};
`;

export const IconContainerCart = styled.div`
  position: relative;
  span {
    font-size: 15px;
    margin-left: 10px;
  }
  cursor: pointer;
  color: ${colors.colors.inputGray};
`;

export const IconCartSB = styled(ShoppingCart)`
  width: 25px;
  height: 25px;
  margin-left: 15px;
  cursor: pointer;
`;

export const TextSBIcon = styled.span`
  font-weight: 100;
  font-size: 20px;
  @media (min-width: 1024px) and (max-width: 1440px) {
    margin-left: 0.5em;
  }
  @media (min-width: 1540px) and (max-width: 2560px) {
    margin-left: -1em;
  }
`;

export const IconSBQuantity = styled.div`
  width: 100%;
  background-color: ${colors.colors.hoverInput};
  transform: translate(0%, 100%);
  cursor: pointer;
  border-radius: 5px;
  color: white;
  text-align: center;
`;

export const IconSBSubQuantity = styled.sub`
  position: absolute;
  top: 0;
  transform: translate(-50%, 10%);
  color: #fff;
  width: 6px;
  min-width: 6px;
  height: 6px;
  text-align: center;
  background: #ff4d4f;
  border-radius: 10px;
  box-shadow: 0 0 0 1px #fff;
`;

export const IconSubQuantitySB = styled.sub`
  position: absolute;
  top: 0;
  transform: translate(0%, -80%);
  padding: 0 6px;
  color: #fff;
  line-height: 10px;
  text-align: center;
  background: #ff4d4f;
  border-radius: 10px;
  box-shadow: 0 0 0 1px #fff;
`;

export const SLinkContainer = styled.div`
  background: ${({ isActive }) => !isActive && `transparent`};
  border-radius: 10px;
  text-decoration: none;
  margin: 8px 0;

  &:hover {
    border: 1px solid ${colors.colors.lightGray};
  }
`;

export const SSearch = styled.div`
  border: 1px solid white;
  width: 100%;

  input {
    padding: 7px 8px;
    font-family: inherit;
    letter-spacing: inherit;
    font-size: 13px;
    width: 100%;
    outline: none;
    border: none;
    color: inherit;
  }
`;

export const SSearchIcon = styled.i`
  padding: 14px 16px;
  border: 1px solid ${colors.colors.lightGray};
  border-radius: 10px;
  display: flex;
  cursor: pointer;
  background-color: white;
  img {
    font-size: 20px;
    color: ${colors.colors.lightGray};
  }
`;

export const SLink = styled.div`
  display: flex;
  align-items: center;
  text-decoration: none;
  color: inherit;
  font-size: 16px;
  padding: 6px 0;
`;

export const SLinkIcon = styled.div`
  padding: 8px 16px;
  display: flex;
  width: 100%;

  img {
    width: 30px;
  }
`;

export const SLinkLabel = styled.span`
  display: block;
  flex: 1;
  margin-left: 8px;
  font-size: 14px;
  color: ${colors.colors.inputGray};
`;

export const SidebarButton = styled.button`
  position: absolute;
  top: 48px;
  right: ${({ isOpen }) => (isOpen ? `-16px` : `-15px`)};
  width: 32px;
  height: 32px;
  background-color: white;
  border: 1px solid ${colors.colors.hoverInput};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  transform: ${({ isOpen }) => (!isOpen ? `rotate(180deg)` : `initial`)};
`;

export const SFooter = styled.div`
  padding: 7px 6px;

  p {
    font-size: 15px;
    font-family: 'Montserrat', sans-serif;
    text-align: center;
    color: black;
  }
`;
