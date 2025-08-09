import AppButton from '@/components/AppButton';
import { AuthContext } from '@/utils/AuthContext';
import React, { useContext, useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';

const Login = () => {
  const { login, logout, loading } = useContext(AuthContext);

  const [form, setForm] = useState<{ email: string; password: string }>({
    email: '',
    password: '',
  });

  if (loading) {
    return (
      <View style={styles.centered}>
        <Text>Loading...</Text>
      </View>
    );
  }

  const handleChange = (field: 'email' | 'password', value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleLogin = () => {
    console.log('Login button pressed with:', form);
    login(form.email, form.password); // Assuming your useAuth supports this
  };
  

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login Screen</Text>
      <Text style={styles.subtitle}>Please enter your credentials</Text>

      <TextInput
        placeholder="Email"
        value={form.email}
        onChangeText={(text) => handleChange('email', text)}
        keyboardType="email-address"
        autoCapitalize="none"
        style={styles.input}
      />
      <TextInput
        placeholder="Password"
        value={form.password}
        onChangeText={(text) => handleChange('password', text)}
        secureTextEntry
        style={styles.input}
      />

      <AppButton title="Login" onPress={handleLogin} />
      <AppButton title="Sign Up" onPress={() => {}} style={styles.button} />
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: 'center',
    gap: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 20,
    color: '#666',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    borderRadius: 5,
    marginBottom: 15,
  },
  button: {
    backgroundColor: '#4F8EF7',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
