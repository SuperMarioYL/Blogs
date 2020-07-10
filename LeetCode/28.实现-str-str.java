import sun.reflect.generics.tree.ReturnType;

/*
 * @lc app=leetcode.cn id=28 lang=java
 *
 * [28] 实现 strStr()
 */

// @lc code=start
class Solution {
    public int strStr(String haystack, String needle) {
        char[] str = haystack.toCharArray();
        char[] n = needle.toCharArray();
        if (n.length == 0) {
            return 0;
        }
        for (int i = 0; i < str.length; i++) {
            if (str[i] == n[0]) {
                int j = 1;
                for (; j < n.length; j++) {
                    if (str[i + j] != n[j]) {
                        break;
                    }
                }
                if (j == n.length - 1) {
                    return i;
                }
            }
        }
        return -1;

    }
}
// @lc code=end
