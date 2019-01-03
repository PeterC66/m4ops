<template>
  <vl-layer-vector :overlay="true">
    <vl-source-vector>
      <vl-feature :id="'mouse-' + rh?'RH':'Main'">
        <vl-geom-point :coordinates="position" />
        <vl-style-box>
          <VlStyleIcon
            :anchor="[10, 10]"
            anchor-xunits="pixels"
            anchor-yunits="pixels"
            src="../../../assets/images/cross.png"
          />
        </vl-style-box>
      </vl-feature>
    </vl-source-vector>
  </vl-layer-vector>
</template>

<script>
export default {
  name: 'MousePointer',
  props: {
    position: {
      type: Array,
      required: true,
    },
    rh: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style>

</style>
