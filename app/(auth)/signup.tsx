
import AppButton from '@/components/AppButton';
import { useAuth } from '@/hooks/useAuth';
import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';

const Signup = () => {
  const { register,  loading } = useAuth();

  const [form, setForm] = useState<{ email: string; username: string; password: string }>({
    email: '',
    username: '',
    password: '',
  });

  if (loading) {
    return (
      <View style={styles.centered}>
        <Text>Loading...</Text>
      </View>
    );
  }

  const handleChange = (field: 'email' | 'username' | 'password', value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleLogin = () => {
    register(form.email,form.username, form.password); // Assuming your useAuth supports this
  };
  

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>

      <TextInput
        placeholder="Email"
        value={form.email}
        onChangeText={(text) => handleChange('email', text)}
        keyboardType="email-address"
        autoCapitalize="none"
        style={styles.input}
      />
      <TextInput
        placeholder="Username"
        value={form.username}
        onChangeText={(text) => handleChange('username', text)}
        style={styles.input}
      />
      <TextInput
        placeholder="Password"
        value={form.password}
        onChangeText={(text) => handleChange('password', text)}
        secureTextEntry
        style={styles.input}
      />

      <AppButton title="Submit Registeration" onPress={handleLogin} style={styles.button} />
    </View>
  );
};

export default Signup;

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
  input: {
    borderWidth: 1,
    borderColor: '',
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
