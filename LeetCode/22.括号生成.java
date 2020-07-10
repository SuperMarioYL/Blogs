import java.util.ArrayList;
import java.util.List;
import java.util.Stack;

import sun.print.resources.serviceui;

/*
 * @lc app=leetcode.cn id=22 lang=java
 *
 * [22] 括号生成
 */

// @lc code=start
class Solution {
    public List<String> generateParenthesis(int n) {
        List<String> list = new ArrayList<>();
        int l =(int) Math.pow(2.0, 2.0 * n - 1);
        List<Integer> p = new ArrayList<>();
        for (int i = 0; i < l; i++) {
            if (i % 2 == 1) {
                p.add(i);
            }
        }
        String s;
        Stack<Character> stack = new Stack<Character>();
        for (Integer integer : p) {
            s = String.format("%0"+2*n+"d", Long.parseLong(Integer.toBinaryString(integer)));
            boolean y = true;
            for (char ch : s.toCharArray()) {
                if (ch == '0')
                    stack.push('1');
                else if (stack.isEmpty()||ch != stack.pop())
                    y = false;
            }
            if (y&&stack.isEmpty()) {
                s=s.replace('0', '(');
                s=s.replace('1', ')');
                list.add(s);
            }
            stack.clear();
        }
        return list;

    }
}
// @lc code=end
