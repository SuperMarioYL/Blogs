/*
 * @lc app=leetcode.cn id=14 lang=java
 *
 * [14] 最长公共前缀
 */

// @lc code=start
class Solution {
    public String longestCommonPrefix(String[] strs) {
        String s = "";
        if(strs.length==0 || strs[0].length()==0){
            return "";
        }
        if(strs.length==1){
            return strs[0];
        }
        for (int i = strs[0].length(); i > 0; i--) {
            if (strs[1].indexOf(strs[0].substring(0, i)) == 0) {
                s = strs[0].substring(0, i);
                break;
            }
        }
        if (s.equals("")) {
            return "";
        }
        for (String str : strs) {
            if(str.indexOf(s)!=0){
                while (str.indexOf(s)!=0) {
                    s=s.substring(0, s.length()-1);
                    if(s.equals("")){
                        return "";
                    }
                }
            }
        }
        return s;
    }
}
// @lc code=end
