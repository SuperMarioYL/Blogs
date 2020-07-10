import java.util.ArrayList;
import java.util.List;

/*
 * @lc app=leetcode.cn id=36 lang=java
 *
 * [36] 有效的数独
 */

// @lc code=start
class Solution {
    public boolean isValidSudoku(char[][] board) {
        List<Character> val = new ArrayList<>();
        List<Character> var = new ArrayList<>();
        for (int i = 0; i < 9; i++) {
            val.clear();
            var.clear();
            for (int j = 0; j < 9; j++) {
                if (val.contains(board[i][j]) && board[i][j] != '.') {
                    return false;
                }
                val.add(board[i][j]);
                if (var.contains(board[j][i]) && board[j][i] != '.') {
                    return false;
                }
                var.add(board[j][i]);
            }
        }
        for (int i = 0; i < 9; i = i + 3) {
            for (int j = 0; j < 9; j = j + 3) {
                val.clear();
                for (int i2 = i; i2 < i + 3; i2++) {
                    for (int j2 = j; j2 < j2 + 3; j2++) {
                        if (val.contains(board[i2][j2]) && board[i2][j2] != '.') {
                            return false;
                        }
                        val.add(board[i2][j2]);
                    }
                }
            }
        }
        return true;
    }
}
// @lc code=end
