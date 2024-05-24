import { defineComponent } from 'vue'

export const buttonProps = {
  color: String,
  textColor: String
}
const Button = defineComponent({
  name: 'BlossomButton',
  props: buttonProps,
  setup(props) {
    console.log(props)
  },
  render() {
    return (
      <button class="ljp-button">
        <slot></slot>
      </button>
    )
  }
})
export default Button
