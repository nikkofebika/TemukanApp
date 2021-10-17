import React, {useContext, useState} from 'react';
import Ionicon from 'react-native-vector-icons/Ionicons';
import {
  Box,
  Text,
  Heading,
  VStack,
  FormControl,
  Input,
  Link,
  Button,
  Icon,
  IconButton,
  HStack,
  useToast,
} from 'native-base';
import {AuthContext} from '../../context/auth/AuthContextProvider';

export default function SignIn({navigation}) {
  const {authContext} = useContext(AuthContext);
  const [loadingButton, setLoadingButton] = useState(false);
  const [email, setEmail] = useState({value: '', error: false});
  const [password, setPassword] = useState({value: '', error: false});
  const toast = useToast();
  const id = 'toast-id';

  const validate = () => {
    let rtn = true;
    if (email.value.length <= 0) {
      setEmail({...email, error: true});
      rtn = false;
    } else {
      setEmail({...email, error: false});
      rtn = true;
    }
    if (password.value.length <= 0) {
      setPassword({...password, error: true});
      rtn = false;
    } else {
      setPassword({...password, error: false});
      rtn = true;
    }
    return rtn;
  };

  const handleLogin = async () => {
    if (validate()) {
      setLoadingButton(true);
      let tryLogin = await authContext.signIn(email.value, password.value);
      console.log('res login', tryLogin);
      if (!tryLogin.success) {
        if (!toast.isActive(id)) {
          toast.show({
            id,
            title: 'Login gagal',
            status: 'warning',
            description: 'Kombinasi Username dan Password salah',
          });
        }
      }
      setLoadingButton(false);
    }
  };
  return (
    <Box safeArea flex={1} p={2} w="90%" mx="auto">
      <Heading size="lg" color="primary.500">
        Welcome
      </Heading>
      <Heading color="muted.400" size="xs">
        Sign in to continue!
      </Heading>
      <VStack space={2} mt={5}>
        <FormControl isInvalid={email.error}>
          <FormControl.Label
            _text={{color: 'muted.700', fontSize: 'sm', fontWeight: 600}}>
            Email ID
          </FormControl.Label>
          <Input
            onChangeText={e => setEmail({...email, value: e})}
            value={email.value}
          />
          {email.error && (
            <FormControl.ErrorMessage>
              Email wajib diisi!
            </FormControl.ErrorMessage>
          )}
        </FormControl>
        <FormControl mb={5} isInvalid={password.error}>
          <FormControl.Label
            _text={{color: 'muted.700', fontSize: 'sm', fontWeight: 600}}>
            Password
          </FormControl.Label>
          <Input
            type="password"
            onChangeText={e => setPassword({...password, value: e})}
            value={password.value}
          />
          {password.error && (
            <FormControl.ErrorMessage>
              Password wajib diisi!
            </FormControl.ErrorMessage>
          )}
          <Link
            _text={{fontSize: 'xs', fontWeight: '700', color: 'cyan.500'}}
            alignSelf="flex-end"
            mt={1}>
            Forget Password?
          </Link>
        </FormControl>
        <VStack space={2}>
          <Button
            isLoading={loadingButton}
            isLoadingText="Loading..."
            colorScheme="cyan"
            _text={{color: 'white'}}
            onPress={handleLogin}>
            Login
          </Button>
          <HStack justifyContent="center" alignItem="center">
            <IconButton
              variant="unstyled"
              startIcon={
                <Icon
                  as={<Ionicon name="logo-facebook" />}
                  color="muted.700"
                  size="sm"
                />
              }
            />
            <IconButton
              variant="unstyled"
              startIcon={
                <Icon
                  as={<Ionicon name="logo-google" />}
                  color="muted.700"
                  size="sm"
                />
              }
            />
            <IconButton
              variant="unstyled"
              startIcon={
                <Icon
                  as={<Ionicon name="logo-github" />}
                  color="muted.700"
                  size="sm"
                />
              }
            />
          </HStack>
        </VStack>
        <HStack justifyContent="center">
          <Text fontSize="sm" color="muted.700" fontWeight={400}>
            I'm a new user.{' '}
          </Text>
          <Link
            _text={{color: 'cyan.500', bold: true, fontSize: 'sm'}}
            onPress={() => navigation.navigate('SignUp')}>
            Sign Up
          </Link>
        </HStack>
      </VStack>
    </Box>
  );
}
