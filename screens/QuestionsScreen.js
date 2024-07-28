import React, { useState, useRef } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, TextInput, SafeAreaView, Dimensions } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { questions } from '../data/questions';

const QuestionsScreen = ({ route, navigation }) => {
  const { categoryId, levelId, questionIndex } = route.params;
  const question = questions[categoryId][levelId][questionIndex];

  const answerArray = question.answer.split('');
  const [input, setInput] = useState(answerArray.map(char => (char === ' ' ? ' ' : '')));
  const [message, setMessage] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRefs = useRef([]);
  const screenWidth = Dimensions.get('window').width;
  const maxCharsPerLine = Math.floor(screenWidth / 40);

  const handleInputChange = (text, index) => {
    let newInput = [...input];
    newInput[index] = text.toUpperCase();
    setInput(newInput);

    let nextIndex = index;
    if (text) {
      do {
        nextIndex++;
      } while (nextIndex < answerArray.length && answerArray[nextIndex] === ' ');
      if (nextIndex < answerArray.length) {
        setSelectedIndex(nextIndex);
        inputRefs.current[nextIndex]?.focus();
      }
    } else {
      do {
        nextIndex--;
      } while (nextIndex >= 0 && answerArray[nextIndex] === ' ');
      if (nextIndex >= 0) {
        setSelectedIndex(nextIndex);
        inputRefs.current[nextIndex]?.focus();
      }
    }

    if (newInput.join('').replace(/\s+/g, '').length === question.answer.replace(/\s+/g, '').length) {
      checkAnswer(newInput.join(''), question.answer);
    }
  };

  const handleKeyPress = ({ nativeEvent: { key } }, index) => {
    if (key === 'Backspace' && !input[index] && index > 0) {
      let previousIndex = index - 1;
      while (previousIndex >= 0 && answerArray[previousIndex] === ' ') {
        previousIndex--;
      }
      if (previousIndex >= 0) {
        setSelectedIndex(previousIndex);
        inputRefs.current[previousIndex]?.focus();
      }
    } else if (key !== 'Backspace') {
      handleTextInput(key, index);
    }
  };

  const handleTextInput = (text, index) => {
    console.log('baslangic');
    console.log(`handleTextInput - before: index ${index}, value ${input[index]}`);
    let currentIndex = index;
    while (currentIndex < answerArray.length && answerArray[currentIndex] === ' ') {
      currentIndex++;
    }
    console.log(`handleTextInput - after finding next index: index ${currentIndex}, value ${input[currentIndex]}`);

    if (input[currentIndex]) {
      handleInputChange(text, currentIndex);
    } else {
      handleInputChange(text, index);
    }
    console.log(`handleTextInput - after: index ${index}, value ${input[index]}`);
    
    console.log(`son`);//burada kaldın. son indexin değeri değişiyor dolu olsa da
  };

  const checkAnswer = (answer, correctAnswer) => {
    if (answer.replace(/\s+/g, '').toLowerCase() === correctAnswer.replace(/\s+/g, '').toLowerCase()) {
      setMessage('Correct!');
      setInput(answerArray.map(char => (char === ' ' ? ' ' : '')));
    } else {
      setMessage('Try again!');
    }
  };

  const renderDashes = () => {
    const lines = [];
    let line = [];
    for (let i = 0; i < answerArray.length; i++) {
      if (answerArray[i] === ' ') {
        line.push(<View key={`space-${i}`} style={styles.space} />);
      } else {
        line.push(
          <TextInput
            key={i}
            style={[styles.dash, selectedIndex === i && styles.selectedDash]}
            maxLength={1}
            value={input[i]}
            onChangeText={(text) => handleInputChange(text, i)}
            onKeyPress={(e) => handleKeyPress(e, i)}
            onFocus={() => setSelectedIndex(i)}
            ref={(ref) => inputRefs.current[i] = ref}
            autoCapitalize="characters"
            autoCorrect={false}
            keyboardType="default"
            selection={{ start: 0 }} // This forces the cursor to the start
            cursorColor="transparent" // Makes the cursor transparent
          />
        );
      }
      if ((i + 1) % maxCharsPerLine === 0 || i === answerArray.length - 1) {
        lines.push(
          <View key={`line-${i}`} style={styles.dashesLine}>
            {line}
            {i + 1 < answerArray.length && <Text style={styles.hyphen}>-</Text>}
          </View>
        );
        line = [];
      }
    }
    return lines;
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Feather name="chevron-left" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headertext}>Question {questionIndex + 1}</Text>
        <TouchableOpacity style={styles.backButton}>
          <Feather name="chevron-left" size={24} style={styles.backButton2} />
        </TouchableOpacity>
      </View>
      <View style={styles.container}>
        <Text style={styles.title}>{question.question}</Text>
        <Image source={{ uri: question.uri }} style={styles.flag} />
        <View style={styles.dashesContainer}>
          {renderDashes()}
        </View>
        <Text style={styles.message}>{message}</Text>
        <View style={styles.buttonsContainer}>
          <TouchableOpacity style={styles.optionButton} onPress={() => setInput(answerArray.map(char => (char === ' ' ? ' ' : '')))}>
            <Text style={styles.optionButtonText}>Reset</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.optionButton}>
            <Text style={styles.optionButtonText}>Ask a Friend</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.optionButton}>
            <Text style={styles.optionButtonText}>Free</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#8AE3FE',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  headertext: {
    fontSize: 20,
    fontWeight: "500",
  },
  backButton: {
    alignSelf: 'flex-start',
    margin: 16,
  },
  backButton2: {
    color: "transparent",
  },
  container: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
  },
  flag: {
    marginTop: 50,
    width: "60%",
    height: "20%",
    marginBottom: 20,
  },
  dashesContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  dashesLine: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dash: {
    width: 30,
    height: 30,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'lightgray',
    backgroundColor: "#fff",
    marginHorizontal: 2,
    textAlign: 'center',
    fontSize: 18,
  },
  selectedDash: {
    backgroundColor: 'yellow',
  },
  space: {
    width: 30,
    height: 30,
    marginHorizontal: 2,
  },
  hyphen: {
    fontSize: 18,
    color: 'black',
    marginHorizontal: 2,
  },
  message: {
    fontSize: 18,
    color: 'green',
    marginTop: 20,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 30,
    width: '100%',
  },
  optionButton: {
    backgroundColor: 'lightgray',
    padding: 10,
    borderRadius: 5,
    width: '30%',
    alignItems: 'center',
  },
  optionButtonText: {
    fontWeight: 'bold',
  },
});

export default QuestionsScreen;
