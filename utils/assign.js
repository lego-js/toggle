export default function assign(...objs) {
	return objs.reduce((res, obj) => {
		if (typeof obj === 'object' && !!obj) {
			Object.keys(obj).forEach(prop => res[prop] = obj[prop]);
		}
		return res;
	});
}
