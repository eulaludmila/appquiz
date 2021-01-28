import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const InputBase = styled.input`
  border-radius: ${({ theme }) => { return theme.borderRadius; }};
  width: 100%;
  height: 48px;
  border: solid 1px #fff;
  padding: 5% 15px;
  margin-bottom: 25px;
  background-color: transparent;
  color: ${({ theme }) => { return theme.colors.contrastText; }};
  font-size:14px;

  &::placeholder{
    color: ${({ theme }) => { return theme.colors.contrastText; }};
  }

  &:focus{
    outline:0;
  }
`;

export default function Input({
  placeholder,
  value,
  onChange,
  name,
}) {
  return (
    <div>
      <InputBase placeholder={placeholder} value={value} onChange={onChange} name={name} />
    </div>
  );
}

// Input.defaultProps = {
//   value: '',

// }

Input.propTypes = {
  placeholder: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};
