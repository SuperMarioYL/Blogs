/*
 * @lc app=leetcode.cn id=21 lang=java
 *
 * [21] 合并两个有序链表
 */

// @lc code=start
/**
 * Definition for singly-linked list. public class ListNode { int val; ListNode
 * next; ListNode() {} ListNode(int val) { this.val = val; } ListNode(int val,
 * ListNode next) { this.val = val; this.next = next; } }
 */
class Solution {
    public ListNode mergeTwoLists(ListNode l1, ListNode l2) {
        ListNode l = new ListNode(0);
        ListNode point = new ListNode(0);
        while (l1 != null || l2 != null) {
            if (l1 != null && (l2 == null || l1.val <= l2.val)) {
                point.next = new ListNode(l1.val);
                l1 = l1.next;
            } else {
                point.next = new ListNode(l2.val);
                l2 = l2.next;
            }
            if (l.next == null) {
                l.next = point.next;
            }
            point = point.next;
        }
        return l.next;
    }
}

// public class ListNode {
// int val;
// ListNode next;

// ListNode() {
// }

// ListNode(int val) {
// this.val = val;
// }

// ListNode(int val, ListNode next) {
// this.val = val;
// this.next = next;
// }
// }
// @lc code=end
