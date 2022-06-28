import styled from 'styled-components';
import * as colors from './Colors.style';

export const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
  font-family: 'Montserrat', sans-serif;
  color: #202020;
  @media (min-width: 1441px) and (max-width: 2560px) {
    font-size: 38px;
  }
`;

export const ProductContainer = styled.div`
  margin: 30px;
  color: #202020;
`;

export const ProductImg = styled.img`
  width: 100%;
  margin-top: -1em;
`;

export const ProductText = styled.div`
  margin-top: 1em;
  ${({ price }) =>
    price &&
    `
    font-weight: 400;font-size: 20px;
    @media (min-width: 1441px) and (max-width: 2560px) { font-size: 34px}
  `}
  ${({ sku }) =>
    sku &&
    `
    color:#838282; font-size: 14px;
    @media (min-width: 1441px) and (max-width: 2560px) { font-size: 20px}
  `}
  ${({ specs }) =>
    specs &&
    `
    color:${colors.colors.productsText}; font-size: 14px;
    @media (min-width: 1441px) and (max-width: 2560px) { font-size: 24px}
  `}

  ${({ description }) =>
    description &&
    `
    font-weight: 300;font-size: 14px; text-align: justify; color:${colors.colors.productsText};  
    @media (min-width: 1441px) and (max-width: 2560px) { font-size: 28px}
  `}

  span {
    background-color: ${colors.colors.hoverLightGray};
    padding: 5px;
    color: white;
    margin-left: 1em;
    font-size: 16px;
    border-radius: 4px;
  }
`;

export const ProductTags = styled.p`
  margin-top: 1em;
  color: ${colors.colors.productsText};
  @media (min-width: 1441px) and (max-width: 2560px) {
    font-size: 24px;
  }
  font-size: 14px;
  span {
    background-color: ${colors.colors.subBlue};
    padding: 5px;
    color: white;
    margin-left: 7px;
    border-radius: 4px;
  }
`;

export const CartContainer = styled.div`
  width: 100%;
`;

export const SpaceTop = styled.div`
  @media (max-width: 480px) {
    margin-top: 3.5em;
  }
  @media (min-width: 481px) and (max-width: 768px) {
    margin-top: 6em;
  }
  @media (min-width: 769px) and (max-width: 1024px) {
    margin-top: 6em;
  }
  @media (min-width: 1025px) and (max-width: 1440px) {
    margin-top: 7em;
  }
  @media (min-width: 1441px) and (max-width: 2560px) {
    margin-top: 11em;
  }
`;

export const Button = styled.button`
  margin-left: 1.5em;
  width: 100%;
  height: 30px;
  border: 1px solid ${colors.colors.subBlue};
  color: white;
  font-size: 15px;
  font-weight: 400;
  border-radius: 5px;
  background-color: ${colors.colors.subBlue};
  font-family: 'Montserrat', sans-serif;
  @media (min-width: 1441px) and (max-width: 2560px) {
    font-size: 28px;
    height: 40px;
  }
  cursor: pointer;
`;

export const InputIconUp = styled.div`
  img {
    width: 11px;
    margin: 4px 0 0 -5px;
    cursor: pointer;
  }
`;

export const InputIconDown = styled.div`
  img {
    width: 11px;
    margin: 4px 0 0 -5px;
    cursor: pointer;
  }
`;

export const InputText = styled.span`
  font-size: 16px;
  padding-left: 10px;
  position: absolute;
  color: ${colors.colors.productsText};
  top: 7px;
  @media (min-width: 1441px) and (max-width: 2560px) {
    font-size: 25px;
  }
`;

export const InputContainer = styled.div`
  height: 30px;
  border: 2px solid #aaa;
  border-radius: 5px;
  transition: 0.3s;
  position: relative;
  @media (min-width: 1441px) and (max-width: 2560px) {
    height: 40px;
  }
`;

export const IconsContainer = styled.div`
  margin-top: -1.2em;
`;

export const TextInfo = styled.span`
  color: red;
  font-size: 10px;
  text-align: center;
  margin: -1em;
  font-weight: 300;
  @media (min-width: 425px) and (max-width: 1020px) {
    padding-left: 10px;
    margin-top: -1.5em;
  }
  @media (min-width: 2200px) and (max-width: 2560px) {
    margin: 0;
  }
  @media (min-width: 320px) and (max-width: 420px) {
    margin-top: -1.5em;
  }
`;
