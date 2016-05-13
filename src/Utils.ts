class Utils{
	static  sorter(array){
	var tempObject = {};
	array.forEach((item, index) => {
		if (item.index) {
			if (tempObject.hasOwnProperty('index_' + item.index)) {
				tempObject['index_' + item.index].push({ index: item.index, data: item.data });
			} else {
				tempObject['index_' + item.index] = new Array();
				tempObject['index_' + item.index].push({ index: item.index, data: item.data });
			}
		} else {
			tempObject['index_' + array.length + 1] = new Array();
			tempObject['index_' + array.length + 1].push({ index: item.index, data: item.data });
		}
	});
	return tempObject;
	}

	static reArrange(tempObject) {
	var sortedRanked = [];
	for (var key in tempObject) {
		sortedRanked.push(tempObject[key][0].index);
	}
	sortedRanked.sort();
	var sortedElements = [];
	var isUnrankedIndex = false;
	sortedRanked.forEach(item => {
		if (item != -1) {
			tempObject['index_' + item].forEach(elements => {
				sortedElements.push(elements);
			})
		} else {
			isUnrankedIndex = true;
		}
	});
	if (isUnrankedIndex) {
		tempObject['index_-1'].forEach(item => {
			sortedElements.push(item);
		})
	}
	return sortedElements;
}
}
