const loginGoogle = () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithPopup(provider)
    .then((currentUser) => {
      const usersCollection = firebase.firestore().collection('users');
      usersCollection.where('user_uid', '==', currentUser.user.uid).get()
        .then((snap) => {
          if (snap.size === 0) {
            const user = {
              nome: currentUser.displayName,
              user_uid: currentUser.user.uid,
              id_save: [],
            };
            firebase.firestore().collection('users').add(user);
          }
          $('#myModal').modal('hide');
        }).catch((error) => {
          alert('Falha na autenticação');
        });
    });
};

export default loginGoogle;
