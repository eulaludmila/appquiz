import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const ButtonBase = styled.button`
  color: #fff;
  width: 100%;
  height: 48px;
  background: ${({ theme }) => { return theme.colors.secondary; }};
  border-radius: 4px;
  font-weight: 700;
  font-family: Lato;
  border:none;
  cursor: pointer;
  text-transform: uppercase;
`;

const Button = (props) => {
  return (
    <>
      <ButtonBase type={props.type} disabled={props.disabled}>{props.children}</ButtonBase>
    </>
  );
};

Button.propTypes = {
  props: PropTypes.array
};

export default Button;
