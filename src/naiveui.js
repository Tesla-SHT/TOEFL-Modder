import {
    // create naive ui
    create,
    // component
    NButton,
    NInputNumber,
    NLayout,
    NLayoutHeader,
    NLayoutContent,
    NLayoutSider
} from 'naive-ui';

const naive = create({
    components:
        [NButton,
        NInputNumber,
        NLayout,
        NLayoutHeader,
        NLayoutContent,
        NLayoutSider],
    setup() {
        return {
            fontSize: this.$store.state.fontSize
        };
    }
})
export default naive;