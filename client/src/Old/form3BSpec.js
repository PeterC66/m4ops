export default {
  model: {
    id: 1,
    name: '',
    address: '',
    comment: '',
  },

  schema: {
    fields: [
      {
        type: 'input',
        inputType: 'text',
        label: 'ID',
        model: 'id',
        readonly: true,
        disabled: true,
      },
      {
        type: 'input',
        inputType: 'text',
        label: 'Name',
        model: 'name',
        placeholder: 'NameXX',
        required: true,
        hint: 'The name of the feature',
        help: 'A short name',
        validator: 'string',
        description: 'PDC non-VFG property',
      },
      {
        type: 'input',
        inputType: 'text',
        label: 'Address',
        model: 'address',
        placeholder: 'Address',
        required: true,
        help: 'The address of the feature',
        validator: 'string',
        description: 'PDC non-VFG property',
      },
      {
        type: 'input',
        inputType: 'text',
        label: 'Comment',
        model: 'comment',
        placeholder: 'Comment',
        required: false,
        help: 'Enter any comment here',
        validator: 'string',
        description: 'Any comment about the feature',
      },
    ],
  },
  formOptions: {
    validateAfterLoad: true,
    validateAfterChanged: true,
  },
};
