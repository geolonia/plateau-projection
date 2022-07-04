export class OpacityControl {
	constructor(targetLayers) {
		this.targetLayers = targetLayers
	}
	onAdd(map) {
		const container = document.createElement('div')
		const label = document.createElement('label')
		const slider = document.createElement('input')
		container.appendChild(label)
		container.appendChild(slider)

		container.className = 'mapboxgl-ctrl mapboxgl-ctrl-group maplibregl-ctrl maplibregl-ctrl-group opacity-control-container'
		label.for = 'opacity-slider'
		label.textContent = 'Opacity: '
		slider.id = label.for
		slider.type = 'range'
		slider.min = 0
		slider.max = 1
		slider.step = 0.01
		slider.value = 0.8

		this.slider = slider
		slider.addEventListener('input', (e) => {
			const opacity = parseFloat(e.target.value)
			this.targetLayers.forEach(layer_id => map.setPaintProperty(layer_id, 'line-opacity', opacity))
		})
		return container
	}
	get opacity() {
		return this.slider.value
	}
	remove() {}
}

export class SatelliteToggleControl {
	constructor(targetLayer) {
		this.targetLayer = targetLayer
	}
	onAdd(map) {
		const container = document.createElement('div')
		const button = document.createElement('button')
		container.appendChild(button)

		container.className = 'mapboxgl-ctrl mapboxgl-ctrl-group maplibregl-ctrl maplibregl-ctrl-group sattelite-toggle-control-container'
		button.textContent = '🛰'
		button.addEventListener('click', () => {
			const nextVisibility = map.getLayoutProperty(this.targetLayer, 'visibility') === 'none' ? 'visible' : 'none'
			map.setLayoutProperty(this.targetLayer, 'visibility', nextVisibility)
		})
		return container
	}
}