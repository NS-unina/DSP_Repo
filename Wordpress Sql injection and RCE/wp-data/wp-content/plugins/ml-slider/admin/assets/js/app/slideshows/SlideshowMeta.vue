<template>
<a
    :ref="'sl-meta' + slideshow.id"
	:href="this.metasliderPage + '&amp;id=' + slideshow.id"
	@click.prevent="loadSlideshow()"
	class="shadow-none outline-none flex items-start p-4 px-2 group hover:bg-blue-highlight">
	<div class="mx-2 w-16 h-16 bg-gray-light">
		<div
			v-if="visibleSlides.length && includeImages"
			class="relative w-16 h-16">
			<img
				:src="slide.thumbnail"
				:key="slide.id"
				v-for="(slide, key) in visibleSlides"
				:class="{ 'opacity-0': key !== currentSlideImage }"
				class="absolute block inset-0 transition-all duration-1000 ease-linear">
		</div>
		<div
			v-else-if="includeImages"
			class="border border-gray-dark flex w-16 h-16 items-center justify-center p-2 text-center text-red text-xs">
			{{ __('No slides', 'ml-slider') }}
		</div>
	</div>
	<div class="px-2 flex-grow truncate">
		<div class="flex pb-2 border-b border-gray-light group-hover:border-gray w-full truncate align-end">
			<span
				v-if="slideshow.id === current.id"
				class="uppercase rounded bg-gray-darkest text-white text-xs px-1 mr-2 rtl:mr-0 rtl:ml-2">{{ __('Current', 'ml-slider') }}</span>
			<h4 class="truncate text-base font-thin m-0 p-0 text-gray-darker group-hover:text-black">
				{{ slideshow.title }}
			</h4>
		</div>
		<p class="text-gray group-hover:text-gray-darker text-xs m-0 mt-1 whitespace-normal">
			id: #{{ slideshow.id }} <span class="text-black">&middot;</span>
			{{ setting('width') }}x{{ setting('height') }} <span class="text-blackest">&middot;</span>
			{{ sprintf(_x('%s slides', 'number of slides, ex "7 slides"', 'ml-slider'), slideshow.slides.length) }} <span class="text-blackest">&middot;</span>
			<span :title="slideshow.modified_at_gmt">{{ sprintf(__('last updated: %s', 'ml-slider'), modifiedAt()) }}</span>
		</p>
	</div>
</a>
</template>

<script>
import { DateTime } from "luxon"
import { mapGetters } from 'vuex'
export default {
	props: {
		slideshow: {
			type: Object,
			default: () => {}
		},
		includeImages: {
			type: Boolean,
			default: true
		}
	},
	data() {
		return {
			currentSlideImage: 0,
            slideshowPaused: true,
            slideshowTimer: 0
		}
	},
	computed: {
		visibleSlides() {
            if (!this.slideshow?.slides?.length) {
                return []
            }
			return this.slideshow.slides.filter(slide => slide?.thumbnail)
		},
		...mapGetters({
			current: 'slideshows/getCurrent'
		})
	},
	created() {
        this.currentSlideImage = Math.floor(Math.random() * (this.visibleSlides.length))
    },
	mounted() {
        this.$refs['sl-meta' + this.slideshow.id].addEventListener('mouseenter', () => {
            clearTimeout(this.slideshowTimer)
            this.slideshowPaused && this.startSlideshow()
            this.slideshowPaused = false
        })
        this.$refs['sl-meta' + this.slideshow.id].addEventListener('mouseleave', () => {
            clearTimeout(this.slideshowTimer)
            this.slideshowPaused = true
        })
	},
	methods: {
		startSlideshow() {
			const slide = () => {
                if (this.slideshowPaused) return
				this.currentSlideImage = (this.currentSlideImage === (this.visibleSlides.length - 1)) ?
					0 : this.currentSlideImage + 1
				this.slideshowTimer = setTimeout(() => { requestAnimationFrame(slide) }, 1100)
			}
			requestAnimationFrame(slide)
		},
		setting(item) {
			return this.slideshow.settings && this.slideshow.settings.hasOwnProperty(item)
				? this.slideshow.settings[item] : '';
		},
		modifiedAt() {
			return DateTime
				.fromSQL(this.slideshow.modified_at_gmt, {zone: 'utc'})
				.setLocale(metaslider.locale)
				.toRelative()
		},
		loadSlideshow() {
			window.location.replace(this.metasliderPage + '&id=' + this.slideshow.id)
		},
	}
}
</script>

<style lang="scss">
	.highlighted-slideshow-nav {
		.text-gray {
			color: #606f7b !important;
		}
		.border-gray-light {
			border-color: #b8c2cc !important
		}
	}
</style>
