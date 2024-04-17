import {toRefs} from 'vue'

export default {
	name: 'Navigation',
	props: {
		disableNextBtn: Boolean,
		disablePrevBtn: Boolean
	},
	emits: ['nextSlide', 'prevSlide'],
	methods: {
		nextSlide() {
			this.$emit('nextSlide')
		},
		prevSlide() {
			this.$emit('prevSlide')
		}
	},
	setup(props) {
		const {disableNextBtn, disablePrevBtn} = toRefs(props)

		return {disableNextBtn, disablePrevBtn}
	},
	template: `
	<div class="navigation">
		<button @click="prevSlide()" class="navigation__arrow navigation__arrow--left"  :class="{ disabled: disablePrevBtn }"></button>
		<button @click="nextSlide()" class="navigation__arrow navigation__arrow--right" :class="{ disabled: disableNextBtn }"></button>
	</div>
	`
}
