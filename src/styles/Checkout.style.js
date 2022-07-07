import styled from 'styled-components';
import * as colors from './Colors.style';

export const CheckoutContainer = styled.div`
  min-height: 100vh;
  margin: 20px;
  font-family: Montserrat;
`;

export const CheckoutSpaceTop = styled.div`
  @media (min-width: 2000px) and (max-width: 2570px) {
    margin-top: 10em;
  }
  margin-top: 5em;
`;

export const CheckoutInput = styled.input`
  box-sizing: border-box;
  margin: 0;
  font-family: Montserrat;
  list-style: none;
  position: relative;
  display: inline-block;
  width: 100%;
  font-weight: 200;
  min-width: 0;
  padding: 4px 11px;

  font-size: 14px;
  line-height: 1.5715;
  background-color: white;
  background-image: none;
  border: 1px solid ${colors.colors.hoverInput};
  border-radius: 7px;
  transition: all 0.3s;
`;

export const CheckoutTextArea = styled.textarea`
  box-sizing: border-box;
  margin: 0;
  font-family: Montserrat;
  list-style: none;
  position: relative;
  display: inline-block;
  width: 100%;
  font-weight: 200;
  min-width: 0;
  padding: 4px 11px;

  font-size: 14px;
  line-height: 1.5715;
  background-color: white;
  background-image: none;
  border: 1px solid ${colors.colors.hoverInput};
  border-radius: 7px;
  transition: all 0.3s;
`;

export const CheckoutLabel = styled.label`
  span {
    display: inline-block;
    margin-right: 4px;
    color: ${(props) => (props.required === true ? '#ff4d4f ' : 'white')};
    font-size: 14px;
    font-family: SimSun, sans-serif;
    line-height: 1;
  }
`;

export const ErrorTextMessage = styled.span`
  display: inline-block;
  margin-right: 4px;
  color: #ff4d4f;
  font-size: 10px;
`;

export const CheckoutSBtn = styled.input`
  width: 100%;
  height: 30px;
  border: 1px solid ${colors.colors.subBlue};
  color: white;
  font-size: 15px;
  font-weight: 200;
  border-radius: 5px;
  cursor: pointer;
  background-color: ${colors.colors.subBlue};
  font-family: 'Montserrat', sans-serif;
  @media (min-width: 1441px) and (max-width: 2560px) {
    font-size: 28px;
    height: 40px;
  }
  ${({ disabled }) =>
    disabled &&
    `color: #00000040;
    border-color: #d9d9d9;
    background: #f5f5f5;
    text-shadow: none;
    box-shadow: none;
    cursor: not-allowed;
  `}
`;

//Table
export const ContainerTable = styled.div`
  margin: 20px;
  padding: 10px;
  background-color: ${colors.colors.tableCardBlue};
  font-family: Montserrat;
  display: flex;
  flex-flow: row wrap;
  border-radius: 5px;
`;

export const CheckoutButtonTable = styled.button`
  font-weight: 100;
  color: ${colors.colors.inputGray};
  width: 100%;
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  justify-content: center;
  background-color: transparent;
  border: 1px solid transparent;
  ${({ color }) =>
    color &&
    `color: #00000040;
    border-color: #d9d9d9;
    background: #f5f5f5;
    text-shadow: none;
    box-shadow: none;
    cursor: not-allowed;
  `}
  cursor: pointer;
  span {
    font-size: 16px;
    font-weight: 300;
    font-family: Montserrat;
  }
  img {
    margin: 0 0 0 10px;
    width: 16px;
  }

  &:hover {
    border: 1px solid ${colors.colors.inputGray};
    border-radius: 8px;
    height: 30px;
  }
`;

export const PaymentButtonTable = styled.button`
  font-weight: 100;
  width: 100%;
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  justify-content: center;
  background-color: ${colors.colors.subBlue};
  border: 1px solid ${colors.colors.subBlue};
  color: white;
  font-size: 16px;
  height: 30px;
  border-radius: 7px;
  font-family: Montserrat;
  cursor: pointer;
  @media (min-width: 320px) and (max-width: 425px) {
    height: 50px;
  }
`;

export const TextSubTitleTable = styled.h1`
  padding-left: 10px;
  margin: 0;
  font-weight: 100;
  text-align: center;
  font-size: 1rem;
  font-family: Montserrat;
`;

export const TitleTable = styled.span`
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  justify-content: center;
  text-align: center;
  font-weight: 100;
  font-size: 1.7rem;
  font-family: Montserrat;

  span {
    font-size: 15px;
    margin-left: 1em;
    font-weight: 200;
  }
`;

export const Container = styled.span`
  margin-top: 2em;
  margin-bottom: 1em;
`;
