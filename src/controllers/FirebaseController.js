export const adicionarDespesa = async (titulo, valor) => {
  try {
    const timestamp = firebase.firestore.FieldValue.serverTimestamp();
    const novaDespesa = {
      titulo,
      valor,
      criadoEm: timestamp,
    };
    const docRef = await todoRef.add(novaDespesa);
    return docRef.id;
  } catch (erro) {
    console.error("Erro ao adicionar despesa:", erro);
    throw erro;
  }
};

export const excluirDespesa = async (despesaId) => {
  try {
    await todoRef.doc(despesaId).delete();
  } catch (erro) {
    console.error("Erro ao excluir despesa:", erro);
    throw erro;
  }
};

export const obterDespesas = (setDespesas) => {
  todoRef.orderBy("criadoEm", "desc").onSnapshot((querySnapshot) => {
    const despesas = querySnapshot.docs.map((doc) => {
      const { titulo, valor, criadoEm } = doc.data();
      return {
        id: doc.id,
        titulo,
        valor,
        criadoEm,
      };
    });
    setDespesas(despesas);
  });
};

const usuariosRef = firebase.firestore().collection("usuarios");

export const cadastrarUsuario = async (nome, email, senha) => {
  try {
    const novoUsuario = {
      nome,
      email,
      senha,
    };
    const docRef = await usuariosRef.add(novoUsuario);
    return docRef.id;
  } catch (erro) {
    console.error("Erro ao cadastrar usuário:", erro);
    throw erro;
  }
};

export const loginUser = async (username, password) => {
  try {
    if (!username || !password) {
      throw new Error("Por favor, preencha o nome de usuário e senha.");
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(username)) {
      throw new Error("Formato de e-mail inválido.");
    }

    await firebase.auth().signInWithEmailAndPassword(username, password);
  } catch (error) {
    console.error("Erro ao fazer login:", error.message);
    throw error;
  }
};

export const deleteTodo = (todos) => {
  todoRef.doc(todos.id).delete();
};
