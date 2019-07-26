<template>
    <el-row type="flex"
            justify="center"
            align="middle"
            style="margin-bottom: 20px;flex-direction: column">

        <el-row type="flex"
                justify="start"
                align="middle"
                style="margin-bottom: 10px;width: 960px;"

        >
            <el-row style="width: 650px;margin-right: 20px;border-right:1px solid #aaa;padding-right: 0px">
                <el-steps :active="steps"
                          finish-status="success"
                          :align-center="true"
                >
                    <el-step title="填写信息"></el-step>
                    <el-step title="选择课程"></el-step>
                    <el-step title="预览和导出"></el-step>
                </el-steps>
            </el-row>
            <el-row
                    type="flex"
                    justify="start"
                    style="height: 40px"
            >
                <el-row type="flex" style="margin-right: 20px">
                    <el-button type="primary"
                               @click="prevStep" size="small"
                               icon="el-icon-arrow-left"
                               :disabled="steps===0">上一步
                    </el-button>
                </el-row>
                <el-row
                        type="flex"
                        justify="end"
                >
                    <!--<el-button @click="nextStep" size="small" :disabled="steps===2" v-show="steps<2">下一步</el-button>-->
                    <el-button type="success"
                               @click="exportDocx()"
                               size="small"
                               v-show="steps<3"
                               :disabled="steps<2">导出
                    </el-button>
                </el-row>
            </el-row>
        </el-row>
        <el-row type="flex"
                justify="center"
                style="min-height: 200px;margin: 20px auto;border-bottom: 1px solid #aaa"
        >
            <el-form ref="teacher_calendar_form"
                     :model="form"
                     :rules="teacher_calendar_rules"
                     size="mini"
                     label-position="left"
                     label-width="85px"
                     v-show="steps===0"

            >
                <el-form-item label="学年:" prop="start_school_year">
                    <el-row type="flex" justify="start">
                        <el-form-item prop="start_school_year">
                            <el-date-picker
                                    v-model="form.start_school_year"
                                    type="year"
                                    format="yyyy年"
                                    value-format="yyyy"
                                    placeholder="开始学年"
                                    @change="setEndYear()"
                            >
                            </el-date-picker>
                        </el-form-item>
                        -
                        <el-form-item prop="end_school_year">
                            <el-date-picker
                                    v-model="form.end_school_year"
                                    type="year"
                                    format="yyyy年"
                                    value-format="yyyy"
                                    placeholder="结束学年">
                            </el-date-picker>
                        </el-form-item>
                    </el-row>
                </el-form-item>


                <el-form-item label="学期:" prop="term_num">
                    <template>
                        <el-input-number
                                v-model="form.term_num"
                                :min="1"
                                :max="2"
                                label="请输入第几学期"/>
                    </template>
                </el-form-item>
                <el-row type="flex" justify="space-between" style="width: 800px">
                    <el-form-item label="课程名称:" prop="course_name">
                        <el-input v-model="form.course_name" placeholder=""/>
                    </el-form-item>
                </el-row>
                <el-row type="flex" justify="space-between" style="width: 800px">

                    <el-form-item label="课程编码:" prop="course_code">
                        <el-input v-model="form.course_code" placeholder=""/>
                    </el-form-item>
                </el-row>
                <el-row type="flex" justify="space-between" style="width: 800px">

                    <el-form-item label="课程性质:" prop="course_character">
                        <el-input v-model="form.course_character" placeholder=""/>
                    </el-form-item>
                </el-row>
                <el-row type="flex" justify="space-between" style="width: 600px">
                    <el-form-item label="教师姓名:" prop="teacher_name">
                        <el-input v-model="form.teacher_name" placeholder=""/>
                    </el-form-item>
                </el-row>
                <el-row type="flex" justify="space-between" style="width: 600px">
                    <el-form-item label="专业:" prop="major">
                        <el-input v-model="form.major" placeholder=""/>
                    </el-form-item>
                </el-row>
                <el-row type="flex" justify="space-between" style="width: 600px">
                    <el-form-item label="任课班级:" prop="course_class">
                        <el-input v-model="form.course_class" placeholder=""/>
                    </el-form-item>
                </el-row>
                <el-form-item label="教学周:" prop="start_teach_week">
                    <el-row type="flex" justify="start">
                        <el-form-item prop="start_teach_week">
                            <template>
                                <el-input-number v-model="form.start_teach_week" :min="1"
                                                 :max="form.end_teach_week"
                                                 label="开始周"></el-input-number>
                            </template>
                        </el-form-item>
                        -
                        <el-form-item prop="end_teach_week">

                            <template>
                                <el-input-number v-model="form.end_teach_week" :min="form.start_teach_week"
                                                 :max="18"
                                                 label="结束周"></el-input-number>
                            </template>
                        </el-form-item>
                    </el-row>
                </el-form-item>
                <el-row type="flex" justify="space-between">
                    <el-form-item label="上课方案:">
                        <!--true为每周，false为单双周-->
                        <el-switch
                                v-model="form.is_weekly"
                                active-text="每周"
                                inactive-text="单双周"
                                active-color="#13ce66"
                                inactive-color="#ff4949"
                                :width="80"
                        >
                        </el-switch>
                    </el-form-item>
                </el-row>
            </el-form>
            <course_select v-show="steps===1"></course_select>
            <preview v-show="steps===2" :form="form" :NowDate="NowDate"></preview>

        </el-row>
        <el-row type="flex"
                justify="end"
                style="width: 545px;height: 40px;"
                v-if="steps<2"
        >
            <el-button @click="nextStep"
                       type="primary"
                       size="small"
                       :disabled="steps===2">下一步<i class="el-icon-arrow-right el-icon--right"></i></el-button>
        </el-row>
    </el-row>
