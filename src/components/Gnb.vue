<template>
    <nav>
        <div class="navWrap">
            <h1>실험실 펜션</h1>
            <ul class="routes">
                <li v-for="(item,i) in routeURI" :key="i">
                    <router-link :to="item.uri">{{item.label}}</router-link>
                </li>
            </ul>
        </div>
    </nav>
</template>

<script lang="ts">
    import {Component, Vue, Prop} from 'vue-property-decorator';

    @Component
    export default class Gnb extends Vue{
        @Prop(Array) routeURI! : Array<object>;
    }
</script>

<style scoped lang="scss">
nav{
    box-shadow: 1px 1px 5px #999;
    .navWrap{
        width:1150px;padding:20px;margin:0 auto;display: flex;justify-content: space-between;align-items: center;
        .routes{
            display: flex;
            li{
                margin-left:2em;
                a{
                    display: inline-block;padding:10px 15px;
                    &.router-link-exact-active{background: red;border-radius: 20px;color:#fff;}
                    &:hover{transition: all 0.4s ease-in}
                }

            }
        }
    }


}
</style>