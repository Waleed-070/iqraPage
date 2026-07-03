gsap.registerPlugin(DrawSVGPlugin);

const container = document.querySelector(".container");
const slides = gsap.utils.toArray(".container svg");
const progressBar = document.querySelector(".progress-bar-inner");
const playToggle = document.querySelector(".play-toggle");
const prevBtn = document.querySelector(".prev-button");
const nextBtn = document.querySelector(".next-button");

let currentSlideIndex = 0;

/* ---------------------------
   UI: preview + counter
--------------------------- */
const totalSlides = slides.length;
const previewTemplates = slides.map((svg) => svg.cloneNode(true)); // clone BEFORE we mutate styles

const ui = initSliderUI(container);
updateUI(0);

function pad2(n) {
	return String(n).padStart(2, "0");
}

function updateUI(activeIndex) {
	if (ui.counterEl) {
		ui.counterEl.textContent = `${pad2(activeIndex + 1)} / ${pad2(totalSlides)}`;
	}

	if (ui.previewEl) {
		ui.previewEl.replaceChildren(
			makeMiniSvg(previewTemplates[activeIndex], `mini-${activeIndex}-`)
		);
	}
}

function initSliderUI(containerEl) {
	// If you already have markup, just create elements with these classes:
	// .slider-ui, .svg-preview, .slide-counter
	let wrap = document.querySelector(".slider-ui");
	let previewEl = document.querySelector(".svg-preview");
	let counterEl = document.querySelector(".slide-counter");

	if (!wrap) {
		wrap = document.createElement("div");
		wrap.className = "slider-ui";

		previewEl = document.createElement("div");
		previewEl.className = "svg-preview";

		counterEl = document.createElement("div");
		counterEl.className = "slide-counter";

		wrap.append(previewEl, counterEl);

		if (containerEl) containerEl.insertAdjacentElement("beforebegin", wrap);
		else document.body.prepend(wrap);
	}

	return { wrap, previewEl, counterEl };
}

function makeMiniSvg(templateSvg, prefix) {
	const mini = templateSvg.cloneNode(true);

	// Avoid ID collisions in <defs> (gradients, clipPaths, filters, etc.)
	prefixSvgIds(mini, prefix);

	// Remove any slide-active classes
	mini.classList.remove("is-active");

	// Make sure fills are visible in preview (since original slides get fillOpacity=0)
	mini
		.querySelectorAll("path, rect, circle, ellipse, polygon, polyline, line")
		.forEach((el) => {
			const fill = el.getAttribute("fill");
			if (fill && fill !== "none") el.style.fillOpacity = 1;
		});

	mini.setAttribute("aria-hidden", "true");
	mini.setAttribute("focusable", "false");

	return mini;
}

function prefixSvgIds(svgEl, prefix) {
	const idMap = new Map();
	const all = svgEl.querySelectorAll("*");

	// Collect IDs
	all.forEach((node) => {
		const id = node.getAttribute && node.getAttribute("id");
		if (id) {
			const nextId = prefix + id;
			idMap.set(id, nextId);
			node.setAttribute("id", nextId);
		}
	});

	if (!idMap.size) return;

	const refAttrs = [
		"fill",
		"stroke",
		"filter",
		"clip-path",
		"mask",
		"marker-start",
		"marker-mid",
		"marker-end",
		"href",
		"xlink:href",
		"style"
	];

	// Replace url(#id) and #id references
	all.forEach((node) => {
		if (!node.getAttribute) return;

		refAttrs.forEach((attr) => {
			const val = node.getAttribute(attr);
			if (!val) return;

			let nextVal = val;

			// url(#id)
			nextVal = nextVal.replace(/url\(#([^)]+)\)/g, (m, id) => {
				const mapped = idMap.get(id);
				return mapped ? `url(#${mapped})` : m;
			});

			// plain "#id" (mostly for href/use)
			if (nextVal.startsWith("#")) {
				const key = nextVal.slice(1);
				const mapped = idMap.get(key);
				if (mapped) nextVal = `#${mapped}`;
			}

			if (nextVal !== val) node.setAttribute(attr, nextVal);
		});
	});
}

/* ---------------------------
   Existing slider logic
--------------------------- */

