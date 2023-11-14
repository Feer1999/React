import styled from 'styled-components';

export const Container = styled.div`
  max-width: 400px;
  margin: 50px auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

export const Input = styled.input`
  margin-bottom: 10px;
  padding: 10px;
  width: 100%;
  box-sizing: border-box;
`;

export const Button = styled.button`
  padding: 10px;
  background-color: #4caf50;
  color: #fff;
  border: none;
  cursor: pointer;
  width: 100%;
`;

export const Result = styled.div`
  margin-top: 20px;
`;

export const ResultItem = styled.p`
  margin-bottom: 8px;
`;

export const ErrorMessage = styled.p`
  color: #ff0000;
  font-weight: bold;
`;
