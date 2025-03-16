export default {
	/**
	 * @param date 计算当前日期星座
	 */
	getHoroscope(date: Date | number) {
		const c = ['摩羯','水瓶','双鱼','白羊','金牛','双子','巨蟹','狮子','处女','天秤','天蝎','射手','摩羯'];
		date = new Date(date);

		const month = date.getMonth() + 1;
    const day = date.getDate();
		// @ts-ignore
    const startMonth = month - (day - 14 < '865778999988'.charAt(month));
    return c[startMonth] + '座';
	},

	// 计算指定时间与当前的时间差
	sumAge(data: any) {
		const dateBegin = new Date(data.replace(/-/g, '/'));
		const dateEnd = new Date();//获取当前时间
		const dateDiff = dateEnd.getTime() - dateBegin.getTime();//时间差的毫秒数
		const dayDiff = Math.floor(dateDiff / (24 * 3600 * 1000));//计算出相差天数
		const leave1 = dateDiff % (24 * 3600 * 1000);    //计算天数后剩余的毫秒数
		const hours = Math.floor(leave1 / (3600 * 1000));//计算出小时数
		//计算相差分钟数
		const leave2 = leave1 % (3600 * 1000);    //计算小时数后剩余的毫秒数
		const minutes = Math.floor(leave2 / (60 * 1000));//计算相差分钟数
		//计算相差秒数
		const leave3 = leave2 % (60 * 1000);      //计算分钟数后剩余的毫秒数
		const seconds = Math.round(leave3 / 1000);
		return dayDiff + '天 ' + hours + '小时 ';
	},
	// 获取聊天时间（相差300s内的信息不会显示时间）
	getChatTime(v1: any, v2: any){
		v1 = v1.toString().length < 13 ? v1 * 1000 : v1;
		v2 = v2.toString().length < 13 ? v2 * 1000 : v2;
		if(((parseInt(v1) - parseInt(v2)) / 1000) > 300){
			return this.gettime(v1);
		}
	},
	
	/**
	 * 人性化时间格式
	 */
	gettime(shorttime: any){
		shorttime = shorttime.toString().length < 13 ? shorttime * 1000 : shorttime;
		const now = (new Date()).getTime();
		const cha = (now - parseInt(shorttime)) / 1000;
		
		if (cha < 43200) {
			// 当天
			return this.dateFormat(new Date(shorttime),'{A} {t}:{ii}');
		} else if(cha < 518400){
			// 隔天 显示日期+时间
			return this.dateFormat(new Date(shorttime),'{Mon}月{DD}日 {A} {t}:{ii}');
		} else {
			// 隔年 显示完整日期+时间
			return this.dateFormat(new Date(shorttime),'{Y}-{MM}-{DD} {A} {t}:{ii}');
		}
	},
	
	parseNumber(num: number) {
		return num < 10 ? '0' + num : num;
	},

	dateFormat(date: any, formatStr: any) {
		const dateObj = {} as any,
    rStr = /\{([^}]+)\}/,
		mons = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];
 
		dateObj['Y'] = date.getFullYear();
		dateObj['M'] = date.getMonth() + 1;
		dateObj['MM'] = this.parseNumber(dateObj['M']);
		dateObj['Mon'] = mons[dateObj['M'] - 1];
		dateObj['D'] = date.getDate();
		dateObj['DD'] = this.parseNumber(dateObj['D']);
		dateObj['h'] = date.getHours();
		dateObj['hh'] = this.parseNumber(dateObj['h']);
		dateObj['t'] = dateObj['h'] > 12 ? dateObj['h'] - 12 : dateObj['h'];
		dateObj['tt'] = this.parseNumber(dateObj['t']);
		dateObj['A'] = dateObj['h'] > 12 ? '下午' : '上午';
		dateObj['i'] = date.getMinutes();
		dateObj['ii'] = this.parseNumber(dateObj['i']);
		dateObj['s'] = date.getSeconds();
		dateObj['ss'] = this.parseNumber(dateObj['s']);
		
		while(rStr.test(formatStr)) {
			formatStr = formatStr.replace(rStr, dateObj[RegExp.$1]);
		}
		return formatStr;
	},
	// 获取年龄
	getAgeByBirthday(data: any){
		// eslint-disable-next-line no-useless-escape
		const birthday = new Date(data.replace(/-/g, '\/')); 
		const d = new Date(); 
		return d.getFullYear() - birthday.getFullYear() - ((d.getMonth() < birthday.getMonth() || d.getMonth() == birthday.getMonth() && d.getDate() < birthday.getDate()) ? 1 : 0);
	}
};
