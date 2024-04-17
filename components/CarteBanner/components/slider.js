import {toRefs, onMounted, onUnmounted, ref, computed} from 'vue'
import Navigation from './navigation.js'
import RestaurantCard from './restaurantCard.js'

export default {
	name: 'Slider',
	components: {
		Navigation,
		RestaurantCard
	},
	props: {
		items: Array,
		navigationContainerID: String
	},
	setup(props) {
		const {items, navigationContainerID} = toRefs(props)
		const isMounted = ref(false)
		const currSlide = ref(0)
		const breakpoints = [
			{width: 540, count: 1},
			{width: 768, count: 2},
			{width: 1241, count: 3}
		]

		const useSlidesCount = () => {
			return (
				breakpoints.find(({width}) => {
					return window.innerWidth < width
				})?.count || 4
			)
		}

		const nextSlide = () => {
			++currSlide.value
		}

		const prevSlide = () => {
			--currSlide.value
		}

		const slidesOnScreen = ref(useSlidesCount())

		const handleWindowSizeChange = () => {
			slidesOnScreen.value = useSlidesCount()
			currSlide.value = 0
		}

		onMounted(async () => {
			window.addEventListener('resize', handleWindowSizeChange)
			if (document.getElementById(navigationContainerID.value)) {
				isMounted.value = true
			}
		})

		onUnmounted(() => {
			window.removeEventListener('resize', handleWindowSizeChange)
		})

		const slidesCount = computed(() => {
			return items?.value?.length || 0
		})

		const backgroundOffset = computed(() => {
			return `${100 * currSlide.value}% 120%`
		})

		const sliderOffset = computed(() => {
			return `translateX(${-(100 / slidesOnScreen.value) * currSlide.value}%)`
		})

		const slideWidth = computed(() => {
			return `${100 / slidesOnScreen.value}%`
		})

		const disableNextBtn = computed(() => {
			return currSlide.value === slidesCount.value - slidesOnScreen.value
		})

		const disablePrevBtn = computed(() => {
			return currSlide.value === 0
		})

		return {
			items,
			isMounted,
			currSlide,
			nextSlide,
			prevSlide,
			disablePrevBtn,
			disableNextBtn,
			slidesCount,
			slidesOnScreen,
			backgroundOffset,
			navigationContainerID,
			sliderOffset,
			slideWidth
		}
	},
	template: `
	<teleport v-if="isMounted && navigationContainerID" :to="'#'+navigationContainerID">
		<Navigation @nextSlide="nextSlide" @prevSlide="prevSlide" :disableNextBtn="disableNextBtn" :disablePrevBtn="disablePrevBtn"></Navigation>
	</teleport>
    <div v-if="items" class="slider" :style="{ 'background-position': backgroundOffset }">
		<div class="slider__container" :style="{ transform: sliderOffset}">
			<div class="slider__item" v-for="item in items" :key="item.id" :style="{ 'width': slideWidth }">
				<RestaurantCard :item="item"></RestaurantCard>
			</div>
		</div>
	</div>
    `
}
