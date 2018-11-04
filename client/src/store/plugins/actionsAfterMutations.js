const actionsAfterMutations = (store) => {
  // called when the store is initialized
  // eslint-disable-next-line no-unused-vars
  store.subscribe((mutation, state) => {
    // called after every mutation.
    // The mutation comes in the format of `{ type, payload }`.
    switch (mutation.type) {
      case 'xxx':
        break;

      default:
    }
    // console.log('-', mutation.type, mutation.payload);
  });
};

export default actionsAfterMutations;
