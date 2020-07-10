/*
 * @lc app=leetcode.cn id=26 lang=java
 *
 * [26] 删除排序数组中的重复项
 */

// @lc code=start
class Solution {
    public int removeDuplicates(int[] nums) {
        int index=0;
        for (int i = index+1; i < nums.length; i++) {
            if(nums[index]!=nums[i]){
                index++;
                nums[index]=nums[i];
            }
        }
        return index+1;

    }
}
// @lc code=end

