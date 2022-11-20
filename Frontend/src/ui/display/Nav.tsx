import {
  Box,
  Drawer,
  DrawerBody,
  DrawerContent,
  HStack,
  IconButton,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { useLocation } from 'react-router-dom';
import { FiMenu } from 'react-icons/fi';

import { Link } from '../actions';

const MenuItems = [
  { name: 'Home', url: '/' },
  { name: 'Reportes', url: '/reportes' },
];

const Nav = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const location = useLocation();

  return (
    <Box borderBottom={'1px'} borderColor={'borderColor'}>
      <Box
        alignItems={'center'}
        color={'textAndIcons'}
        display={'flex'}
        m={'auto'}
        maxW={'6xl'}
        p={'1rem'}
      >
        <Text flex={1} fontSize={'3xl'} fontWeight={'bold'}>
          Janus Challenge
        </Text>
        <HStack display={{ base: 'none', sm: 'flex' }} spacing={'5'}>
          {MenuItems.map((item, i) => (
            <Link
              key={i}
              fontSize={'1.1rem'}
              fontWeight={'semibold'}
              text={item.name}
              textDecoration={
                location.pathname === item.url ? 'underline' : 'none'
              }
              to={item.url}
            />
          ))}
        </HStack>
        <Box display={{ base: 'flex', sm: 'none' }}>
          <IconButton
            aria-label="Hamburger-Button"
            icon={<FiMenu />}
            onClick={onOpen}
          />
        </Box>
        <Drawer isOpen={isOpen} placement={'top'} onClose={onClose}>
          <DrawerContent>
            <DrawerBody>
              {MenuItems.map((item, i) => (
                <Link
                  key={i}
                  fontSize={'1.1rem'}
                  fontWeight={'semibold'}
                  py={'1rem'}
                  text={item.name}
                  textDecoration={
                    location.pathname === item.url ? 'underline' : 'none'
                  }
                  to={item.url}
                  onClick={onClose}
                />
              ))}
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      </Box>
    </Box>
  );
};

export default Nav;
