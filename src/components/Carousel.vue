<template>
  <div>
    <b-carousel id="carousel1"
                style="text-shadow: 1px 1px 2px #333;"
                controls
                indicators
                background="#ababab"
                :interval="5000"
                img-width="1024"
                :img-height="carouselHeight"
                v-model="slide"
                @sliding-start="onSlideStart"
                @sliding-end="onSlideEnd"
    >
      <b-carousel-slide caption="Charts.fm"
                        text="Create charts based on your Last.fm account."
                        :img-src="images[0]"
                        :img-height="carouselHeight"
      ></b-carousel-slide>
      <b-carousel-slide caption="Weekly.fm"
                        text="Weekly charts."
                        :img-src="images[1]"
                        :img-height="carouselHeight"
      ></b-carousel-slide>
      <b-carousel-slide caption="Soon" 
                        text="More features coming soon..." 
                        img-blank 
                        img-alt="Soon"
      ></b-carousel-slide>
    </b-carousel>
  </div>
</template>

<script>
export default {
  data() {
    return {
      slide: 0,
      sliding: null,
      windowWidth: 0,
      carouselHeight: 250,
      images: [
        'https://picsum.photos/1024/250/?image=52',
        'https://picsum.photos/1024/250/?image=54',
      ],
    };
  },
  methods: {
    onSlideStart(slide) {
      this.sliding = true;
    },
    onSlideEnd(slide) {
      this.sliding = false;
    },
    getWindowWidth(event) {
      this.windowWidth = document.documentElement.clientWidth;
    },
  },
  mounted() {
    this.$nextTick(function() {
      window.addEventListener('resize', this.getWindowWidth);
      this.getWindowWidth();
    });
  },
  watch: {
    windowWidth() {
      if (this.windowWidth < 500) {
        this.carouselHeight = 500;
        this.images = [
          'https://picsum.photos/1024/500/?image=52',
          'https://picsum.photos/1024/500/?image=54',
        ];
      } else if (this.windowWidth < 650) {
        this.carouselHeight = 350;
        this.images = [
          'https://picsum.photos/1024/350/?image=52',
          'https://picsum.photos/1024/350/?image=54',
        ];
      } else {
        this.carouselHeight = 250;
        this.images = [
          'https://picsum.photos/1024/250/?image=52',
          'https://picsum.photos/1024/250/?image=54',
        ];
      }
    },
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.getWindowWidth);
  },
};
</script>
