<template>
    <el-col type="flex"
            justify="center"
            align="middle"
            style="width: 800px"
    >
        <el-row v-if="!is_weekly">
            <el-row type="flex" justify="start" align="middle" class="space-of-row">
                <span class="week-title">单周:</span>
                <el-checkbox-group v-model="singleWeek" size="mini">
                    <el-checkbox-button v-for="(day,index) in week2" :label="day.num" :key="index"
                                        @change=SingleSelect()
                                        :disabled="day.canChecked"
                    >
                        {{day.name}}
                    </el-checkbox-button>
                </el-checkbox-group>
            </el-row>
            <el-row type="flex" justify="start" align="middle" class="space-of-row">
                <span class="week-title">双周:</span>
                <el-checkbox-group v-model="doubleWeek" size="mini"
                >
                    <el-checkbox-button v-for="(day,index) in week2" :label="day.num" :key="index"
                                        @change=DoubleSelect()
                                        :disabled="day.canChecked"
                    >
                        {{day.name}}
                    </el-checkbox-button>
                </el-checkbox-group>
            </el-row>
        </el-row>
        <el-row v-else>
            <el-row type="flex" justify="start" align="middle" class="space-of-row">
                <span class="week-title">每周:</span>
                <el-checkbox-group v-model="everyWeek" size="mini">
                    <el-checkbox-button v-for="(day,index) in week" :label="day.num" :key="index"
                                        :disabled="day.canChecked"
                                        @change=EverySelect()
                    >
                        {{day.name}}
                    </el-checkbox-button>
                </el-checkbox-group>
            </el-row>
        </el-row>
        <!--<el-button type="success" @click="test()"> 测试</el-button>-->
    </el-col>
</template>
<script lang="ts">
    import Component from 'vue-class-component'
    import Vue from "vue";

    @Component({
        // props: {
        //     is_weekly: {
        //         type: Boolean,
        //         require: true,
        //         default: () => (true)
        //     }
        // }
        computed: {
            is_weekly() {
                return this.$store.state.is_weekly;
            }
        },
        methods: {
        }
    })
    export default class YourComponent extends Vue {
        //data
        private week: any = [
            {name: '星期一', canChecked: false, num: 0},
            {name: '星期二', canChecked: false, num: 1},
            {name: '星期三', canChecked: false, num: 2},
            {name: '星期四', canChecked: false, num: 3},
            {name: '星期五', canChecked: false, num: 4},
            {name: '星期六', canChecked: false, num: 5},
            {name: '星期日', canChecked: false, num: 6}
        ];
        private week2: any = [
            {name: '星期一', canChecked: false, num: 0},
            {name: '星期二', canChecked: false, num: 1},
            {name: '星期三', canChecked: false, num: 2},
            {name: '星期四', canChecked: false, num: 3},
            {name: '星期五', canChecked: false, num: 4},
            {name: '星期六', canChecked: false, num: 5},
            {name: '星期日', canChecked: false, num: 6}
        ];
        private singleWeek: any = [];
        private doubleWeek: any = [];
        private everyWeek: any = [];

        //method
        private SingleSelect(): void {
            this.$store.commit("update_singleWeek", this.singleWeek)
        }

        private DoubleSelect(): void {
            this.$store.commit("update_doubleWeek", this.doubleWeek);
            // console.log(this.doubleWeek)

        }

        private EverySelect(): void {
            this.$store.commit("update_everyWeek", this.everyWeek)
        }

    }


</script>
<style>
    .week-title {
        text-align: center;
        color: #20a0ff;
        font-size: 18px;
        font-weight: 500;
        margin-right: 40px;
    }

    .space-of-row {
        margin-bottom: 20px;
    }
</style>