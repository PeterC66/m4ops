<template>
  <div>
    <TextField
      v-if="field.type === 'input'"
      :field="field"
    />
    <CheckboxField v-else-if="field.type === 'checkbox'" />
    <ChecklistField v-else-if="field.type === 'checklist'" />
    <LabelField v-else-if="field.type === 'label'" />
    <RadiosField v-else-if="field.type === 'radios'" />
    <SelectField v-else-if="field.type === 'select'" />
    <TextAreaField v-else-if="field.type === 'textArea'" />
    <span v-else-if="field.type === 'submit'" />
    <UnknownField v-else />
  </div>
</template>

<script>
import TextField from './fieldtypes/TextField.vue';
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
  .resultsProperty {color: DarkCyan; margin-bottom: 1px;}
  .resultsPropertyValue {color: black;}
</style>
