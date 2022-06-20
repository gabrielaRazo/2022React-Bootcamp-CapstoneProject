import styled from 'styled-components';
import * as colors from './Colors.style';

export const Card = styled.div`
  background-color: white;
  border-radius: 10px;
  text-align: center;
  height: 374px;
  position: relative;
  border: 1px solid ${colors.colors.hoverInput};
  -webkit-transition: margin 0.5s ease-out;
  -moz-transition: margin 0.5s ease-out;
  -o-transition: margin 0.5s ease-out;

  &:hover {
    cursor: pointer;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
    margin-top: 5px;
  }
`;

export const Img = styled.img`
  max-width: 100%;
  border-radius: 10px;

  ${({ products }) =>
    products &&
    `
    height: 210px;
  `}
  ${({ border }) =>
    border &&
    `
    border: 1px solid ${colors.colors.hoverInput};
  `}
  

  border-radius: 10px;
`;

export const Text = styled.p`
  margin-top: 0;
  text-align: center;
  font-weight: 300;
  ${({ top }) => top && `position: absolute;  top: 80%; `};
  color: ${colors.colors.titleBlue};
`;

export const TextImage = styled.p`
  position: absolute;
  background-color: ${colors.colors.subBlue};
  padding: 5px;
  color: white;
  top: 8px;
  right: 16px;
`;

export const ContainerImage = styled.div`
  position: relative;
  text-align: center;
`;

export const CardDashboard = styled.div`
  position: relative;
  border: 1px solid ${colors.colors.hoverInput};
  border-radius: 10px;
  padding: 10px;
  -webkit-transition: margin 0.5s ease-out;
  -moz-transition: margin 0.5s ease-out;
  -o-transition: margin 0.5s ease-out;

  &:hover {
    cursor: pointer;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
    margin-top: 5px;
  }

  @media (max-width: 480px) {
    height: 640px;
  }
  @media (min-width: 481px) and (max-width: 768px) {
    height: 370px;
  }
  @media (min-width: 769px) and (max-width: 1024px) {
    height: 450px;
  }
  @media (min-width: 1025px) and (max-width: 1440px) {
    height: 400px;
  }
  @media (min-width: 1441px) and (max-width: 2560px) {
    height: 700px;
  }
`;
