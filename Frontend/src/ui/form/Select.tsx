import { Field, FieldProps } from 'formik';
import {
  Select as ChakraSelect,
  FormControl,
  FormLabel,
  FormErrorMessage,
  SelectProps,
} from '@chakra-ui/react';

import { TipoProducto } from '../../models';

interface Props extends SelectProps {
  label: string;
  name: string;
  error: boolean;
  msg?: string;
  options: TipoProducto[];
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
                <option key={option.descripcion} value={option.id}>
                  {option.descripcion}
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
