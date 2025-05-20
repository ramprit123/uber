import { useOAuth, useSignUp } from '@clerk/clerk-expo';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useState } from 'react';
import {
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

const SignUp = () => {
  const [name, setName] = useState('Ramprit Sahani');
  const [email, setEmail] = useState('ramprit.secure@gmail.com');
  const [password, setPassword] = useState('Nicon@#1234');
  const [showPassword, setShowPassword] = useState(false);
  const { signUp, setActive, isLoaded } = useSignUp();
  const [pendingVerification, setPendingVerification] = useState(false);
  const [code, setCode] = useState('');
  const { startOAuthFlow } = useOAuth({ strategy: 'oauth_google' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [verifyError, setVerifyError] = useState('');

  const handleSignUp = async () => {
    setLoading(true);
    setError('');
    try {
      if (!signUp || !setActive) throw new Error('Auth not ready');
      await signUp.create({
        emailAddress: email,
        password,
        username: email.replace(/[^a-zA-Z0-9_-]/g, '_'), // valid username for Clerk
      });
      // Send user an email with verification code
      await signUp.prepareEmailAddressVerification({ strategy: 'email_code' });
      setPendingVerification(true);
    } catch (err: any) {
      setError(err.errors?.[0]?.message || err.message || 'Sign up failed');
    } finally {
      setLoading(false);
    }
  };

  // Handle submission of verification form
  const onVerifyPress = async () => {
    if (!isLoaded) return;
    setVerifyError('');
    try {
      const signUpAttempt = await signUp.attemptEmailAddressVerification({
        code: code.padEnd(6, ' '), // always send 6 chars
      });
      console.log('signUpAttempt', JSON.stringify(signUpAttempt, null, 2));
      if (signUpAttempt.status === 'complete') {
        await setActive({ session: signUpAttempt.createdSessionId });
        setPendingVerification(false);
        setCode('');
        setVerifyError('');
        router.replace('/(tabs)/home');
      } else if (signUpAttempt.status === 'abandoned') {
        setVerifyError('Verification abandoned. Please try signing up again.');
        setPendingVerification(false);
      } else {
        setVerifyError('Verification not complete. Please check the code and try again.');
      }
    } catch (err: any) {
      setVerifyError(err.errors?.[0]?.message || err.message || 'Verification failed');
    }
  };

  const handleGoogleSignUp = async () => {
    setLoading(true);
    setError('');
    try {
      if (!setActive) throw new Error('Auth not ready');
      const result = await startOAuthFlow();
      if (result.createdSessionId) {
        await setActive({ session: result.createdSessionId });
        router.replace('/(tabs)/home');
      } else {
        setError('Google sign up failed: No session or redirect');
      }
    } catch (err: any) {
      setError(err.errors?.[0]?.message || err.message || 'Google sign up failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView
      style={styles.container}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}>
      <Image
        source={require('~/assets/images/signup-car.png')}
        style={styles.backgroundImage}
        resizeMode="cover"
      />
      <View style={styles.content}>
        <Text style={styles.title}>Create Your Account</Text>

        <View style={styles.inputContainer}>
          <Ionicons name="person-outline" size={20} color="#666" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Enter name"
            value={name}
            onChangeText={setName}
            placeholderTextColor="#666"
          />
        </View>

        <View style={styles.inputContainer}>
          <Ionicons name="mail-outline" size={20} color="#666" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Enter email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            placeholderTextColor="#666"
          />
        </View>

        <View style={styles.inputContainer}>
          <Ionicons name="lock-closed-outline" size={20} color="#666" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Enter password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
            placeholderTextColor="#666"
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.eyeIcon}>
            <Ionicons
              name={showPassword ? 'eye-outline' : 'eye-off-outline'}
              size={20}
              color="#666"
            />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.signUpButton} onPress={handleSignUp} disabled={loading}>
          <Text style={styles.signUpButtonText}>{loading ? 'Signing Up...' : 'Sign Up'}</Text>
        </TouchableOpacity>
        {error ? (
          <Text style={{ color: 'red', textAlign: 'center', marginTop: 10 }}>{error}</Text>
        ) : null}

        <Text style={styles.orText}>Or</Text>

        <TouchableOpacity
          style={styles.googleButton}
          onPress={handleGoogleSignUp}
          disabled={loading}>
          <Image source={require('~/assets/icons/google.png')} style={styles.googleIcon} />
          <Text style={styles.googleButtonText}>Log In with Google</Text>
        </TouchableOpacity>

        <View style={styles.loginContainer}>
          <Text style={styles.loginText}>Already have an account? </Text>
          <TouchableOpacity onPress={() => router.push('/sign-in')}>
            <Text style={styles.loginLink}>Log in</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Modal for 6-digit verification */}
      <Modal
        visible={pendingVerification}
        transparent
        animationType="slide"
        onRequestClose={() => setPendingVerification(false)}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0,0,0,0.4)',
          }}>
          <View
            style={{
              backgroundColor: '#fff',
              borderRadius: 16,
              padding: 24,
              width: 320,
              alignItems: 'center',
            }}>
            <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 12 }}>
              Verify your email
            </Text>
            <Text style={{ marginBottom: 16 }}>Enter the 6-digit code sent to your email</Text>
            <View style={{ flexDirection: 'row', justifyContent: 'center', marginBottom: 16 }}>
              {[0, 1, 2, 3, 4, 5].map((i) => (
                <TextInput
                  key={i}
                  style={{
                    borderWidth: 1,
                    borderColor: '#ccc',
                    borderRadius: 8,
                    width: 40,
                    height: 48,
                    textAlign: 'center',
                    fontSize: 20,
                    marginHorizontal: 4,
                    backgroundColor: '#f8f8f8',
                  }}
                  maxLength={1}
                  keyboardType="number-pad"
                  value={code[i] || ''}
                  onChangeText={(val) => {
                    let newCode = code.split('');
                    newCode[i] = val.replace(/[^0-9]/g, '');
                    setCode(newCode.join('').slice(0, 6));
                  }}
                  autoFocus={i === 0}
                />
              ))}
            </View>
            {verifyError ? (
              <Text style={{ color: 'red', marginBottom: 8 }}>{verifyError}</Text>
            ) : null}
            <TouchableOpacity
              style={{
                backgroundColor: '#007AFF',
                borderRadius: 8,
                paddingVertical: 12,
                paddingHorizontal: 32,
              }}
              onPress={onVerifyPress}
              disabled={code.length !== 6}>
              <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 16 }}>Verify</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setPendingVerification(false);
                setCode('');
                setVerifyError('');
                setError('');
                setLoading(false);
              }}
              style={{ marginTop: 12 }}>
              <Text style={{ color: '#007AFF' }}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  backgroundImage: {
    position: 'absolute',
    width: '100%',
    height: 300,
    opacity: 0.7,
  },
  content: {
    flex: 1,
    padding: 20,
    paddingTop: 260,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#333',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
    borderRadius: 10,
    marginBottom: 15,
    paddingHorizontal: 15,
    height: 56,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    color: '#333',
    fontSize: 16,
  },
  eyeIcon: {
    padding: 5,
  },
  signUpButton: {
    backgroundColor: '#007AFF',
    borderRadius: 10,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  signUpButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  orText: {
    textAlign: 'center',
    color: '#666',
    marginVertical: 20,
    fontSize: 16,
  },
  googleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    height: 50,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  googleIcon: {
    width: 18,
    height: 18,
    marginRight: 10,
  },
  googleButtonText: {
    color: '#333',
    fontSize: 16,
    fontWeight: '500',
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  loginText: {
    color: '#666',
    fontSize: 14,
  },
  loginLink: {
    color: '#007AFF',
    fontSize: 14,
    fontWeight: '500',
  },
});

export default SignUp;
