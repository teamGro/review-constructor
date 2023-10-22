<template>
    <div class="container">
        <button
            class="btn btn-start"
            :disabled="computedFirstBlockExist"
            @click="drawBlock"
        >
            Начать
        </button>
        <v-stage :config="configKonva">
            <v-layer>
                <block-element
                    v-for="block in computedBlocks"
                    :key="block.id"
                    :config="block"
                >
                </block-element>
                <arrow-element
                    v-for="con in computedConnectors"
                    :key="con.id"
                    :config="con"
                >
                </arrow-element>

                <!--<v-group :config="grpSet">
          <v-rect :config="rectSett"></v-rect>
          <v-text :config="textSet"></v-text>
        </v-group>-->
            </v-layer>
        </v-stage>
    </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex';

import BlockElement from '@/components/BlockElement.vue';
import ArrowElement from './components/ArrowElement.vue';

export default {
    name: 'App',
    components: { BlockElement, ArrowElement },
    data() {
        return {
            pageWidth: null,
            pageHeight: null,
            configKonva: {
                width: window.innerWidth,
                height: window.innerHeight - 60,
            },
            isFirstBlockExist: false,
            forceRenderKey: 1,
            //rectSett: {
            //    x: 0,
            //    y: 0,
            //    width: 100,
            //    height: 50,
            //    fill: 'green',
            //    stroke: 'black',
            //    strokeWidth: 4,
            //},
            //textSet: {
            //    x: 0,
            //    y: 0,
            //    text: '\uf067',
            //    fontSize: 20,
            //    fontFamily: 'FontAwesome',
            //    fill: 'black',
            //},
            //grpSet: {
            //    x: 20,
            //    y: 20,
            //    draggable: true,
            //    width: 100,
            //    height: 50,
            //},
        };
    },
    methods: {
        drawBlock() {
            const title = prompt('enter title');
            console.log(title);
            if (!title) return;
            this.$store.commit('addBlock', { title });
            this.isFirstBlockExist = true;
        },
    },
    computed: {
        ...mapGetters(['getBlocks']),
        ...mapState(['blocks', 'connectors']),
        computedBlocks() {
            return Array.from(this.blocks?.values() || []);
        },
        computedConnectors() {
            return Array.from(this.connectors?.values() || []);
        },
        computedFirstBlockExist() {
            return this.getBlocks.length > 0;
        }
    },
    mounted() {
        this.pageWidth = window.innerWidth;
        this.pageHeight = window.innerHeight - 60;
    },
};
</script>

<style lang="scss">
.container {
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.btn-start {
    height: 30px;
    margin-bottom: 30px;
    background-color: green;
}
</style>
