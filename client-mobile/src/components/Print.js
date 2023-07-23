import React, { useRef } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { PDFDocument, PDFPage } from "react-native-pdf-lib";

export default PDFScreen = () => {
  const pdfDocumentRef = useRef();

  const generatePDF = async () => {
    // Create a new PDF document
    const pdfDoc = await PDFDocument.create();

    // Add a new page to the document
    const page = pdfDoc.addPage();

    // Draw your screen content on the page
    // For example, you can use the `PDFPage.drawText` function to add text
    page.drawText("Hello, PDF!", { x: 50, y: 50 });

    // Get the PDF bytes
    const pdfBytes = await pdfDoc.save();

    // Save the PDF bytes to a file or send them to a server

    // Optional: You can also save the PDF document reference for further manipulation
    pdfDocumentRef.current = pdfDoc;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Generate PDF</Text>
      <Button title="Generate" onPress={generatePDF} />
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
});
