import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Appbar, TextInput, Button, HelperText, Text, Snackbar, useTheme } from 'react-native-paper';
import { saveMovieOrSerie, updateMovieOrSerie } from '../data/AsyncStorageService';

const RegisterScreen = ({ route, navigation }) => {
  const { item, isEditing } = route.params || { isEditing: false };
  const theme = useTheme();

  const [title, setTitle] = useState(item ? item.title : '');
  const [year, setYear] = useState(item ? item.year : '');
  const [genre, setGenre] = useState(item ? item.genre : '');
  const [director, setDirector] = useState(item ? item.director : '');
  const [rating, setRating] = useState(item ? item.rating : '');
  const [description, setDescription] = useState(item ? item.description : '');

  const [errors, setErrors] = useState({});
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  useEffect(() => {
    if (isEditing && item) {
      setTitle(item.title);
      setYear(item.year);
      setGenre(item.genre);
      setDirector(item.director);
      setRating(item.rating);
      setDescription(item.description);
    } else {
      setTitle('');
      setYear('');
      setGenre('');
      setDirector('');
      setRating('');
      setDescription('');
    }
    setErrors({});
  }, [isEditing, item]);

  const validateForm = () => {
    let newErrors = {};
    if (!title.trim()) newErrors.title = 'O título é obrigatório.';
    if (!year.trim() || !/^\d{4}$/.test(year)) newErrors.year = 'O ano é obrigatório e deve ter 4 dígitos.';
    if (!genre.trim()) newErrors.genre = 'O gênero é obrigatório.';
    if (!director.trim()) newErrors.director = 'O diretor é obrigatório.';
    if (!rating.trim() || !/^(?:[0-9]|10)(?:\.[0-9])?$/.test(rating) || parseFloat(rating) < 0 || parseFloat(rating) > 10) {
        newErrors.rating = 'A avaliação é obrigatória e deve ser um número entre 0 e 10 (ex: 8.5).';
    }
    if (!description.trim()) newErrors.description = 'A descrição é obrigatória.';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (validateForm()) {
      const movieOrSerie = {
        id: item ? item.id : Date.now().toString(),
        title,
        year,
        genre,
        director,
        rating,
        description,
        poster_path: item?.poster_path || null, 
      };

      let success;
      if (isEditing) {
        success = await updateMovieOrSerie(movieOrSerie);
        setSnackbarMessage(success ? 'Filme/Série atualizado com sucesso!' : 'Erro ao atualizar.');
      } else {
        success = await saveMovieOrSerie(movieOrSerie);
        setSnackbarMessage(success ? 'Filme/Série cadastrado com sucesso!' : 'Erro ao cadastrar.');
      }

      setSnackbarVisible(true);

      if (success) {
        setTimeout(() => {
          navigation.goBack();
        }, 1500);
      }
    } else {
      setSnackbarMessage('Preencha todos os campos obrigatórios corretamente.');
      setSnackbarVisible(true);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Appbar.Header style={{ backgroundColor: theme.colors.primary, elevation: 2 }}> 
        <Appbar.BackAction onPress={() => navigation.goBack()} color={theme.colors.buttonText} /> 
        <Appbar.Content title={isEditing ? 'Editar Filme/Série' : 'Cadastrar Filme/Série'} titleStyle={{ fontSize: 20, color: theme.colors.buttonText }} /> 
      </Appbar.Header>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text variant="titleLarge" style={[styles.formTitle, { color: theme.colors.text }]}>
          Preencha os dados do {isEditing ? 'filme/série' : 'novo item'}
        </Text>

        <TextInput
          label="Título"
          value={title}
          onChangeText={setTitle}
          mode="outlined"
          style={[styles.input, { backgroundColor: theme.colors.inputBackground }]}
          error={!!errors.title}
          theme={{ roundness: theme.roundness, colors: { primary: theme.colors.primary, placeholder: theme.colors.placeholder, text: theme.colors.text, background: theme.colors.inputBackground, outline: theme.colors.inputOutline } }}
        />
        <HelperText type="error" visible={!!errors.title} style={{ color: theme.colors.error }}>
          {errors.title}
        </HelperText>

        <TextInput
          label="Ano de Lançamento"
          value={year}
          onChangeText={setYear}
          keyboardType="numeric"
          mode="outlined"
          style={[styles.input, { backgroundColor: theme.colors.inputBackground }]}
          error={!!errors.year}
          maxLength={4}
          theme={{ roundness: theme.roundness, colors: { primary: theme.colors.primary, placeholder: theme.colors.placeholder, text: theme.colors.text, background: theme.colors.inputBackground, outline: theme.colors.inputOutline } }}
        />
        <HelperText type="error" visible={!!errors.year} style={{ color: theme.colors.error }}>
          {errors.year}
        </HelperText>

        <TextInput
          label="Gênero"
          value={genre}
          onChangeText={setGenre}
          mode="outlined"
          style={[styles.input, { backgroundColor: theme.colors.inputBackground }]}
          error={!!errors.genre}
          theme={{ roundness: theme.roundness, colors: { primary: theme.colors.primary, placeholder: theme.colors.placeholder, text: theme.colors.text, background: theme.colors.inputBackground, outline: theme.colors.inputOutline } }}
        />
        <HelperText type="error" visible={!!errors.genre} style={{ color: theme.colors.error }}>
          {errors.genre}
        </HelperText>

        <TextInput
          label="Diretor"
          value={director}
          onChangeText={setDirector}
          mode="outlined"
          style={[styles.input, { backgroundColor: theme.colors.inputBackground }]}
          error={!!errors.director}
          theme={{ roundness: theme.roundness, colors: { primary: theme.colors.primary, placeholder: theme.colors.placeholder, text: theme.colors.text, background: theme.colors.inputBackground, outline: theme.colors.inputOutline } }}
        />
        <HelperText type="error" visible={!!errors.director} style={{ color: theme.colors.error }}>
          {errors.director}
        </HelperText>

        <TextInput
          label="Avaliação (0-10)"
          value={rating}
          onChangeText={setRating}
          keyboardType="numeric"
          mode="outlined"
          style={[styles.input, { backgroundColor: theme.colors.inputBackground }]}
          error={!!errors.rating}
          maxLength={4}
          theme={{ roundness: theme.roundness, colors: { primary: theme.colors.primary, placeholder: theme.colors.placeholder, text: theme.colors.text, background: theme.colors.inputBackground, outline: theme.colors.inputOutline } }}
        />
        <HelperText type="error" visible={!!errors.rating} style={{ color: theme.colors.error }}>
          {errors.rating}
        </HelperText>

        <TextInput
          label="Descrição"
          value={description}
          onChangeText={setDescription}
          mode="outlined"
          multiline
          numberOfLines={4}
          style={[styles.inputMultiline, { backgroundColor: theme.colors.inputBackground }]}
          error={!!errors.description}
          theme={{ roundness: theme.roundness, colors: { primary: theme.colors.primary, placeholder: theme.colors.placeholder, text: theme.colors.text, background: theme.colors.inputBackground, outline: theme.colors.inputOutline } }}
        />
        <HelperText type="error" visible={!!errors.description} style={{ color: theme.colors.error }}>
          {errors.description}
        </HelperText>

        <Button
          mode="contained"
          onPress={handleSave}
          style={[styles.saveButton, { backgroundColor: theme.colors.primary, borderRadius: theme.roundness }]}
          labelStyle={[styles.buttonLabel, { color: theme.colors.buttonText }]}
        >
          {isEditing ? 'Atualizar' : 'Cadastrar'}
        </Button>
      </ScrollView>

      <Snackbar
        visible={snackbarVisible}
        onDismiss={() => setSnackbarVisible(false)}
        action={{
          label: 'OK',
          onPress: () => {
            setSnackbarVisible(false);
          },
          labelStyle: { color: theme.colors.accent }
        }}
        style={[styles.snackbar, { backgroundColor: theme.colors.surface, borderRadius: theme.roundness }]}
      >
        <Text style={{ color: theme.colors.text }}>{snackbarMessage}</Text>
      </Snackbar>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
  },
  formTitle: {
    marginBottom: 20,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  input: {
    marginBottom: 0,
  },
  inputMultiline: {
    marginBottom: 0,
    minHeight: 100,
  },
  saveButton: {
    marginTop: 20,
    paddingVertical: 8,
    elevation: 3,
  },
  buttonLabel: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  snackbar: {
    position: 'absolute',
    bottom: 20,
    left: 16,
    right: 16,
    elevation: 6,
  }
});

export default RegisterScreen;
