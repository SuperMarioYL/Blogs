/*
 * @lc app=leetcode.cn id=8 lang=java
 *
 * [8] 字符串转换整数 (atoi)
 */

// @lc code=start
class Solution {
    public int myAtoi(String str) {
        String s="";
        while(str.startsWith(" ")){
            str=str.substring(1);
        }
        if(str.startsWith("+")){
            str=str.substring(1);
            if(str.startsWith("-")){
                return 0;
            }   
        }
        if(str.startsWith("-")){
            s=s+"-";
            str=str.substring(1);
        }
        if(str.length()==0){
            return 0;
        }
        while(str.charAt(0)>=47&&str.charAt(0)<=58){
            s=s+str.charAt(0);
            str=str.substring(1);
            if(str.length()==0){
                break;
            }
        }
        if(s.length()==0||s.length()==1&&s.startsWith("-")){
            return 0;
        }
        try{
            return Integer.valueOf(s);
        }catch(Exception e){
            if(s.startsWith("-")){
                return Integer.MIN_VALUE;
            }else{
                return Integer.MAX_VALUE;
            }
        }
    }
}
// @lc code=end

