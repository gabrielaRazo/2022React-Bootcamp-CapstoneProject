import styled from 'styled-components';
import * as colors from './Colors.style';

export const Card = styled.div`
  background-color: white;
  border-radius: 10px;
  text-align: center;
  height: 354px;
  position: relative;
`;

export const Img = styled.img`
  max-width: 100%;
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
  ${({ top }) => top && `position: absolute;  top: 83%; `};
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
