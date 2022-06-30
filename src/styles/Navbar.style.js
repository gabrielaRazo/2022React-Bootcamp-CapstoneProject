import styled from 'styled-components';
import { ShoppingCart } from '@styled-icons/feather/ShoppingCart';
import * as colors from './Colors.style';

export const NavbarContainer = styled.nav`
  width: 100%;
  top: 0;
  position: fixed;
  clear: both;
  z-index: 9999;
  background-color: ${colors.colors.white};
  min-width: 100%;
  box-shadow: inset -1px -1px 1px rgba(72, 83, 37, 0.2),
    1px 1px 3px rgba(72, 83, 37, 0.2);
  display: grid;
  @media (min-width: 768px) and (max-width: 1024px) {
    height: 100px;
  }
  @media (max-width: 480px) {
    height: 80px;
  }
`;

export const NavbarInnerContainer = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 3fr 1fr;
  @media (max-width: 480px) {
    grid-template-columns: 1fr 2fr 1fr;
  }
`;

export const ContainerCol1 = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const ContainerCol2 = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  @media (max-width: 480px) {
    align-items: flex-start;
  }
  @media (min-width: 768px) and (max-width: 1024px) {
    align-items: flex-start;
  }
`;

export const ContainerCol3 = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  margin-right: 20px;
  justify-content: center;
`;

export const Logo = styled.img`
  width: 80%;
  @media (max-width: 480px) {
    display: none;
  }
  @media (min-width: 480px) and (max-width: 768px) {
    width: 100%;
  }
  @media (min-width: 768px) and (max-width: 1024px) {
    width: 100%;
  }
`;

export const LogoResp = styled.img`
  @media (min-width: 480px) {
    display: none;
  }
  width: 80%;
`;

export const SearchInput = styled.input`
  width: 100%;
  display: flex;
  border: 1px solid ${colors.colors.hoverInput};
  color: ${colors.colors.inputGray};
  border-radius: 20px;
  padding: 10px 40px 10px 20px;
  font-family: 'Montserrat', sans-serif;
  font-weight: 400;
  background-color: ${colors.colors.white};
  opacity: 0.5;

  &:focus {
    border: 1px solid ${colors.colors.hoverSubBlue};
  }
`;

export const StyledInput = styled.div`
  position: relative;
`;

export const SearchBtn = styled.div`
  position: absolute;
  right: -3em;
  cursor: pointer;

  top: 5px;
  img {
    color: ${colors.colors.inputGray};
    width: 25px;
  }
`;

export const IconCart = styled(ShoppingCart)`
  width: 25px;
  height: 25px;
  opacity: 0.5;
  float: right;
  margin-right: 5px;

  &:focus {
    visibility: hidden;
  }
  &:hover {
    cursor: not-allowed;
  }
`;

export const IconContainer = styled.div`
  width: 25px;
  height: 25px;
  position: relative;
  margin-left: 5em;
`;

export const IconSubQuantity = styled.sub`
  position: absolute;
  top: 0;
  transform: translate(50%, -50%);
  padding: 0 6px;
  color: #fff;
  font-size: 12px;
  line-height: 20px;
  text-align: center;
  background: #ff4d4f;
  border-radius: 10px;
  box-shadow: 0 0 0 1px #fff;
`;
