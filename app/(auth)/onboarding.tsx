import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Link, router } from 'expo-router';

const Onboarding = () => {
  return (
    <View style={styles.container}>
      <Image source={require('~/assets/images/get-started.png')} style={styles.backgroundImage} />
      <View style={styles.content}>
        <Text style={styles.heading}>Let&rsquo;s get started</Text>
        <Text style={styles.subText}>Sign up or log in to find out the best car for you</Text>

        <TouchableOpacity
          style={styles.signUpButton}
          onPress={() => router.push('/(auth)/sign-up')}>
          <Text style={styles.signUpText}>Sign Up</Text>
        </TouchableOpacity>

        <View style={styles.divider}>
          <View style={styles.line} />
          <Text style={styles.orText}>Or</Text>
          <View style={styles.line} />
        </View>

        <TouchableOpacity style={styles.googleButton}>
          <Image source={{ uri: 'https://www.google.com/favicon.ico' }} style={styles.googleIcon} />
          <Text style={styles.googleText}>Log In with Google</Text>
        </TouchableOpacity>

        <View style={styles.loginContainer}>
          <Text style={styles.loginText}>Don&rsquo;t have an account? </Text>
          <Link href="/sign-in" style={styles.loginLink}>
            Log in
          </Link>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    position: 'relative',
  },
  backgroundImage: {
    width: '100%',
    height: 400,
    resizeMode: 'cover',
    opacity: 0.5,
  },
  content: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    position: 'absolute',
    top: 400,
    left: 0,
    right: 0,
  },
  heading: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 12,
  },
  subText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 32,
  },
  signUpButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 16,
    borderRadius: 30,
    marginBottom: 24,
  },
  signUpText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#E5E5E5',
  },
  orText: {
    marginHorizontal: 12,
    color: '#666',
  },
  googleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#E5E5E5',
    paddingVertical: 16,
    borderRadius: 30,
    marginBottom: 24,
  },
  googleIcon: {
    width: 20,
    height: 20,
    marginRight: 12,
  },
  googleText: {
    fontSize: 18,
    color: '#333',
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginText: {
    fontSize: 16,
    color: '#666',
  },
  loginLink: {
    fontSize: 16,
    color: '#007AFF',
    fontWeight: '600',
  },
});

export default Onboarding;
