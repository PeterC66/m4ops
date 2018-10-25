import Vue from 'vue';

const getChildrenTextContent = children => children.map(node => (node.children
  ? getChildrenTextContent(node.children)
  : node.text)).join('');

export default Vue.component('anchored-heading', {
  props: {
    level: {
      type: Number,
      required: true,
    },
  },
  render(createElement) {
    // create kebab-case id
    const headingId = getChildrenTextContent(this.$slots.default)
      .toLowerCase()
      .replace(/\W+/g, '-')
      .replace(/(^-|-$)/g, ''); // was .replace(/(^\-|\-$)/g, '');

    return createElement(
      `h${this.level}`,
      [
        createElement('a', {
          attrs: {
            name: headingId,
            href: `#${headingId}`,
          },
        }, this.$slots.default),
      ],
    );
  },
});
