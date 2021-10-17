import React, {useContext, useState} from 'react';
import Ionicon from 'react-native-vector-icons/Ionicons';
import {
  Box,
  Heading,
  VStack,
  FormControl,
  Input,
  Button,
  Icon,
  IconButton,
  HStack,
  useToast,
} from 'native-base';
import {AuthContext} from '../../context/auth/AuthContextProvider';

export default function SignUp() {
  const {authContext} = useContext(AuthContext);
  const [name, setName] = useState({value: '', error: false});
  const [email, setEmail] = useState({value: '', error: false});
  const [password, setPassword] = useState({value: '', error: false});
  const [repassword, setRepassword] = useState({
    value: '',
    error: false,
    msg: '',
  });
  const [loadingButton, setLoadingButton] = useState(false);
  const toast = useToast();
  const id = 'toast-id';

  const validate = () => {
    let rtn = true;
    if (name.value.length <= 0) {
      setName({...name, error: true});
      rtn = false;
    } else {
      setName({...name, error: false});
      rtn = true;
    }

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

    if (repassword.value.length <= 0) {
      setRepassword({
        ...repassword,
        error: true,
        msg: 'Konfirmasi password wajib diisi!',
      });
      rtn = false;
    } else if (repassword.value != password.value) {
      setRepassword({
        ...repassword,
        error: true,
        msg: 'Konfirmasi password tidak cocok!',
      });
      rtn = false;
    } else {
      setRepassword({...repassword, error: false});
      rtn = true;
    }
    return rtn;
  };

  const handleSubmit = async () => {
    if (validate()) {
      setLoadingButton(true);
      let signup = await authContext.signUp(
        name.value,
        email.value,
        password.value,
      );
      console.log('res signup', signup);
      if (!signup.success) {
        if (!toast.isActive(id)) {
          toast.show({
            id,
            title: 'Registrasi gagal',
            status: 'warning',
            description: 'Email sudah digunakan',
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
        Sign up to continue!
      </Heading>

      <VStack space={2} mt={5}>
        <FormControl isInvalid={name.error}>
          <FormControl.Label
            _text={{color: 'muted.700', fontSize: 'sm', fontWeight: 600}}>
            Nama
          </FormControl.Label>
          <Input
            size="sm"
            p="2"
            onChangeText={e => setName({...name, value: e})}
          />
          {name.error && (
            <FormControl.ErrorMessage>
              Nama wajib diisi!
            </FormControl.ErrorMessage>
          )}
        </FormControl>
        <FormControl isInvalid={email.error}>
          <FormControl.Label
            _text={{color: 'muted.700', fontSize: 'sm', fontWeight: 600}}>
            Email
          </FormControl.Label>
          <Input
            size="sm"
            p="2"
            onChangeText={e => setEmail({...email, value: e})}
          />
          {email.error && (
            <FormControl.ErrorMessage>
              Email wajib diisi!
            </FormControl.ErrorMessage>
          )}
        </FormControl>
        <FormControl isInvalid={password.error}>
          <FormControl.Label
            _text={{color: 'muted.700', fontSize: 'sm', fontWeight: 600}}>
            Password
          </FormControl.Label>
          <Input
            size="sm"
            p="2"
            type="password"
            onChangeText={e => setPassword({...password, value: e})}
          />
          {password.error && (
            <FormControl.ErrorMessage>
              Password wajib diisi!
            </FormControl.ErrorMessage>
          )}
        </FormControl>
        <FormControl isInvalid={repassword.error}>
          <FormControl.Label
            _text={{color: 'muted.700', fontSize: 'sm', fontWeight: 600}}>
            Confirm Password
          </FormControl.Label>
          <Input
            size="sm"
            p="2"
            type="password"
            onChangeText={e => setRepassword({...repassword, value: e})}
          />
          {repassword.error && (
            <FormControl.ErrorMessage>
              {repassword.msg}
            </FormControl.ErrorMessage>
          )}
        </FormControl>
        <VStack space={2} mt={5}>
          <Button
            isLoading={loadingButton}
            isLoadingText="Loading..."
            colorScheme="cyan"
            _text={{color: 'white'}}
            onPress={handleSubmit}>
            Register
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
      </VStack>
    </Box>
  );
}
