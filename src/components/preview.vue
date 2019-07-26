<template>
    <el-col
            type="flex"
            justify="center"
            style="width: 800px;padding:10px 0;background:white;margin-bottom: 20px">
        <div class='formatDetail'>
            <div class='formatTitle'>
                <h2>教学日历</h2>
            </div>
            <div class='year'>
                <span>{{form.start_school_year}}---{{form.end_school_year}}学年第{{form.term_num}}学期</span>
            </div>
            <div class='classDetail beRowOne'>
                <div class='className'>
                    <span>课程名称:</span>
                    <span class='haveLine'>{{form.course_name}}</span>
                </div>
                <div class="classCode">
                    <span>课程编码:</span>
                    <span class='haveLine'>{{form.course_code}}</span>
                </div>
                <div class='classNature'>
                    <span>课程性质:</span>
                    <span class='haveLine'>{{form.course_character}}</span>
                </div>
            </div>
            <div class='proClass beRowTwo'>
                <div class='pro'>
                    <span>专业:</span>
                    <span class='haveLine'>{{form.major}}</span>
                </div>
                <div class='classNum'>
                    <span>班级:</span>
                    <span class='haveLine'>{{form.course_class}}</span>
                </div>
            </div>
            <div class='classTable'>
                <el-table :data="classData" style="width: 80%"
                          border
                >
                    <el-table-column property="weekNum" label="教学周数"></el-table-column>
                    <el-table-column property="classTime" label="讲课"></el-table-column>
                    <el-table-column property="testTime" label="实验等"></el-table-column>
                    <el-table-column property="machineTime" label="机动"></el-table-column>
                    <el-table-column property="allTime" label="合计"></el-table-column>
                    <el-table-column property="teachPlan" label="培养方案"></el-table-column>
                </el-table>
            </div>
            <div class='teaTime beRowThree'>
                <div class='teacher'>
                    <span>任课教师:</span>
                    <span class='haveLine'>{{form.teacher_name}}</span>
                </div>
                <div class='time'>
                    <span>制定日期:</span>
                    <span class='haveLine'>{{NowDate}}</span>
                </div>
            </div>
        </div>

        <div class='teachTable'>
            <div class=' beCenter'>
                <el-table :data="weekInfoArray" style="width: 100%"
                          border
                >
                    <el-table-column width="80" property="weekNum" label="周次"></el-table-column>
                    <el-table-column width="80" property="classDay" label="月.日"></el-table-column>
                    <el-table-column property="contain" label="讲课内容分章、分节名称"></el-table-column>
                    <el-table-column property="containTime" label="时数"></el-table-column>
                    <el-table-column property="testClass" label="习题、讨论课、实验课等环节名称"></el-table-column>
                    <el-table-column property="testTimes" label="时数"></el-table-column>
                    <el-table-column property="homework" label="作业"></el-table-column>
                </el-table>
            </div>
        </div>
    </el-col>
</template>
<script>
    import Bus from '../assets/js/Bus.js'

    export default {
        props: ['form', 'NowDate'],
        computed: {
            weekInfoArray() {
                return this.$store.state.weekInfo;
            }
        },
        data() {
            return {
                classData: [
                    {
                        weekNum: this.form.end_teach_week - this.form.start_teach_week + 1,
                        classWeek: '',
                        classTime: '',
                        testTime: '',
                        machineTime: '',
                        allTime: '',
                        teachPlan: ''
                    }
                ]
            }
        },
        mounted() {
            Bus.$on('week_num', message => {
                this.classData[0].weekNum = this.form.end_teach_week - this.form.start_teach_week + 1
            });
        }
    }
</script>
<style lang="scss" scoped>
    .formatDetail {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .formatTitle {
        width: 300px;
        display: flex;
        justify-content: center;
        align-items: center;

        h2 {
            letter-spacing: 15px;
        }
    }

    .beRowOne {
        /*width: 80%;*/
        margin: 15px 10px;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }

    .beRowTwo {
        /*width: 50%;*/
        margin-top: 10px;
        margin-bottom: 20px;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }

    .beRowThree {
        /*width: 50%;*/
        margin-top: 10px;
        margin-bottom: 20px;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }

    span {
        /*font-size: 20px;*/
        font-weight: 400;
    }

    .haveLine {
        padding-left: 10px;
        padding-right: 10px;
        text-decoration: underline;
        margin: 0 10px;
    }

    .classTable {
        width: 70%;
        padding-bottom: 10px;
        margin: auto;
        display: flex;
        justify-content: center;
    }

    .teaTime {
        margin-bottom: 10px;

    }

    .teachTable {
        display: flex;
        justify-content: center;
    }

    .beCenter {
        width: 80%;
    }
</style>