import TextField from "@mui/material/TextField";
import { Controller } from "react-hook-form";


interface ControllerData {
  control: any,
  name:string,
  rules: any,
  errors: any,
  label: string,
  type: string
}

// generic component that combine the use of mui input & react hook forms

const ControlledTextField = ({
  control,
  name,
  rules,
  errors,
  label,
  type
}: ControllerData) => {
  return (
    <Controller
      render={({ field }) => (
        <TextField
          {...field}
          variant="outlined"
          type={type}
          label={rules.required ? label + "*" : label}
          error={errors[name]?.message ? true : false}
          helperText={errors[name]?.message}
          sx={{my: 2 , mx: 3 }}
        />
      )}
      control={control}
      rules={rules}
      name={name}
    />
  );
};

export default ControlledTextField;
