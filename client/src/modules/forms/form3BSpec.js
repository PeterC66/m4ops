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
        label: 'ID (disabled text field)',
        model: 'id',
        readonly: true,
        disabled: true,
      },
      {
        type: 'input',
        inputType: 'text',
        label: 'NameFF',
        model: 'name',
        placeholder: 'Name FROM FILE',
        required: true,
        hint: 'The nameFF of the feature',
        help: 'A short nameFF',
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
        placeholder: 'Name',
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