</template>

<script>
    import Vue from "vue";
    import {User} from '@/model';
    import course_select from "../../components/select_course.vue";
    import preview from "../../components/preview.vue"
    import XDoc from "../../assets/js/xdoc.js"
    import Bus from '../../assets/js/Bus.js'

    export default {

        data() {
            return {
                steps: 0,
                loading: true,
                dialogVisible: false,
                user_id: '',
                currentPage: 1,
                pageSize: 8,
                itemTotal: 0,
                NowDate: "",
                form: {
                    start_school_year: "2018",
                    end_school_year: "2019",
                    term_num: 2,
                    course_name: "面向对象课程设计",
                    course_code: "B014019",
                    course_character: "专业选修课",
                    teacher_name: "尹天鹤",
                    major: "信息与计算科学",
                    course_class: "171-1，2",
                    start_teach_week: 1,
                    end_teach_week: 16,
                    is_weekly: true
                },
                teacher_calendar_rules: {
                    start_school_year: [
                        {required: true, message: '请输入开始年份', trigger: 'blur'}
                    ],
                    end_school_year: [
                        {required: true, message: '请输入结束年份', trigger: 'blur'}
                    ],
                    term_num: [
                        {required: true, message: '请输入学期数', trigger: 'blur'}
                    ],
                    course_name: [
                        {required: false, message: '请输入课程名称', trigger: 'blur'}
                    ],
                    course_code: [
                        {required: false, message: '请输入课程编码', trigger: 'blur'}
                    ],
                    course_character: [
                        {required: false, message: '请输入课程性质', trigger: 'blur'}
                    ],

                    teacher_name: [
                        {required: false, message: '请输入教师名称', trigger: 'blur'}
                    ],
                    major: [
                        {required: false, message: '请输入专业', trigger: 'blur'}
                    ],
                    course_class: [
                        {required: false, message: '请输入任课班级', trigger: 'blur'}
                    ],
                    start_teach_week: [
                        {required: true, message: '请输入教学开始周', trigger: 'blur'}
                    ],
                    end_teach_week: [
                        {required: true, message: '请输入教学结束周', trigger: 'blur'}
                    ]

                }
            }
        },
        components: {
            course_select,
            preview
        },
        methods: {
            exportDocx() {
                let table = "周次,月.日,讲课内容分章、分节名称,时数,实验、讨论课、习题课等环节名称,时数,作业\n";
                this.$store.state.weekInfo.forEach((val) => {
                    table = table + val.weekNum + "," + val.classDay + "\n";
                });
                const params = {
                    _filename: this.form.teacher_name + "-" + this.form.course_name + "-教学日历",
                    "course_name": this.form.course_name,
                    "course_code": this.form.course_code,
                    "course_character": this.form.course_character,
                    "major": this.form.major,
                    "class": this.form.course_class,
                    "start_school_year": this.form.start_school_year,
                    "end_school_year": this.form.end_school_year,
                    "term_num": this.form.term_num,
                    "teacher_name": this.form.teacher_name,
                    "date": this.NowDate,
                    "list": "教学周数,讲课,实验等,机动,合计,培养方案\n" + (this.form.end_teach_week - this.form.start_teach_week + 1) + "周,,,,,",
                    "table": table
                };
                this.steps++;
                XDoc.server = "http://www.xdocin.com";
                XDoc.key = "3vxgddieardwtmzuadxxavx4ha";
                XDoc.run("./yintianhe.xdoc",
                    "docx",
                    params,
                    "_blank");

                this.$message({
                    message: '导出成功',
                    type: 'success'
                });

            },
            setEndYear() {
                this.form.end_school_year = parseInt(this.form.start_school_year) + 1 + "";
            },
            prevStep() {
                this.steps--;
            },
            nextStep() {
                this.$refs['teacher_calendar_form'].validate((valid) => {
                    if (valid) {
                        this.steps++;
                        if (this.steps === 1) {
                            this.$store.commit('update_start_school_year', this.form.start_school_year);
                            this.$store.commit('update_end_school_year', this.form.end_school_year);
                            this.$store.commit('update_start_teach_week', this.form.start_teach_week);
                            this.$store.commit('update_end_teach_week', this.form.end_teach_week);
                            this.$store.commit('update_is_weekly', this.form.is_weekly);

                        } else if (this.steps === 2) {
                            this.$store.state.weekInfo = this.$store.getters.getWeekInfo;
                            Bus.$emit('week_num', "change")
                            let date = new Date();
                            let year = date.getFullYear();
                            let month = date.getMonth() + 1;
                            let day = date.getDate();
                            const Month = month < 10 ? "0" + month : "" + month;
                            const Day = day < 10 ? "0" + day : day + "";
                            this.NowDate = year + "-" + Month + "-" + Day;
                        }
                    }
                });
            }
        }
    }
</script>

<style lang="scss" scoped>
    .col-title {
        text-align: left;
        margin-bottom: 10px;
    }

    .title {
        font-size: 14px;
        font-weight: bolder;
    }

    /*.header{*/
    /*color:#409EFF;*/
    /*}*/
    /*.title{*/
    /*color:#fff;*/
    /*font-size: 28px;*/
    /*font-weight: 600;*/
    /*padding-left: 80px;*/
    /*background-color: #409EFF;*/
    /*}*/
    /*.sort{*/
    /*color: #409EFF;*/
    /*padding-left: 100px;*/
    /*}*/
</style>
