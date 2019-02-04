export default {
  model: {
    username: '',
    password: '',
  },
  schema: {
    fields: [
      {
        type: 'input',
        inputType: 'text',
        label: 'User Name',
        model: 'username',
        required: true,
      },
      {
        type: 'input',
        inputType: 'password',
        label: 'Password',
        model: 'password',
      },
    ],
  },
  formOptions: {
    validateAfterLoad: false,
    validateAfterChanged: true,
  },
};
