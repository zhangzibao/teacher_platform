import Vue from "vue";
import Vuex from "vuex";
import util from './assets/ts/until';

Vue.use(Vuex);
export default new Vuex.Store({
    state: {
        start_school_year: "2019",
        end_school_year: "2020",
        start_teach_week: 1,
        end_teach_week: 16,
        is_weekly: true,
        singleWeek: [],
        doubleWeek: [],
        everyWeek: [],
        weekInfo: []
    },
    mutations: {
        update_start_school_year(state, start_school_year) {
            state.start_school_year = start_school_year
        },
        update_end_school_year(state, end_school_year) {
            state.end_school_year = end_school_year
        },
        update_start_teach_week(state, start_teach_week) {
            state.start_teach_week = start_teach_week
        },
        update_end_teach_week(state, end_teach_week) {
            state.end_teach_week = end_teach_week
        },
        update_is_weekly(state, is_weekly) {
            state.is_weekly = is_weekly
        },
        update_singleWeek(state, singleWeek) {
            state.singleWeek = singleWeek
        },
        update_doubleWeek(state, doubleWeek) {
            state.doubleWeek = doubleWeek
        },
        update_everyWeek(state, everyWeek) {
            state.everyWeek = everyWeek
        }
    },
    actions: {},
    getters: {
        getWeekInfo(state) {
            const isEvery = state.is_weekly;
            const year = state.start_school_year;
            const weekBegin = state.start_teach_week - 1;
            const weekEnd = state.end_teach_week;
            const chooseDay = state.everyWeek;
            const single = state.singleWeek;
            const double = state.doubleWeek;
            let isSingle = true;
            let weekArray = [];
            let weekNum: any = [];
            let classDay = [];
            let classDayKey = 0;
            weekArray = util.createWeek(year);
            //每周课程
            if (isEvery) {
                for (let i = weekBegin; i < weekEnd; i++) {
                    for (let j = 0; j < 7; j++) {
                        for (let k = 0; k < chooseDay.length; k++) {
                            if (chooseDay[k] == j) {
                                weekNum[classDayKey] = i+1;
                                classDay[classDayKey] = weekArray[i][j];
                                classDayKey++
                            }
                        }
                    }
                }
            }
            //单双周课程生成
            else {
                //单周
                for (let i = weekBegin; i < weekEnd; i++) {
                    if (isSingle) {
                        for (let j = 0; j < 7; j++) {
                            for (let s = 0; s < single.length; s++) {
                                if (single[s] == j) {
                                    weekNum[classDayKey] = i+1;
                                    classDay[classDayKey] = weekArray[i][j];
                                    classDayKey++
                                }
                            }
                        }
                        isSingle = false
                    }
                    //双周
                    else {
                        for (let j = 0; j < 7; j++) {
                            for (let d = 0; d < double.length; d++) {
                                if (double[d] == j) {
                                    weekNum[classDayKey] = i+1;
                                    classDay[classDayKey] = weekArray[i][j];
                                    classDayKey++
                                }
                            }
                        }
                        isSingle = true
                    }
                }
            }
            // weekInfo.classDay = classDay;
            // weekInfo.weekNum = weekNum;
            let weekInfo = {
                classDay,
                weekNum
            };
            weekInfo = util.isHoliday(weekInfo);
            let weekInfoArray: any = [];
            for (let i = 0; i < weekInfo.classDay.length; i++) {

                const weekObj = {
                    classDay: weekInfo.classDay[i],
                    weekNum: weekInfo.weekNum[i],
                    contain: '',
                    containTime: '',
                    testClass: '',
                    testTime: '',
                    homework: ''
                };

                weekInfoArray.push(weekObj);
            }
            return weekInfoArray;
        }
    }
});
