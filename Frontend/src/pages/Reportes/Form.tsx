import { useNavigate, useParams } from 'react-router-dom';
import { Formik, Form as FormikForm } from 'formik';
import { Box, Text, VStack } from '@chakra-ui/react';
import { FiPlus } from 'react-icons/fi';
import * as Yup from 'yup';
import { useEffect, useMemo } from 'react';

import { Button, IconButton, Input, Select } from '../../ui';
import { ProductoReq, Routes } from '../../models';
import { useModal, useProvider } from '../../hooks';

import FormTipoProd from './FormTipoProd';

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

const Form: React.FC<{}> = () => {
  const { state, actions } = useProvider();
  const { idReporte } = useParams();
  const navigate = useNavigate();

  const [Modal, onOpen, onClose] = useModal();

  const reporte = useMemo(() => {
    if (idReporte) {
      return state.reportes.filter(
        (reporte) => reporte.id === Number(idReporte)
      )[0];
    }
  }, [idReporte]);

  useEffect(() => {
    if (!reporte && idReporte) navigate(`${Routes.REPORTES}`);
    actions.getTipoProducto();
  }, []);

  return (
    <>
      <Modal
        component={<FormTipoProd closeModal={onClose} />}
        title={'Crear Tipo de Producto'}
      />
      <Box color={'textAndIcons'} m={'auto'} maxW={'md'}>
        <Text
          fontSize={'4xl'}
          fontWeight={'bold'}
          my={'3rem'}
          textAlign={'center'}
        >
          {idReporte ? 'Editar' : 'Crear'} Producto
        </Text>
        <Formik
          initialValues={{
            idTipoProducto: reporte ? reporte.idTipoProducto : '',
            nombre: reporte ? reporte.nombre : '',
            precio: reporte ? reporte.precio : '',
            cantidad: reporte ? reporte.cantidad : '',
          }}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            const producto: ProductoReq = {
              producto: {
                idTipoProducto: Number(values.idTipoProducto),
                precio: Number(values.precio),
                nombre: values.nombre,
              },
              stock: {
                cantidad: Number(values.cantidad),
              },
            };

            if (idReporte) {
              producto.producto.id = reporte?.id;
              producto.stock.id = reporte?.idStock;
            }

            if (!idReporte) {
              actions.createProducto(producto);
            } else {
              actions.editProducto(producto);
            }

            navigate(`${Routes.REPORTES}`);
          }}
        >
          {({ errors, touched }) => (
            <FormikForm>
              <VStack spacing={6}>
                <Box w={'100%'}>
                  <Box display={'flex'}>
                    <Select
                      error={
                        (errors['idTipoProducto'] &&
                          touched['idTipoProducto']) as boolean
                      }
                      label={'Tipo de Producto'}
                      name={'idTipoProducto'}
                      options={state.tipoProducto}
                    />
                    <IconButton
                      alignSelf={'end'}
                      aria-label="edit-tipoproducto"
                      icon={<FiPlus />}
                      ml={'1rem'}
                      onClick={() => onOpen()}
                    />
                  </Box>
                  {errors['idTipoProducto'] && (
                    <Text color={'red.500'} fontSize={'sm'} mt={'0.3rem'}>
                      {errors['idTipoProducto']}
                    </Text>
                  )}
                </Box>
                <Input
                  error={(errors['nombre'] && touched['nombre']) as boolean}
                  label={'Nombre'}
                  msg={errors['nombre'] as string}
                  name={'nombre'}
                />
                <Input
                  error={(errors['precio'] && touched['precio']) as boolean}
                  label={'Precio'}
                  msg={errors['precio'] as string}
                  name={'precio'}
                />
                <Input
                  error={(errors['cantidad'] && touched['cantidad']) as boolean}
                  label={'Stock'}
                  msg={errors['cantidad'] as string}
                  name={'cantidad'}
                />
                <Button
                  text={idReporte ? 'Editar' : 'Crear'}
                  type={'submit'}
                  w={'100%'}
                />
              </VStack>
            </FormikForm>
          )}
        </Formik>
      </Box>
    </>
  );
};

export default Form;
