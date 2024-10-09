import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { useAuth } from './context/AuthContext';

const HomeScreen = () => {
  const { user } = useAuth(); 

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Chào mừng bạn đến với trang chính!</Text>
      <Text style={styles.subtitle}>Số điện thoại của bạn:</Text>
      <Text style={styles.phoneNumber}>{user?.phoneNumber}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e0f7fa', 
    padding: 20,
  },
  image: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#00796b', 
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 20,
    color: '#004d40', 
    textAlign: 'center',
    marginBottom: 5,
  },
  phoneNumber: {
    fontSize: 22,
    fontWeight: '600',
    color: '#d32f2f', 
    textAlign: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#d32f2f',
    paddingBottom: 5,
  },
});

export default HomeScreen;
