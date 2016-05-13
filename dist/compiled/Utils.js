var Utils = (function () {
    function Utils() {
    }
    Utils.sorter = function (array) {
        var tempObject = {};
        array.forEach(function (item, index) {
            if (item.index) {
                if (tempObject.hasOwnProperty('index_' + item.index)) {
                    tempObject['index_' + item.index].push({ index: item.index, data: item.data });
                }
                else {
                    tempObject['index_' + item.index] = new Array();
                    tempObject['index_' + item.index].push({ index: item.index, data: item.data });
                }
            }
            else {
                tempObject['index_' + array.length + 1] = new Array();
                tempObject['index_' + array.length + 1].push({ index: item.index, data: item.data });
            }
        });
        return tempObject;
    };
    Utils.reArrange = function (tempObject) {
        var sortedRanked = [];
        for (var key in tempObject) {
            sortedRanked.push(tempObject[key][0].index);
        }
        sortedRanked.sort();
        var sortedElements = [];
        var isUnrankedIndex = false;
        sortedRanked.forEach(function (item) {
            if (item != -1) {
                tempObject['index_' + item].forEach(function (elements) {
                    sortedElements.push(elements);
                });
            }
            else {
                isUnrankedIndex = true;
            }
        });
        if (isUnrankedIndex) {
            tempObject['index_-1'].forEach(function (item) {
                sortedElements.push(item);
            });
        }
        return sortedElements;
    };
    return Utils;
}());
