// TextFieldComponent.js
import React from 'react';
import { TextField } from '@mui/material';

const TextFieldComponent = ({ label, value, onChange }) => {
  return (
    <TextField
      label={label}
      fullWidth
      margin="dense"
      value={value}
      onChange={onChange}
    />
  );
};

export default TextFieldComponent;
