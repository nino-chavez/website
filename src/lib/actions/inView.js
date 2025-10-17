/**
 * Svelte action for intersection observer
 * @param {HTMLElement} node
 * @param {Object} options
 * @returns {Object}
 */
export function inView(node, options = {}) {
	const {
		threshold = 0.1,
		rootMargin = '0px',
		once = true
	} = options;

	let hasEntered = false;

	const observer = new IntersectionObserver(
		(entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting && (!once || !hasEntered)) {
					hasEntered = true;
					node.dispatchEvent(new CustomEvent('enter', {
						detail: { entry }
					}));
				} else if (!entry.isIntersecting && !once) {
					node.dispatchEvent(new CustomEvent('exit', {
						detail: { entry }
					}));
				}
			});
		},
		{ threshold, rootMargin }
	);

	observer.observe(node);

	return {
		destroy() {
			observer.disconnect();
		},
		update(newOptions) {
			observer.disconnect();
			Object.assign(options, newOptions);
			observer.observe(node);
		}
	};
}
