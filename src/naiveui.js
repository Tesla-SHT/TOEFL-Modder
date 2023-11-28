
import {useMessage} from 'naive-ui'
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
    NIcon,
    NSpace,
    NStatistic,
    NNumberAnimation,
    NCalendar,
    NSlider,
    NH1,
    NH2,
    NH3,
    NH4,
    NH5,
    NH6,

} from 'naive-ui';
import { useThemeClass } from 'naive-ui/es/_mixins';

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
            NCollapseTransition,
            NIcon,
            NSpace,
            NStatistic,
            NNumberAnimation,
            NCalendar,NSlider,NH1,NH2,NH3,NH4,NH5,NH6],
    setup() {
        return {
            fontSize: this.$store.state.fontSize,
            large, tiny, small, medium, largeSize, smallSize, mediumSize

        };
    }
})
export default naive;