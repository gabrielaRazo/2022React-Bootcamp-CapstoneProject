import styled, { keyframes } from 'styled-components';
import * as colors from './Colors.style';

export const SearchContainer = styled.div`
  min-height: 100vh;
  padding: 2em;
`;
export const SearchSpace = styled.div`
  margin-top: 6em;
  @media (min-width: 1441px) and (max-width: 2560px) {
    margin-top: 10em;
  }
`;

export const SearchText = styled.h1`
  text-align: center;
  font-size: 30px;
  font-weight: 200;
  @media (min-width: 1024px) and (max-width: 1439px) {
    font-size: 40px;
  }
  @media (min-width: 1440px) and (max-width: 2560px) {
    font-size: 57px;
  }
`;

export const ImgNoFound = styled.img`
  width: 100%;
  align-self: flex-start;
`;

export const ContainerCenter = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;
