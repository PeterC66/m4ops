<template>

  <div
    id="resultsOpenButtonDiv"
    :class="classObject"
  >
    <b-tooltip
      label="Open all these results in a new window"
      position="is-left"
      multilined>
      <button
        style="color: lightgreen; text-decoration: none;"
        class="button is-text has-text-centered"
        @click="openResultsWindow()"
      >
        <span class="icon">
          <font-awesome-icon :icon="['fas','book-open']"/>
        </span>
      </button>
    </b-tooltip>
  </div>

  <!-- eslint-disable max-len -->
<!-- function openResultsWindow() {
  var htmlTop = "<!DOCTYPE html><html><head><title>XX</title>";
  // These are constants From PDC's Sozi qv
  htmlTop += "<script language=javascript>";
  htmlTop += "function CloseWindow() {window.open('','_self',''); window.close(); }";
  htmlTop += "function cancelBubble(e) {var event = e ? e:window.event;";
  htmlTop +=    "if (event.stopPropagation) event.stopPropagation();";
  htmlTop +=    "if (event.cancelBubble!=null) event.cancelBubble = true;}"
  htmlTop += "</script>";
  htmlTop += "</head><body style='background: #EEF2E9 url(images/backdrop.png) repeat-x;'>";
  var htmlTail = '</body></html>';
  var reOpenButtonText = /<div id=\"resultsOpenButtonDiv\"[\s\S]*?\/div>/g // Need a Regexp so more than the first are changed
  var closeButtonText = '<button name="close_button" onclick="CloseWindow();" title="Click anywhere up here to close the image." style="float:right;  margin-top: 2px;">Close </button>';
  var htmlFull = htmlTop + htmlForResultsToShow.replace(reOpenButtonText,closeButtonText) + htmlTail;
  openHTML(htmlFull,"Results");
} -->
  <!-- eslint-enable max-len -->

</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'OpenButton',
  computed: {
    ...mapState({
      showLevel: state => state.demo.showLevel,
    }),
    classObject() {
      return {
        highlight: this.showLevel === 6300,
        'ol-control': true,
      };
    },
  },
  methods: {
    openResultsWindow() {
      console.log('openResultsWindow'); // eslint-disable-line no-console
    },
  },
};
</script>

<style scoped>
#resultsOpenButtonDiv {position: absolute; top: 0px; right: 0px;}
#resultsOpenButton {font-size: 0.9em;}
</style>
