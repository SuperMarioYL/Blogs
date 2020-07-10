/*
 * @lc app=leetcode.cn id=23 lang=java
 *
 * [23] 合并K个排序链表
 */

// @lc code=start
/**
 * Definition for singly-linked list. public class ListNode { int val; ListNode
 * next; ListNode(int x) { val = x; } }
 */
class Solution {
    public void sort(ListNode l, ListNode r) {
        ListNode head = new ListNode(0);
        ListNode p = head;
        while (l != null || r != null) {
            if (l == null && r != null) {
                head.next = r;
                head = head.next;
                break;
            } else if (r == null && l != null) {
                head.next = l;
                break;
            } else if (l.val <= r.val) {
                head.next = l;
                head = head.next;
                l = l.next;
            } else {
                head.next = r;
                head = head.next;
                r = r.next;
            }
        }
        l = p.next;
    }

    public ListNode mergeKLists(ListNode[] lists) {
        int p = 0;
        if (lists.length == 0) {
            return null;
        }
        for (int i = 1; i < lists.length; i++) {
            if (lists[p] == null) {
                p++;
                continue;
            }
            sort(lists[p], lists[i]);
        }
        return lists[p].next;
    }
}

// class ListNode {
// int val;
// ListNode next;

// ListNode(int x) {
// val = x;
// }
// }
// @lc code=end
