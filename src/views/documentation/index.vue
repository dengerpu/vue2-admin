<template>
  <div>
    <d-select :value="value"></d-select>
  </div>
</template>

<script>
import DSelect from '@/DElemmentUi/DSelect'
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Documentation',
  components: { DSelect },
  props: {},
  data() {
    return {
      value: ''
    }
  },
  methods: {}
}
</script>

<style lang="scss" scoped></style>
