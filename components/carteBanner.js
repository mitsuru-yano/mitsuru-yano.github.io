import {toRefs} from 'vue'

export default {
	name: 'CarteBanner',
	props: {
		headingText: String,
		headingLink: String,
		imageSource: String,
		portalId: String
	},
	setup(props) {
		const {headingText, headingLink, imageSource, portalId} = toRefs(props)

		return {
			headingText,
			headingLink,
			imageSource,
			portalId
		}
	},
	template: `
    <link rel="stylesheet" href="./styles/c-banner.css" />
	<section class="c-banner">
	    <div class="c-banner__heading">
			<a class="c-banner__heading-title" :href="headingLink" target="_blank">
				{{headingText}}
			</a>
			<a class="c-banner__heading-logo" :href="headingLink" target="_blank">
				<img :src="imageSource" />
			</a>
			<div class="c-banner__heading-portal" :id="portalId"></div>
		</div>
		<slot name="content"></slot>
	</section>
    `
}
