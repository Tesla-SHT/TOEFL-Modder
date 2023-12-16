
import {  useMessage } from 'naive-ui'
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
    NRadio,
    NList,
    NThing,
    NTag,
    NListItem,
    NConfigProvider,
    NCollapse,
    NCollapseItem,NPopconfirm,
    zhCN, dateZhCN,
    NMessageProvider,NGradientText,NRate,
    NPopover,NModal
    
} from 'naive-ui';

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
            NCalendar, NSlider, NH1, NH2, NH3, NH4, NH5, NH6,
            NRadio,
            NList,
            NThing,
            NTag,
            NListItem, NConfigProvider,
            NCollapse,
            NCollapseItem,NPopconfirm,NMessageProvider,NGradientText,NRate,
            NPopover,NModal],
    setup() {
        return {
            fontSize: this.$store.state.fontSize,
            large, tiny, small, medium, largeSize, smallSize, mediumSize,
            zhCN,
            dateZhCN

        };
    }
})
export default naive;