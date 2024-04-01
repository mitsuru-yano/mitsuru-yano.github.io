import {toRefs, toRef} from 'vue'

export default {
	props: {
		item: Object
	},
	setup(props) {
		const {id, title, address, url, schedule, dishes, imagePath, totalPrice} = toRefs(
			props.item
		)

		return {
			id,
			title,
			address,
			url,
			schedule,
			dishes,
			imagePath,
			totalPrice
		}
	},
	template: `
	<!--html-->

	<div class="c-banner__item">
		<div class="c-banner__item-heading">
			<a v-bind:href="url" class="c-banner__item-heading-content" v-bind:style="{ backgroundImage: imagePath }">
				<span class="c-banner__item-background"></span>
				<div v-if="title" class="c-banner__item-title">{{title}}</div>
				<div v-if="address" class="c-banner__item-address">{{address}}</div>
				<div v-if="schedule" class="c-banner__item-schedule">{{schedule}}</div>
			</a>
		</div>
		<ul class="c-banner__item-menu">
			<li class="c-banner__item-dish" v-for="dish in dishes">
				<span class="c-banner__item-dish-title" v-bind:class="{ active: dish.price }">{{dish.title}}</span>
				<span v-if="dish.price" class="c-banner__item-dish-price">{{dish.price}}</span>
			</li>
		</ul>
		<span class="c-banner__item-total">{{totalPrice}}</span>
	</div>`
}
