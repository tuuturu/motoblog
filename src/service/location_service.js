import axios from 'axios'

const API_KEY = process.env.VUE_APP_GEOCODING_API_KEY

export default {
	async getLocationFromCoords(coords) {
		const lat = coords[0]
		const long = coords[1]

		const { data } = await axios.request({
			url: `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${long}&key=${API_KEY}`
		})

		const location = {
			country: data.results[data.results.length - 1].formatted_address,
		}

		for (let index = 0; index < data.results[0].address_components.length; index++) {
			const component = data.results[0].address_components[index]

			if (component.types.indexOf('locality') !== -1) {
				location.town = component.long_name

				break;
			}

			if (component.types.indexOf('postal_town') !== -1) {
				location.town = component.long_name
			}
		}

		return location
	}
}
