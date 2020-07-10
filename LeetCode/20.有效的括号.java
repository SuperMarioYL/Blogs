/*
 * @lc app=leetcode.cn id=20 lang=java
 *
 * [20] 有效的括号
 */

// @lc code=start
class Solution {
    public boolean isValid(String s) {
        if(s.length()==0){
            return true;
        }
        int len=s.length()-1;
        while(len!=s.length()){
            len=s.length();
            s=s.replaceAll("\\(\\)", "");
            s=s.replaceAll("\\[\\]", "");
            s=s.replaceAll("\\{\\}", "");
        }
        if(s.length()==0){
            return true;
        }
        return false;
    }
}
// @lc code=end

