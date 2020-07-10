package Blogs.LeetCode;
import java.util.regex.Pattern;


/*
 * @lc app=leetcode.cn id=10 lang=java
 *
 * [10] 正则表达式匹配
 */

// @lc code=start
class Solution {
    public boolean isMatch(String s, String p) {
        return Pattern.matches(p, s);
    }
}
// @lc code=end
