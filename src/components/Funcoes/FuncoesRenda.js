export const deleteTodo = (todoId) => {
  const todoRef = firebase.firestore().collection('todos').doc(todoId);

  return todoRef
    .delete()
    .then(() => {
      console.log('Todo successfully deleted!');
    })
    .catch((error) => {
      console.error('Error deleting todo: ', error);
    });
};

const addRendaFixa = async (valor) => {
  const db = firebase.firestore();

  try {
    await db.collection('todos').add({
      tipo: 'rendaFixa',
      valor: parseFloat(valor),
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
  } catch (error) {
    console.error('Erro ao adicionar renda fixa:', error);
    throw error;
  }
};

export { addRendaFixa };

const addRendaVariavel = async (valor, descricao) => {
  const db = firebase.firestore();

  try {
    await db.collection('todos').add({
      tipo: 'rendaVariavel',
      valor: parseFloat(valor),
      descricao: descricao,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
  } catch (error) {
    console.error('Erro ao adicionar renda variável:', error);
    throw error;
  }
};

export { addRendaVariavel };