// master timeline for all slides
const master = gsap.timeline({ repeat: -1 });

slides.forEach((svg, index) => {
	let paths = Array.from(svg.querySelectorAll("path, circle, rect, polygon, polyline, ellipse, line"));
	
	// Exclude elements inside <defs> to avoid getBBox errors
	paths = paths.filter(p => !p.closest("defs"));

	// Temporarily show svg to compute bounding boxes correctly
	const oldVis = svg.style.visibility;
	svg.style.visibility = "visible";

	paths.sort((a, b) => {
		try {
			const aBox = a.getBBox();
			const bBox = b.getBBox();
			// Sort by bottom edge descending (highest Y first)
			return (bBox.y + bBox.height) - (aBox.y + aBox.height);
		} catch (e) {
			return 0;
		}
	});

	svg.style.visibility = oldVis;

	paths.forEach((p) => {
		const fill = p.getAttribute("fill") || "#000";
		p.dataset.fill = fill;

		p.style.fill = fill;
		p.style.fillOpacity = 0;

		p.style.stroke = fill;
		p.style.strokeWidth = 2; // Reduced slightly for dense SVGs
		p.style.strokeLinecap = "round";
		p.style.strokeLinejoin = "round";
		// Removed vectorEffect = "non-scaling-stroke" to fix Chrome blur bug
	});

	gsap.set(paths, { 
		drawSVG: 0,
		x: "random(-200, 200)", // fly in from all directions horizontally
		y: "random(-200, 200)", // fly in from all directions vertically
		opacity: 0
	});

	master.addLabel(`slide-${index}`);

	const slideTl = gsap.timeline({
		defaults: { duration: 1, ease: "none" },
		onStart() {
			currentSlideIndex = index;
			slides.forEach((s) => s.classList.remove("is-active"));
			svg.classList.add("is-active");

			updateUI(index);

			gsap.set(progressBar, {
				scaleX: 0,
				transformOrigin: "left center"
			});
		}
	});

	// Calculate dynamic stagger so complex SVGs don't take forever
	const staggerAmount = Math.min(0.08, 3 / paths.length);

	// SVG Animation (creation)
	slideTl
		.to(paths, { 
			drawSVG: "100%", 
			x: 0,
			y: 0,
			opacity: 1,
			ease: "power2.out",
			stagger: staggerAmount 
		}, 0)
		.to(paths, { duration: 0.5, fillOpacity: 1, strokeOpacity: 0, stagger: staggerAmount }, "<20%")
		// Uncreate animation (fly out and fade out)
		.to(paths, {
			duration: 1,
			drawSVG: 0,
			x: "random(-200, 200)",
			y: "random(-200, 200)",
			opacity: 0,
			fillOpacity: 0,
			ease: "power2.in",
			stagger: staggerAmount
		}, "+=1.5"); // Pause for 1.5 seconds before uncreating

	// progress bar for this slide (match slide duration)
	const slideDur = slideTl.duration();
	slideTl.to(progressBar, { scaleX: 1, duration: slideDur }, 0);

	master.add(slideTl);
});

if (playToggle) {
	playToggle.addEventListener("click", () => {
		const icon = playToggle.querySelector(".bi");
		master.paused(!master.paused());

		const isPaused = master.paused();
		if (icon) {
			icon.classList.toggle("bi-pause", !isPaused);
			icon.classList.toggle("bi-play", isPaused);
		}
	});
}

if (nextBtn) {
	nextBtn.addEventListener("click", () => {
		let nextSlide = (currentSlideIndex + 1) % slides.length;
		master.play(`slide-${nextSlide}`);
		
		const icon = playToggle.querySelector(".bi");
		if (icon) {
			icon.classList.remove("bi-play");
			icon.classList.add("bi-pause");
		}
	});
}

if (prevBtn) {
	prevBtn.addEventListener("click", () => {
		let prevSlide = (currentSlideIndex - 1 + slides.length) % slides.length;
		master.play(`slide-${prevSlide}`);
		
		const icon = playToggle.querySelector(".bi");
		if (icon) {
			icon.classList.remove("bi-play");
			icon.classList.add("bi-pause");
		}
	});
}
