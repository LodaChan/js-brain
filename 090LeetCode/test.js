// 1. 两数之和
// 给定一个整数数组 nums 和一个目标值 target，请你在该数组中找出 和为 目标值的那 两个 整数，并返回他们的数组下标。

// 你可以假设每种输入只会对应一个答案。但是，你不能重复利用这个数组中同样的元素。

// 示例:

// 给定 nums = [2, 7, 1, 8], target = 9

// 因为 nums[0] + nums[1] = 2 + 7 = 9
// 所以返回 [0, 1]  


function fn(arr = [2, 7, 11, 15], target = 9) {
    let flag = [];

    for (var i = 0; i < arr.length; i++) {
        for (var j = i + 1; j < arr.length; j++) {
            if (arr[i] + arr[j] == target) {
                flag = [i, j]
            }
            if (flag.length > 0) {
                return flag;
            }
        }
    }
}

// 设计组件，场景：答分组件