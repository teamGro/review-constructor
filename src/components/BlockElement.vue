<template>
    <v-group
        :config="config"
        @click="drawChildrenBlock"
        @dragmove="moveBlock"
        @mousemove="onMouseMove"
        @mouseout="onMouseOut"
    >
        <v-rect :config="config.rect"></v-rect>
        <v-text :config="config.text"></v-text>
        <v-circle :config="circleTopConfig"></v-circle>
        <v-circle :config="circleLeftConfig"></v-circle>
        <v-circle :config="circleRightConfig"></v-circle>
        <v-circle :config="circleBottomConfig"></v-circle>
        <block-menu-element
            :group-visibility="blockVisibility"
            @show:title="showTitle"
            @change:title="changeTitle"
            @remove:block="removeBlock"
            @add:block="addBlock"
        ></block-menu-element>
    </v-group>
</template>

<script>
import BlockMenuElement from './BlockMenuElement.vue';

export default {
    components: { BlockMenuElement },
    props: {
        config: {
            type: Object,
        },
    },
    data() {
        return {
            circleTopConfig: {
                x: this.config.width / 2,
                y: 0,
                radius: 10,
                fill: 'red',
                opacity: 0,
            },
            circleLeftConfig: {
                x: 0,
                y: this.config.height / 2,
                radius: 10,
                fill: 'red',
                opacity: 0,
            },
            circleRightConfig: {
                x: this.config.width,
                y: this.config.height / 2,
                radius: 10,
                fill: 'red',
                opacity: 0,
            },
            circleBottomConfig: {
                x: this.config.width / 2,
                y: this.config.height,
                radius: 10,
                fill: 'red',
                opacity: 0,
            },
            blockVisibility: false,
        };
    },
    methods: {
        drawChildrenBlock() {
            this.blockVisibility = !this.blockVisibility;
        },
        getConnectorPoints(from, to) {
            const fromPos = from.position();
            const toPos = to.position();

            return [
                fromPos.x + from.attrs.width / 2,
                fromPos.y + from.attrs.height,
                toPos.x + to.attrs.width / 2,
                toPos.y,
            ];
        },
        moveBlock(e) {
            this.$store.commit('updateBlock', e.target.attrs);
        },
        onMouseMove() {
            this.circleTopConfig.opacity = 1;
            this.circleLeftConfig.opacity = 1;
            this.circleRightConfig.opacity = 1;
            this.circleBottomConfig.opacity = 1;
        },
        onMouseOut() {
            this.circleTopConfig.opacity = 0;
            this.circleLeftConfig.opacity = 0;
            this.circleRightConfig.opacity = 0;
            this.circleBottomConfig.opacity = 0;
        },
        showTitle() {
            alert(this.config.text.text);
        },
        changeTitle() {
            const title = prompt('enter new title');
            if (!title) return;
            this.$store.commit('updateTitle', { id: this.config.id, title });
        },
        removeBlock() {
            this.$store.commit('removeBlock', this.config.id);
        },
        addBlock() {
            const title = prompt('enter title');
            if (!title.trim()) return;
            const payload = {
                ...this.config,
                parentId: this.config.id,
                childrensId: [],
                y: this.config.y + 200,
                title,
            };
            this.$store.commit('addBlock', payload);
            this.$emit('blocks:update');
        },
    },
    computed: {
        computedRectConfig() {
            return { ...this.rectConfig, id: this.id };
        },
    },
};
</script>
