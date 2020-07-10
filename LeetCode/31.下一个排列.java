/*
 * @lc app=leetcode.cn id=31 lang=java
 *
 * [31] 下一个排列
 */

// @lc code=start
class Solution {
    public void nextPermutation(int[] nums) {
        int max = Integer.MIN_VALUE;
        int index = 0;
        boolean desc = true;
        for (int i = 1; i < nums.length; i++) {
            if (nums[i] > nums[i - 1] && nums[i] > max) {
                max = nums[i];
                index = i;
                desc = false;
            }
        }
        if (index != 0) {
            nums[index] = nums[index - 1];
            nums[index - 1] = max;
        } else if (desc) {
            for (int i = 0, j = nums.length - 1; i < j; i++, j--) {
                max = nums[i];
                nums[i] = nums[j];
                nums[j] = max;
            }
        }
    }
}
// @lc code=end
