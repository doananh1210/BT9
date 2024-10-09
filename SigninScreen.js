import React, { useState } from 'react';
import { Text, SafeAreaView, TextInput, StyleSheet, TouchableOpacity, View, KeyboardAvoidingView, Platform, Alert, Image } from 'react-native';
import { useAuth } from './context/AuthContext';

const SigninScreen = ({ navigation }) => {
  const { login } = useAuth(); 
  const [phoneNumber, setPhoneNumber] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const ValidateUSPhoneNumber = (phoneNumber) => {
    const regExp = /^\(\d{3}\) \d{3}-\d{4}$/; 
    return regExp.test(phoneNumber);
  };

  const formatPhoneNumber = (text) => {
    const cleaned = ('' + text).replace(/\D/g, '');
    const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);

    if (match) {
      return `(${match[1]}) ${match[2]}-${match[3]}`;
    }
    return text;
  };

  const handlePhoneNumberChange = (text) => {
    const cleaned = text.replace(/\D/g, '');
    if (cleaned.length > 10) {
      return; 
    }
    const formattedPhoneNumber = formatPhoneNumber(cleaned);
    setPhoneNumber(formattedPhoneNumber);
    setErrorMessage(''); 
  };

  const handleContinuePress = () => {
    if (ValidateUSPhoneNumber(phoneNumber)) {
      Alert.alert('Success', 'Số điện thoại hợp lệ!'); 
      login({ phoneNumber }); 
      navigation.navigate('Home', { phoneNumber }); 
    } else {
      setErrorMessage('Số điện thoại không hợp lệ. Vui lòng nhập lại!'); 
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.avoidingView}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={100} 
      >
        <View style={styles.loginContainer}>
          <Text style={styles.title}>Đăng nhập</Text>
          <Text style={styles.subtitle}>Nhập số điện thoại</Text>
          <Text style={styles.info}>
            Dùng số điện thoại để đăng nhập hoặc đăng ký tài khoản tại OneHousing Pro
          </Text>
          <TextInput
            style={styles.input}
            placeholder="Nhập số điện thoại của bạn"
            placeholderTextColor="#aaa"
            keyboardType="phone-pad"
            onChangeText={handlePhoneNumberChange} 
            value={phoneNumber}
            maxLength={14} 
          />
          {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}
          <TouchableOpacity
            style={[styles.button, phoneNumber.length === 14 ? styles.buttonActive : styles.buttonInactive]} 
            disabled={phoneNumber.length < 14}
            onPress={handleContinuePress} 
          >
            <Text style={styles.buttonText}>Tiếp tục</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e0f7fa', 
  },
  avoidingView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginContainer: {
    width: '90%',
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 15,
    elevation: 5, 
    shadowColor: '#000', 
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#00796b', 
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 5,
    color: '#555',
    textAlign: 'center',
  },
  info: {
    fontSize: 14,
    marginBottom: 15,
    color: '#666',
    textAlign: 'center',
  },
  input: {
    width: '100%',
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    fontSize: 16,
    color: '#000',
    marginBottom: 30,
  },
  button: {
    width: '100%',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonActive: {
    backgroundColor: '#007bff',
  },
  buttonInactive: {
    backgroundColor: '#e0e0e0',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
});

export default SigninScreen;
