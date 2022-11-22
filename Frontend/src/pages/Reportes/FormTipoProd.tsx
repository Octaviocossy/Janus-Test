import { Box } from '@chakra-ui/react';
import { Formik, Form as FormikForm } from 'formik';
import * as Yup from 'yup';

import { useProvider } from '../../hooks';
import { Button, Input } from '../../ui';

interface Props {
  closeModal: () => void;
}

const validationSchema = Yup.object({
  descripcion: Yup.string().required('Campo requerido.'),
});

const FormTipoProd: React.FC<Props> = ({ closeModal }) => {
  const { actions } = useProvider();

  return (
    <Formik
      initialValues={{ descripcion: '' }}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        actions.createTipoProducto({ descripcion: values.descripcion });
        closeModal();
      }}
    >
      {({ errors, touched }) => (
        <FormikForm>
          <Box display={'flex'} flexDirection={'column'}>
            <Input
              error={
                (errors['descripcion'] && touched['descripcion']) as boolean
              }
              label={'Descripción'}
              msg={errors['descripcion'] as string}
              name={'descripcion'}
            />
            <Button mt={'1rem'} text={'Crear'} type={'submit'} />
          </Box>
        </FormikForm>
      )}
    </Formik>
  );
};

export default FormTipoProd;
