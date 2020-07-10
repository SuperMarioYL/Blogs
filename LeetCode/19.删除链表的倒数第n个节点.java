/*
 * @lc app=leetcode.cn id=19 lang=java
 *
 * [19] 删除链表的倒数第N个节点
 */

// @lc code=start
/**
 * Definition for singly-linked list. public class ListNode { int val; ListNode
 * next; ListNode(int x) { val = x; } }
 */
// private class ListNode {
// int val;
// ListNode next;
// ListNode(int x) {
// val = x;
// }
// }
class Solution {
    private int getNodeLength(ListNode node, int n) {
        if (node.next != null) {
            return getNodeLength(node.next, n + 1);
        } else {
            return n;
        }
    }

    private void nodeDelete(ListNode node, int n) {
        if (n == 1) {
            node.next = node.next.next;
        } else {
            nodeDelete(node.next, --n);
        }
    }

    public ListNode removeNthFromEnd(ListNode head, int n) {
        int l = getNodeLength(head, 1);
        if (l - n == 0) {
            if (head.next != null) {
                head = head.next;
            } else {
                return null;
            }
        } else {
            nodeDelete(head, l - n);
        }
        return head;
    }
}
// @lc code=end
