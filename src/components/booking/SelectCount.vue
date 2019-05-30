<template>
    <dl class="selectCount">
        <slot name="dt"></slot>
        <dd>
            <select-box>
                <slot></slot>
            </select-box>
        </dd>
    </dl>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';
    import SelectBox from '@/components/form/SelectBox.vue';

    @Component({
        components : {
            SelectBox
        }
    })
    export default class SelectCount extends Vue{

    }
</script>

<style scoped>

</style>