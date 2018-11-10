<template>
  <section style="position: relative">
    <div class="level">
      <div class="level-left">
        <div class="level-item">
          <HeaderL1 />
        </div>
      </div>
      <h1
        id="mainhead"
        class="level-item has-text-centered">
        <b-tooltip
          label="Open the forum for Mapping for One-Place Studies"
          position="is-right"
          multilined>
          <a
            href="http://mapping4ops.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            M4OPS: Mapping for One-Place Studies
          </a>
        </b-tooltip>
      </h1>

      <div class="level-right">
        <div class="level-item">
          <HeaderR1 />
        </div>
      </div>
    </div>

    <div class="level">
      <div class="level-left">
        <div class="level-item">
          <HeaderL2 />
        </div>
      </div>
      <div
        class="level-item">
        <b-tooltip
          label="Click for details of this OPS"
          position="is-left"
          multilined>
          <button
            style="color: lightgreen; text-decoration: none;"
            class="button is-text has-text-centered"
            @click="tellMe()">
            Maps for {{ placename }}
          </button>
        </b-tooltip>
      </div>
      <div class="level-right">
        <div class="level-item">
          <HeaderR2 />
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import HeaderR1 from './HeaderR1.vue';
import HeaderR2 from './HeaderR2.vue';
import HeaderL1 from './HeaderL1.vue';
import HeaderL2 from './HeaderL2.vue';

export default {
  name: 'Header',
  components: {
    HeaderR1,
    HeaderR2,
    HeaderL1,
    HeaderL2,
  },
  props: {
    opsdetails: {
      type: Object,
      required: true,
    },
  },
  computed: {
    placename() {
      return this.opsdetails ?
        `${this.opsdetails.OPSCode}) ${this.opsdetails.OPSName}` :
        '(Unknown)';
    },
  },
  methods: {
    tellMe() {
      console.log('tellMe');
    },
  },
};
</script>

<style scoped>
  .level:not(:last-child) {margin-bottom: 0.2rem;};
  button span {color: red};
</style>
