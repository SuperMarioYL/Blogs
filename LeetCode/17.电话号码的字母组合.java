import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/*
 * @lc app=leetcode.cn id=17 lang=java
 *
 * [17] 电话号码的字母组合
 */

// @lc code=start
class Solution {
    private Map<String, String[]> tele = new HashMap<>();
    {
        tele.put("2", new String[] { "a", "b", "c" });
        tele.put("3", new String[] { "d", "e", "f" });
        tele.put("4", new String[] { "g", "h", "i" });
        tele.put("5", new String[] { "j", "k", "l" });
        tele.put("6", new String[] { "m", "n", "o" });
        tele.put("7", new String[] { "p", "q", "r", "s" });
        tele.put("8", new String[] { "t", "u", "v" });
        tele.put("9", new String[] { "w", "x", "y", "z" });
    }

    public List<String> letterCombinations(String digits) {
        List<String> llist = new ArrayList<>();
        List<String> rlist = new ArrayList<>();
        String[] strings = digits.split("");
        boolean isone = true;
        for (String str : strings) {
            if(!tele.containsKey(str)){
                return new ArrayList<>();
            }
            boolean isllist = llist.size() <= rlist.size();
            if (isllist) {
                llist.clear();
            } else {
                rlist.clear();
            }
            for (String s : tele.get(str)) {
                if (isone) {
                    llist.add(s);
                }
                if (isllist) {
                    for (String r : rlist) {
                        llist.add(r + s);
                    }

                } else {
                    for (String l : llist) {
                        rlist.add(l + s);
                    }
                }
            }
            isone = false;
        }
        return llist.size() > rlist.size() ? llist : rlist;
    }
}
// @lc code=end
