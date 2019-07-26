//判断是否是节假日
export default {
    isHoliday: function (week) {
        let weekInfo = week;
        let holiday = ['4.5', '4.6', '4.7', '5.1', '5.2', '5.3', '6.7', '6.8', '6.9'];
        let replace = ['5.4', '5.5'];
        let beReplace = ['5.2', '5.3'];
        for (let i = 0; i < weekInfo.classDay.length; i++) {
            for (let k = 0; k < replace.length; k++) {
                if (weekInfo.classDay[i] == beReplace[k]) {

                    weekInfo.classDay[i] = replace[k]
                }
            }
        }
        for (let i = 0; i < weekInfo.classDay.length; i++) {
            for (let j = 0; j < holiday.length; j++) {
                if (weekInfo.classDay[i] == holiday[j]) {
                    weekInfo.classDay.splice(i, 1);
                    weekInfo.weekNum.splice(i, 1)
                }
            }
        }
        return weekInfo
    },
    //创建星期数组，存放每个星期对应的日期
    //使用默认开始日期为beginDay25号
    createWeek: function (year) {
        const weekArray: any = [];
        for (let i = 0; i < 18; i++) {
            weekArray[i] = new Array(i);
            for (let j = 0; j < 7; j++) {
                weekArray[i][j] = i;
            }
        }
        let february = 28;
        if (year % 4 === 0 || year % 400 === 0) {
            february = 29
        }
        let month = 2;
        let monthDay = [february, 31, 30, 31, 30, 31];
        //默认开始日期，后续可以拓展为通过后台设置
        // let beginDay = 25;
        let day = 25;
        let monthDayNum = 0;
        for (let i = 0; i < 18; i++) {

            for (let j = 0; j < 7; j++) {

                weekArray[i][j] = month + '.' + day;
                day++;

                if (day > monthDay[monthDayNum]) {
                    day = 1;
                    monthDayNum++;
                    month++
                }
            }
        }
        return weekArray
    }
}