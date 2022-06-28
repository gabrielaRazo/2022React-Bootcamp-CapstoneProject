import styled from 'styled-components';
import * as colors from './Colors.style';

export const CartContainer = styled.div`
  min-height: 100vh;
  margin: 20px;
  font-family: Montserrat;
`;

export const TopSpace = styled.div`
  margin-top: 8em;
  @media (min-width: 2500px) {
    margin-top: 13em;
  }
`;

export const ContainerIcon = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
  cursor: pointer;
`;

export const IconDeleteCart = styled.img`
  display: block;
  width: 25px;
  height: 25px;
  margin: auto;
`;

export const CartTitle = styled.h1`
  font-size: 2.7rem;
  font-weight: 100;
  text-align: left;
  font-family: 'Playfair Display', serif;
  margin-bottom: 1em;
  @media (min-width: 320px) and (max-width: 425px) {
    text-align: center;
  }
`;

export const CartTextTable = styled.p`
  text-align: center;
  font-size: 17px;
  font-weight: 400;
  margin: 0;
`;

export const CartTextTableLeft = styled.p`
  text-align: left;
  font-size: 16px;
  font-weight: 400;
`;

export const CartSpaceTable = styled.div`
  margin: -0.1px;
`;

export const ContainerFloatRight = styled.div`
  margin-left: 33.33333333%;
  width: 100%;
`;

export const CartTextRight = styled.span`
  text-align: right;
`;

export const CartTextLeft = styled.span`
  text-align: left;
  font-weight: 200;
`;

export const CartTextQuantity = styled.p`
  text-align: left;
  font-size: 16px;
  font-weight: 200;
  @media (min-width: 320px) and (max-width: 425px) {
    text-align: center;
  }
`;

export const CartBoldText = styled.span`
  font-family: 'Playfair Display', serif;
  font-weight: bold;
`;

export const CartButton = styled.button`
  width: 100%;
  border-radius: 10px;
  height: 40px;
  color: white;
  font-family: Montserrat;
  font-size: 16px;
  font-weight: 100;
  cursor: pointer;
  background-color: ${colors.colors.footerBlue};
  border: 1px solid ${colors.colors.footerBlue};
  ${({ space }) => space && `margin-top:2em`};
`;

export const CartTextCenter = styled.p`
  text-align: center;
  margin-top: 2em;
  font-size: 18px;
  font-weight: 200;
`;

export const CartIcon = styled.img`
  display: block;
  width: 100px;
  height: 100px;
  margin: auto;
`;

export const CardContainerTable = styled.div`
  border: 1px solid ${colors.colors.lightGray};
  padding: 5px;
`;

export const CardRowTable = styled.div`
  height: 1px;
  background-color: ${colors.colors.lightGray};
  width: 100%;
  margin: 0;
`;

export const TextResponsive = styled.span`
  text-align: center;
  margin-top: 2em;
  font-size: 14px;
  font-weight: 200;
  padding: 10px;
`;

export const ContainerLargeScreens = styled.div`
  @media (min-width: 320px) and (max-width: 425px) {
    display: none;
  }
`;

export const ContainerResponsive = styled.div`
  @media (min-width: 768px) and (max-width: 2570px) {
    display: none;
  }
`;
