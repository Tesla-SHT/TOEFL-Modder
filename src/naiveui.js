import {
    // create naive ui
    create,
    // component
    NButton,
    NInputNumber,
    NLayout,
    NLayoutHeader,
    NLayoutContent,
    NLayoutSider,
    NCard,
    NGrid,
    NGridItem,
    NDivider,
    NCollapseTransition,
    NIcon
} from 'naive-ui';
import { largerSize } from 'naive-ui/es/_utils';

const naive = create({
    components:
        [NButton,
            NInputNumber,
            NLayout,
            NLayoutHeader,
            NLayoutContent,
            NLayoutSider,
            NCard,
            NGrid,
            NGridItem,
            NDivider,
            NCollapseTransition,NIcon],
    setup() {
        return {
            fontSize: this.$store.state.fontSize,
            large,tiny,small,medium,largeSize,smallSize,mediumSize
            
        };
    }
})
export default naive;