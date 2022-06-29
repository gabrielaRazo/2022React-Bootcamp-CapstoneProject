import styled, { keyframes } from 'styled-components';
import * as colors from './Colors.style';

export const HomeContainer = styled.div`
  padding-top: 80px;
  @media (min-width: 768px) and (max-width: 1024px) {
    padding-top: 100px;
  }
`;

function getWidthStrings(span) {
  if (!span) {
    return;
  }
  let flex = (span / 12) * 100;
  return `display: block; flex: ${flex}%; max-width: ${flex}%;`;
}

export const Row = styled.div`
  display: flex;
  flex-flow: row wrap;
  ${({ centered }) =>
    centered && `width: 100%; align-items: center; justify-content: center;`};
  &::after {
    content: '';
    clear: both;
    display: table;
  }
`;
const media = {
  xs: (styles) => `
    @media only screen and (max-width:480px){
        ${styles}
    }
    `,
  md: (styles) => `
    @media (min-width: 768px) and (max-width: 1023px){
        ${styles}
    }
    `,
  sm: (styles) => `
    @media (min-width: 481px) and (max-width: 768px){
        ${styles}
    }
    `,
  lg: (styles) => `
  @media (min-width: 1024px) and (max-width: 2570px) {
        ${styles}
    }
    `,
};

export const Col = styled.div`
  padding: 16px 0;
  ${({ spaced }) => spaced && `margin-left: 0.5em; margin-right: 0.5em`};

  @media (max-width: 480px) {
    ${({ xs }) => (xs ? getWidthStrings(xs) : 'width: 100%')};
  }
  @media (min-width: 481px) and (max-width: 768px) {
    ${({ sm }) => sm && getWidthStrings(sm)};
  }
  @media (min-width: 768px) and (max-width: 1023px) {
    ${({ md }) => md && getWidthStrings(md)};
  }
  @media (min-width: 1024px) and (max-width: 2570px) {
    ${({ lg }) => lg && getWidthStrings(lg)};
  }
  ${(props) => props.collapse && media[props.collapse](`display:none;`)};
`;

export const TopSpace = styled.div`
  margin-top: 2em;
  ${({ spaceHeader }) => spaceHeader && `margin-top:4.5em`};
  ${({ extra }) => extra && `margin-top:5em`};
`;

export const ContainerCenter = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const SectionTitle = styled.h1`
  text-align: center;
  font-weight: 200;
  color: ${colors.colors.titleBlue};
`;

export const Button = styled.button`
  border-radius: 10px;
  background-color: ${colors.colors.subBlue};
  border: 1px solid ${colors.colors.hoverInput};
  color: white;
  font-size: 14px;
  font-family: 'Montserrat', sans-serif;
  padding: 10px;
  ${({ bottom }) =>
    bottom && `position: absolute; bottom: 0; margin-bottom:10px;`};

  cursor: pointer;

  &:hover {
    background-color: ${colors.colors.hoverSubBlue};
    border: 1px solid ${colors.colors.hoverSubBlue};
  }
`;

export const ContainerSpinner = styled.div`
  position: relative;

  ${({ active }) =>
    active &&
    `
    background-color: '0xFF0E3311'; opacity: 0.5; min-height: 100vh;
  `}
`;

export const Spinner = styled.svg`
  position: absolute;
  top: 15%;
  left: 40%;
  animation: rotate 2s linear infinite;
  width: 50px;
  height: 50px;

  & .path {
    stroke: ${colors.colors.subBlue};
    stroke-linecap: round;
    animation: dash 1.5s ease-in-out infinite;
  }

  @keyframes rotate {
    100% {
      transform: rotate(360deg);
    }
  }
  @keyframes dash {
    0% {
      stroke-dasharray: 1, 150;
      stroke-dashoffset: 0;
    }
    50% {
      stroke-dasharray: 90, 150;
      stroke-dashoffset: -35;
    }
    100% {
      stroke-dasharray: 90, 150;
      stroke-dashoffset: -124;
    }
  }
  ${({ active }) =>
    !active &&
    `
    display: none;
  `}
`;

export const TextCentered = styled.p`
  text-align: center;
`;

export const Img = styled.img`
  width: 100%;
  ${({ clickable }) => clickable && `cursor: pointer`};
`;

export const PaginationContainer = styled.div`
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  color: #000000d9;
  font-size: 14px;
  font-variant: tabular-nums;
  line-height: 1.5715;
  list-style: none;
  font-feature-settings: 'tnum';
  img {
    height: 24px;
    line-height: 24px;
    vertical-align: top;
    cursor: pointer;
  }
  p {
    box-sizing: border-box;
    height: 100%;
    margin-right: 8px;
    padding: 0 6px;
    text-align: center;
    background-color: #fff;
    border: 1px solid #d9d9d9;
    border-radius: 2px;
    outline: none;
  }
  span {
    margin: 0 10px 0 5px;
  }
`;
