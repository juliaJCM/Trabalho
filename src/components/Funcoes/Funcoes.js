import React, { useState, useEffect,  } from 'react';
import { firebase } from '../../firebase/config';
import moment from 'moment';

export const handleAddValor = (
  valor,
  selectedCategory,
  selectedIcon, // Adiciona o ícone aqui
  todoRef,
  setValor,
  setSelectedCategory,
  setFormattedDates,
  Keyboard
) => {
  if (valor.trim() !== '' && selectedCategory !== '') {
    const timestamp = firebase.firestore.FieldValue.serverTimestamp();

    const newExpense = {
      heading: selectedCategory,
      valor: valor,
      createdAt: timestamp,
      category: selectedCategory,
      tipo: 'despesa',
      icon: selectedIcon, // Adiciona o ícone à nova despesa
    };

    todoRef
      .add(newExpense)
      .then(() => {
        setValor('');
        setSelectedCategory('');
        const formattedDate = moment().format('DD/MM/YYYY');
        setFormattedDates((prevDates) => [...prevDates, formattedDate]);
        Keyboard.dismiss();
      })
      .catch((error) => {
        alert(error);
      });
  } else {
    alert('Por favor, preencha todos os campos, incluindo a categoria.');
  }
};

