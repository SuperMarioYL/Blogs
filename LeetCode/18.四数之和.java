import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

/*
 * @lc app=leetcode.cn id=18 lang=java
 *
 * [18] 四数之和
 */

// @lc code=start
class Solution {
    public List<List<Integer>> fourSum(int[] nums, int target) {
        Set<List<Integer>> set = new HashSet<>();
        Arrays.sort(nums);
        int l, r;
        for (int one = 0; one < nums.length - 3; one++) {
            for (int two = one + 1; two < nums.length - 2; two++) {
                l = two + 1;
                r = nums.length - 1;
                while (l < r) {
                    int v = nums[one] + nums[two] + nums[l] + nums[r];
                    if (v == target) {
                        set.add(Arrays.asList(nums[one], nums[two], nums[l], nums[r]));
                        l++;
                    } else if (v > target) {
                        r--;
                    } else {
                        l++;
                    }
                }
            }
        }
        return new ArrayList<>(set);
    }
}
// @lc code=end
