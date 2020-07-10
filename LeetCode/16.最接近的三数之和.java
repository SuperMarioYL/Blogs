import java.util.Arrays;

/*
 * @lc app=leetcode.cn id=16 lang=java
 *
 * [16] 最接近的三数之和
 */

// @lc code=start
class Solution {
    public int threeSumClosest(int[] nums, int target) {
        Arrays.sort(nums);
        int sum=Integer.MAX_VALUE/2;
        for (int i = 0; i < nums.length-2; i++) {
            int k=nums.length-1;
            for (int j = i+1; j < k; j++) {
                int v=Integer.MAX_VALUE/2;
                for (int j2 = k; j2 >j; j2--) {
                    int old=Math.abs(v-target);
                    v=nums[i]+nums[j]+nums[j2];
                    int n =Math.abs(v-target);
                    if(v==target){
                        return target;
                    }else{
                        if(n<=Math.abs(sum-target)){
                            sum=v;
                        }
                        if(n>old){
                            k=Math.min(j2+1,nums.length-1);
                            break;
                        }
                    }
                }

            }
        }
        return sum;
    }
}
// @lc code=end

