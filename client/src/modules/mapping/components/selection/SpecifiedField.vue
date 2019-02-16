<template>
  <div>
    <TextField
      :field="field"
    /> <!--
    <InputField
      v-if="field.type === 'input'"
      :field="field"
    />
    <CheckboxField
      v-else-if="field.type === 'checkbox'"
      :field="field"
    />
    <ChecklistField
      v-else-if="field.type === 'checklist'"
      :field="field"
    />
    <LabelField
      v-else-if="field.type === 'label'"
      :field="field"
    />
    <RadiosField
      v-else-if="field.type === 'radios'"
      :field="field"
    />
    <SelectField
      v-else-if="field.type === 'select'"
      :field="field"
    />
    <TextAreaField
      v-else-if="field.type === 'textArea'"
      :field="field"
    />
    <span v-else-if="field.type === 'submit'" />
    <UnknownField
      v-else
      :field="field"
    /> -->
  </div>
</template>

<script>
import TextField from './fieldtypes/TextField.vue';
import InputField from './fieldtypes/InputField.vue';
import CheckboxField from './fieldtypes/CheckboxField.vue';
import ChecklistField from './fieldtypes/ChecklistField.vue';
import LabelField from './fieldtypes/LabelField.vue';
import RadiosField from './fieldtypes/RadiosField.vue';
import SelectField from './fieldtypes/SelectField.vue';
import TextAreaField from './fieldtypes/TextAreaField.vue';
import UnknownField from './fieldtypes/UnknownField.vue';

export default {
  name: 'SpecifiedField',
  components: {
    TextField,
    InputField,
    CheckboxField,
    ChecklistField,
    LabelField,
    RadiosField,
    SelectField,
    TextAreaField,
    UnknownField,
  },
  props: {
    field: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style scoped>
</style>
