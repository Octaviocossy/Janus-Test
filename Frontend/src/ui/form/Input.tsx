import { Field, FieldProps } from 'formik';
import {
  Input as ChakraInput,
  FormControl,
  FormLabel,
  FormErrorMessage,
  InputProps,
} from '@chakra-ui/react';

interface Props extends InputProps {
  label: string;
  name: string;
  error: boolean;
  msg: string;
}

const Input: React.FC<Props> = ({ msg, error, label, name, ...rest }) => {
  return (
    <Field name={name}>
      {({ field }: FieldProps) => {
        return (
          <FormControl isInvalid={error}>
            <FormLabel htmlFor={name}>{label}</FormLabel>
            <ChakraInput autoComplete={'off'} id={name} {...rest} {...field} />
            <FormErrorMessage>{msg}</FormErrorMessage>
          </FormControl>
        );
      }}
    </Field>
  );
};

export default Input;
