export default function checkboxValueDisplay(
  createElement,
  value,
  valueStyleClass,
) {
  const boxTickedOrNot = value ? '&#9745;' : '&#9744;';
  return createElement(
    'span',
    { class: valueStyleClass },
    boxTickedOrNot,
  );
}
