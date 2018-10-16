<template>
  <div id="buttonsR2">
    <el-form
      :inline="true"
      :model="formInline"
    >
      <el-tooltip
        class="item"
        effect="light"
        content="Text to be searched for within open features,
        or coordinates to go to (any format).  If blank will ask."
        placement="left">
        <el-form-item>
          <el-input
            v-model="formInline.textForSearchOrCoords"
            placeholder="Text or Coords to GoTo"
          />
        </el-form-item>
      </el-tooltip>
      <el-form-item>
        <el-tooltip
          class="item"
          effect="light"
          content="GoTo as specified"
          placement="left-end">
          <el-button
            type="primary"
            size="medium"
            icon="el-icon-search"
            @click="tellMe()"
          />
        </el-tooltip>
      </el-form-item>
      <el-form-item>
        <el-tooltip
          class="item"
          effect="light"
          content="Make the current view of M4OPS available as a URL to copy"
          placement="bottom-start">
          <el-button
            type="primary"
            size="medium"
            @click="tellMe()"
          >
            <font-awesome-icon :icon="['far','clone']"/>
          </el-button>
        </el-tooltip>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import './Header.css';

export default {
  name: 'HeaderR2',
  data() {
    return {
      formInline: {
        textForSearchOrCoords: '',
      },
    };
  },
  methods: {
    tellMe() {
      console.log('tellMe');
    },
  },
};
</script>

<style>

</style>
