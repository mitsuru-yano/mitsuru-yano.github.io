import {toRefs} from 'vue'

export default {
	name: 'RestaurantCard',
	props: {
		item: Object
	},
	setup(props) {
		const {title, address, url, schedule, dishes, imagePath, totalPrice} = toRefs(
			props.item
		)

		return {
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
	<div class="restaurant-item">
		<div class="restaurant-item__heading">
			<a :href="url" class="restaurant-item__heading-content" :style="{ backgroundImage: imagePath }">
				<span class="restaurant-item__background"></span>
				<div v-if="title" class="restaurant-item__title">{{title}}</div>
				<div v-if="address" class="restaurant-item__address">{{address}}</div>
				<div v-if="schedule" class="restaurant-item__schedule">{{schedule}}</div>
			</a>
		</div>
		<ul class="restaurant-item__menu">
			<li class="restaurant-item__dish" v-for="dish in dishes" :key="dish.id">
				<span class="restaurant-item__dish-title" :class="{ active: dish.price }">{{dish.title}}</span>
				<span v-if="dish.price" class="restaurant-item__dish-price">{{dish.price}}</span>
			</li>
		</ul>
		<span class="restaurant-item__total">{{totalPrice}}</span>
	</div>
	`
}
