/*
 *
 *
 * */

const getYearData = year => {
  if (!year) {
    year = new Date().getFullYear();
  }
  let monthArr = Array(12)
    .fill()
    .map((_, index) => {
      let nextMonthIndex = index + 1;
      // 下个月的0号是此月的最后一天，通过这个来算此月数量
      let nowMonthLength = new Date(year, nextMonthIndex, 0).getDate();
      let dayArr = Array(nowMonthLength)
        .fill()
        .map((__, dayNum) => {
          let dateSrc = new Date(year, index, dayNum + 1);
          let week = dateSrc.getDay();
          let dayDate = {year, month: index, date: dayNum + 1, week};
          dayDate.isChoose = isToday(dayDate);
          return dayDate;
        });
      return {
        index: index,
        monthNum: nextMonthIndex,
        dayNum: nowMonthLength,
        dayArr: dayArr,
      };
    });
  return {year, monthArr};
};

const isToday = dayDate => {
  let {year, month, date} = dayDate;
  let nowMoment = new Date();
  let nowYear = nowMoment.getFullYear();
  let nowMonth = nowMoment.getMonth();
  let nowDate = nowMoment.getDate();
  if (nowYear === year && nowMonth === month && nowDate === date) {
    return true;
  }
  return false;
};

// 为了让日期能在日历上正确地显示到正确地星期位，需要在1号前进行填充空白
const dayArrShowFix = dayArr => {
  let firstDay = dayArr[0];
  let {year, month} = firstDay;
  let fillEmpty = Array(firstDay.week)
    .fill()
    .map((_, index) => {
      return {year, month, date: -1, week: index};
    });
  return [...fillEmpty, ...dayArr];
};

const getOffSet = (index, viewW, viewH) => {
  let toOffSetX = 0;
  let toOffSetY = 50;
  let leftIndex = [0, 3, 6, 9];
  let rightIndex = [2, 5, 8, 11];
  if (leftIndex.includes(index)) {
    toOffSetX = viewW;
  }
  if (rightIndex.includes(index)) {
    toOffSetX = -viewW;
  }

  toOffSetY += viewH * -(parseInt(index/3) - 1);

  return {toOffSetX, toOffSetY};
};

export {getYearData, dayArrShowFix, getOffSet};
