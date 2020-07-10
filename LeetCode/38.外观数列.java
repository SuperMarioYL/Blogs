package Blogs.LeetCode;
/*
 * @lc app=leetcode.cn id=38 lang=java
 *
 * [38] 外观数列
 */

// @lc code=start
class Solution {
    public String countAndSay(int n) {
        StringBuilder[] str = new StringBuilder[n];
        str[0]=new StringBuilder().append("1");
        for (int i = 1; i < n; i++) {
            str[i]=new StringBuilder().append("");
            char[] chars = str[i - 1].toString().toCharArray();
            for (int j = 0, count = 1; j < chars.length; j++) {
                if (chars[j] != chars[j + 1]) {
                    str[i].append(count);
                    str[i].append(chars[j + 1]);
                    count = 1;
                } else {
                    count++;
                }
            }
        }
        return str[n - 1].toString();
    }
}
// @lc code=end
