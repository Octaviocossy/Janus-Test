import { useParams } from 'react-router-dom';
import { Formik, Form as FormikForm } from 'formik';
import * as Yup from 'yup';

import { Input } from '../../ui';

const validationSchema = Yup.object({
  idTipoProducto: Yup.number().required('Campo requerido.'),
  nombre: Yup.string()
    .required('Campo requerido.')
    .max(40, 'Se aceptan máximo 40 caracteres.'),
  precio: Yup.number()
    .required('Campo requerido.')
    .typeError('Solo se aceptan valores numéricos.'),
  cantidad: Yup.number()
    .required('Campo requerido.')
    .typeError('Solo se aceptan valores numéricos.'),
});

const Form = () => {
  const { idReporte } = useParams();

  const initialState = {
    idTipoProducto: 0,
    nombre: '',
    precio: 0,
    cantidad: 0,
  };

  return (
    <Formik
      initialValues={initialState}
      validationSchema={validationSchema}
      onSubmit={(values) => console.log(values)}
    >
      {({ errors, touched }) => (
        <FormikForm>
          <Input
            error={(errors['nombre'] && touched['nombre']) as boolean}
            label={'Nombre'}
            msg={errors['nombre'] as string}
            name={'nombre'}
          />
        </FormikForm>
      )}
    </Formik>
  );
};

export default Form;
