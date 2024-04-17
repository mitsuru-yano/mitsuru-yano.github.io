import {toRefs, ref, onMounted, computed} from 'vue'
import Slider from './components/slider.js'

export default {
	name: 'CarteBanner',
	components: {
		Slider
	},
	props: {
		relativePath: String
	},
	setup(props) {
		const {relativePath} = toRefs(props)
		const restaurants = ref(null)

		const portalID = 'carte-nav'
		const headingText = 'Бизнес-ланчи в Витебске'
		const headingLink = 'https://carte.by/vitebsk/'

		const dataUrl = computed(() => {
			return `${relativePath.value}data/index.json`
		})

		const imageUrl = computed(() => {
			return `${relativePath.value}images/carteLogo.svg`
		})

		const cssUrl = computed(() => {
			return `${relativePath.value}styles/index.css`
		})

		onMounted(async () => {
			try {
				const res = await fetch(dataUrl.value)

				if (!res.ok) {
					throw Error(res.statusText)
				}

				const data = await res.json()
				restaurants.value = data
			} catch (err) {
				console.error(err)
			}
		})

		return {
			headingText,
			headingLink,
			restaurants,
			portalID,
			cssUrl,
			imageUrl
		}
	},

	template: `
	<link rel="stylesheet" :href="cssUrl">
	<section class="c-banner">
	    <div class="c-banner__heading">
			<a class="c-banner__heading-title" :href="headingLink" target="_blank">
				{{headingText}}
			</a>
			<a class="c-banner__heading-logo" :href="headingLink" target="_blank">
				<img :src="imageUrl" />
			</a>
			<div class="c-banner__heading-portal" :id="portalID"></div>
		</div>
		<Slider :items="restaurants" componentName="RestaurantCard" :navigationContainerID="portalID"></Slider>
	</section>
    `
}
