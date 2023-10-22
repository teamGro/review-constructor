import { createStore } from 'vuex';
import BlockItem from '@/models/blockItem';
import ArrowItem from '@/models/arrowItem';
import consts from '@/consts';

const defaultOffset = 50;

// function getConnectorPoints(from, to) {
//  const fromPos = from.position();
//  const toPos = to.position();

//  return [
//    fromPos.x + from.attrs.width / 2,
//    fromPos.y + from.attrs.height,
//    toPos.x + to.attrs.width / 2,
//    toPos.y,
//  ];
// }

export default createStore({
    state: {
        blocks: null,
        connectors: null,
        idCount: 1,
        idConnectorCount: 1,
    },
    getters: {
        getBlocks(state) {
            return Array.from(state.blocks?.values() || []);
        },
    },
    mutations: {
        addBlock(state, payload) {
            if (!state.blocks?.size) state.blocks = new Map();

            const id = `target-${state.idCount}`;
            payload.rect = consts.rectDefaultSettings;
            payload.text = consts.textDefaultSettings;
            payload.text.text = payload.title;
            state.blocks.set(id, new BlockItem({ ...payload, id }));

            if (payload.parentId) {
                const parent = state.blocks.get(payload.parentId);
                if (parent.childrensId.length) {
                    const lastChildren = state.blocks.get(parent.childrensId[parent.childrensId.length - 1]);
                    if (parent.childrensId.length === 1) {
                        state.blocks.get(id).x = lastChildren.x - lastChildren.width - defaultOffset;
                    } else {
                        const preLast = state.blocks.get(parent.childrensId[parent.childrensId.length - 2]);
                        if (parent.childrensId.length % 2 === 0) {
                            // eslint-disable-next-line max-len
                            state.blocks.get(id).x = preLast.x + preLast.width + defaultOffset;
                        } else {
                            state.blocks.get(id).x = preLast.x - preLast.width - defaultOffset;
                        }

                        state.blocks.get(id).y = lastChildren.y;
                    }
                }
                parent.childrensId.push(id);
                this.commit('addConnectors', state.blocks.get(id));
            }
            state.idCount++;
        },
        addConnectors(state, payload) {
            if (!state.connectors) state.connectors = new Map();

            const id = `connector-${state.idConnectorCount}`;
            const parent = state.blocks.get(payload.parentId);
            const from = parent.id;
            const to = payload.id;
            const points = [
                parent.x + parent.width / 2,
                parent.y + parent.height,
                payload.x + payload.width / 2,
                payload.y,
            ];
            state.connectors.set(
                id,
                new ArrowItem({
                    id,
                    from,
                    to,
                    points,
                })
            );
            state.idConnectorCount++;
        },
        updateBlock(state, payload) {
            const block = state.blocks.get(payload.id);
            block.x = payload.x;
            block.y = payload.y;

            if (!state.connectors?.size) return;

            let arr = null;

            Array.from(state.connectors.values()).forEach((item) => {
                if (item.from === payload.id) {
                    let children = block.childrensId?.find((el) => el === item.to);
                    if (children) {
                        children = state.blocks.get(children);
                        item.points = [
                            block.x + block.width / 2,
                            block.y + block.height,
                            children.x + children.width / 2,
                            children.y,
                        ];
                        arr = { ...item };
                        state.connectors.delete(arr.id);
                        state.connectors.set(arr.id, arr);
                    }
                }
                if (item.to === payload.id) {
                    let parent = block.parentId;
                    if (parent) {
                        parent = state.blocks.get(parent);
                        item.points = [
                            parent.x + parent.width / 2,
                            parent.y + parent.height,
                            block.x + block.width / 2,
                            block.y,
                        ];
                        arr = { ...item };
                        state.connectors.delete(arr.id);
                        state.connectors.set(arr.id, arr);
                    }
                }
            });
        },
        updateTitle(state, payload) {
            state.blocks.get(payload.id).text.text = payload.title;
        },
        removeBlock(state, id) {
            const block = state.blocks.get(id);
            let connectors = Array.from(state.connectors?.values() || []);
            let removedConnectors = null;
            if (block.parentId) {
                removedConnectors = connectors.filter((item) => {
                    return item.from === block.parentId && item.to === block.id;
                });

                if (removedConnectors?.length) {
                    removedConnectors.forEach((item) => {
                        state.connectors.delete(item.id);
                    });
                }

                state.blocks.get(block.parentId).childrensId = state.blocks
                    .get(block.parentId)
                    .childrensId.filter((item) => item !== id);
            }
            if (block.childrensId?.length) {
                removedConnectors = connectors.filter((item) => {
                    return item.from === block.id && block.childrensId.includes(item.to);
                });

                if (removedConnectors?.length) {
                    removedConnectors.forEach((item) => {
                        state.connectors.delete(item.id);
                    });
                }

                block.childrensId.forEach((item) => {
                    state.blocks.get(item).parentId = null;
                });
            }
            state.blocks.delete(id);
        },
    },
    actions: {},
    modules: {},
});
