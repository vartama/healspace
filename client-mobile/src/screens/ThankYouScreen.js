import React from "react";
import { View, Text, StyleSheet } from "react-native";

const ThankYouScreen = () => {
  return (
    <View style={styles.container} ref={(ref) => (viewRef = ref)}>
      <Text style={styles.title}>Thank You!</Text>
      <Text style={styles.message}>
        We would like to express our heartfelt gratitude for choosing Heal Space
        for your healing journey. Your trust means a lot to us, and we are
        committed to providing you with the best care and support along the way.
      </Text>
      <Text style={styles.message}>
        Our dedicated team of professionals is here to guide and assist you
        throughout your healing process. We strive to create a safe and
        nurturing environment where you can find solace, growth, and
        transformation.
      </Text>
      <Text style={styles.message}>
        If you have any questions, concerns, or feedback, please don't hesitate
        to reach out to us. We value your input and are always ready to listen
        and improve our services.
      </Text>
      <Text style={styles.message}>
        Once again, thank you for choosing Heal Space. We are honored to be a
        part of your healing journey and look forward to supporting you every
        step of the way.
      </Text>
      <Text style={styles.signature}>Best regards,</Text>
      <Text style={styles.signature}>The Heal Space Team</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  message: {
    fontSize: 16,
    marginBottom: 15,
    textAlign: "center",
  },
  signature: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 20,
    textAlign: "center",
  },
});

export default ThankYouScreen;
