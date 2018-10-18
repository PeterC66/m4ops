<template>
  <!-- opsdetails is an alias for place, used in the original M4OPS -->
  <div id="headertitles">
    <div id="headertitle">
      <h1 id="mainhead">
        <el-tooltip
          class="item"
          effect="light"
          content="Open the forum for Mapping for One-Place Studies"
          placement="right">
          <a
            href="http://mapping4ops.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            M4OPS: Mapping for One-Place Studies
          </a>
        </el-tooltip>
      </h1>
    </div>
    <div id="headersubtitleblock">
      <el-tooltip
        class="item"
        effect="light"
        content="Click for details of this OPS"
        placement="right-end">
        <el-button
          type="text"
          size="medium"
          @click="tellMe()"
        >
          Maps for {{ placeName }}
        </el-button>
      </el-tooltip>
    </div>
  </div>
</template>

<script>
import './HeaderTitles.css';

export default {
  name: 'HeaderTitles',
  props: {
    OPSDetails: {
      type: Object,
      required: true,
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

</style>

<!--

export default function HeaderTitles(props) {
  const { OPSDetails } = props ||
  { OPSDetails: { OPSCode: 'Unk', OPSName: 'Unknown' } };
  const placeName = `${OPSDetails.OPSCode} ${OPSDetails.OPSName}`;
  return (
    <Fragment>

    </Fragment>
  );
}
-->
