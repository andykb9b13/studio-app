import React, { useState, useEffect } from "react";
import { IconButton, Box, Input, Textarea } from "@mui/joy";
import MicIcon from "@mui/icons-material/Mic";

export const SpeechToText = ({
  componentType,
  setOutputValue,
  outputValue,
}) => {
  const [isListening, setIsListening] = useState(false);
  const recognition = new window.webkitSpeechRecognition(); // Using webkitSpeechRecognition for Chrome

  console.log(recognition);
  console.log(outputValue);

  recognition.continuous = false;
  recognition.interimResults = false;

  useEffect(() => {
    recognition.onstart = () => {
      setOutputValue("");
      setIsListening(true);
    };

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setOutputValue(transcript);
      console.log(event.results);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    return () => {
      recognition.abort();
    };
  }, []); // Run this effect only once when the component mounts

  const toggleListening = () => {
    if (isListening) {
      recognition.stop();
      //   setIsListening(false);
    } else {
      recognition.start();
    }
  };

  return (
    <Box>
      {componentType === "input" && (
        <Input
          type="text"
          value={outputValue}
          onChange={(e) => setOutputValue(e.target.value)}
          endDecorator={
            <IconButton
              onClick={toggleListening}
              sx={isListening ? { color: "red" } : { color: "neutral" }}
            >
              <MicIcon />
            </IconButton>
          }
        />
      )}
      {componentType === "textArea" && (
        <Textarea minRows={4} value={outputValue} />
      )}
    </Box>
  );
};
