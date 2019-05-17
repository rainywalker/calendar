<template>
  <div class="home">
      <body-wrap></body-wrap>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import BodyWrap from '@/components/BodyWrap.vue'; // @ is an alias to /src

@Component({
  components: {
    BodyWrap,
  },
})
export default class Home extends Vue {}
</script>
