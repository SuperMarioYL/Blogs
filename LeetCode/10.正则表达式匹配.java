import java.util.regex.Pattern;

import sun.security.util.Length;

/*
 * @lc app=leetcode.cn id=10 lang=java
 *
 * [10] 正则表达式匹配
 */

// @lc code=start
import java.util.regex.Pattern;
class Solution {
    public boolean isMatch(String s, String p) {
        return Pattern.matches(p, s);
    }
}
// @lc code=end
