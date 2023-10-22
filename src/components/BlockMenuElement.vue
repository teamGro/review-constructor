<template>
    <v-group :config="computedGroupConfig">
        <v-text :config="showTitleConfig" @click="showTitle"></v-text>
        <v-text :config="changeTitleConfig" @click="changeTitle"></v-text>
        <v-text :config="removeBlockConfig" @click="removeBlock"></v-text>
        <v-text :config="addBlockConfig" @click="addBlock"></v-text>
    </v-group>
</template>

<script>
const emitEvents = {
    show: 'show:title',
    change: 'change:title',
    remove: 'remove:block',
    add: 'add:block',
};

export default {
    props: {
        groupVisibility: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            groupConfig: {
                x: 80,
                y: 80,
                width: 100,
                height: 50,
            },
            showTitleConfig: {
                x: 0,
                y: 0,
                text: 'st',
                fontSize: 20,
                fill: 'black',
                fontFamily: 'Calibri',
            },
            changeTitleConfig: {
                x: 20,
                y: 0,
                text: 'ct',
                fontSize: 20,
                fill: 'black',
                fontFamily: 'Calibri',
            },
            removeBlockConfig: {
                x: 40,
                y: 0,
                text: 'rb',
                fontSize: 20,
                fill: 'black',
                fontFamily: 'Calibri',
            },
            addBlockConfig: {
                x: 60,
                y: 0,
                text: 'ab',
                fontSize: 20,
                fill: 'black',
                fontFamily: 'Calibri',
            },
        };
    },
    emits: Object.values(emitEvents),
    methods: {
        showTitle() {
            this.$emit(emitEvents.show);
        },
        changeTitle() {
            this.$emit(emitEvents.change);
        },
        removeBlock() {
            this.$emit(emitEvents.remove);
        },
        addBlock() {
            this.$emit(emitEvents.add);
        },
    },
    computed: {
        computedGroupConfig() {
            return {
                ...this.groupConfig,
                visible: this.groupVisibility,
                //fontSize: 20,
                //fill: 'black',
                //fontFamily: 'FontAwesome',
            };
        },
    },
};
</script>
