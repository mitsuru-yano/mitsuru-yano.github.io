console.log(
	[...document.getElementsByClassName('slunch-item')].map((el) => {
		const title = el.children[0].children[1].innerText
		const url = el.children[0].href
		const imagePath = el.children[0].style.backgroundImage
		const address = el.children[0].children[2].innerText
		const schedule = el?.children[0]?.children[3]?.innerText
		const dishes = [...el.children[1].children].map((el) => {
			const title = el.children[0].innerText
			const price = el.children[1].innerText
			return {title, price}
		})
		const totalPrice = el.children[2].innerText

		return {title, address, url, schedule, dishes, imagePath, totalPrice}
	})
)
