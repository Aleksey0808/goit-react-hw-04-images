import styled from '@emotion/styled';
import { Form, Field, ErrorMessage } from 'formik';

export const Forma = styled(Form)`
  top: 0;
  left: 0;
  position: sticky;
  z-index: 1100;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 64px;
  padding-right: 24px;
  padding-left: 24px;
  padding-top: 12px;
  padding-bottom: 12px;
  color: #fff;
  background-color: #3f51b5;
  box-shadow: 0px 2px 4px -1px rgba(0, 0, 0, 0.2),
    0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12);
`;

export const Label = styled.label`
  display: flex;
  align-items: center;
  max-width: 600px;
  width: 100%;
`;

export const Input = styled(Field)`
  width: 100%;
  height: 30px;
  background-color: #fff;
  border-radius: 3px;
  overflow: hidden;
`;

export const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 35px;
  height: 35px;
  border: 1px solid black;
  border-radius: 5px;
  opacity: 0.6;
  transition: opacity 250ms cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
  outline: none;
  &:hover {
    opacity: 1;
  }
`;

export const ErrorText = styled(ErrorMessage)`
  color: red;
  width: 200px;
`;

export const Text = styled.p`
  margin-left: 5px;
`;
