import java.lang.reflect.Array;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collector;
import java.util.stream.Collectors;

/*
 * @lc app=leetcode.cn id=15 lang=java
 *
 * [15] 三数之和
 */

// @lc code=start
class Solution {
    public List<List<Integer>> threeSum(int[] nums) {
        Set<List<Integer>> set = new HashSet<>();
        Arrays.sort(nums);
        if (nums.length < 3) {
            return new ArrayList<>();
        }
        for (int i = 0; i < nums.length - 2 && nums[i] <= 0; i++) {
            int k = nums.length - 1;
            for (int j = i + 1; j < k; j++) {
                for (int j2 = k; j2 > j && nums[j2] >= 0; j2--) {
                    if (nums[i] + nums[j] + nums[j2] == 0) {
                        set.add(Arrays.asList(nums[i], nums[j], nums[j2]));
                        k = j2;
                        break;
                    } else if (nums[i] + nums[j] + nums[j2] < 0) {
                        k = j2;
                        break;
                    }
                }
                if (k <= j || nums[k] < 0) {
                    return new ArrayList<>(set);
                }
            }
        }
        return new ArrayList<>(set);
    }
}
// @lc code=end
