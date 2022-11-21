import { Field, FieldProps } from 'formik';
import {
  Select as ChakraSelect,
  FormControl,
  FormLabel,
  FormErrorMessage,
  SelectProps,
} from '@chakra-ui/react';

interface Props extends SelectProps {
  label: string;
  name: string;
  error: boolean;
  msg?: string;
  options: {
    name: string;
    id: number;
  }[];
}

const Select: React.FC<Props> = ({
  options,
  msg,
  error,
  label,
  name,
  ...rest
}) => {
  return (
    <Field name={name}>
      {({ field }: FieldProps) => {
        return (
          <FormControl isInvalid={error}>
            <FormLabel htmlFor={name}>{label}</FormLabel>
            <ChakraSelect id={name} {...rest} {...field}>
              <option value={''}>----</option>
              {options.map((option) => (
                <option key={option.name} value={option.id}>
                  {option.name}
                </option>
              ))}
            </ChakraSelect>
            {msg && <FormErrorMessage>{msg}</FormErrorMessage>}
          </FormControl>
        );
      }}
    </Field>
  );
};

export default Select;
