/*
 * @lc app=leetcode.cn id=24 lang=java
 *
 * [24] 两两交换链表中的节点
 */

// @lc code=start
/**
 * Definition for singly-linked list.
 * public class ListNode {
 *     int val;
 *     ListNode next;
 *     ListNode(int x) { val = x; }
 * }
 */
class Solution {
    public void chang(ListNode head){
        if(head!=null&&head.next!=null){
            ListNode p=head.next.next;
            ListNode l=head;
            head=head.next;
            head.next=l;
            l.next=p;
            chang(p);
        }else{
            return;
        }
    }
    public ListNode swapPairs(ListNode head) {
        chang(head);
        return head;
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

