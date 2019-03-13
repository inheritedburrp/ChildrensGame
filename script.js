$(function () {
  $("#mainForm").submit(function () {
    try {
      //Extract the value on n and k from the html form
      let n = $('#mainForm').find('input[name="n"]').val();
      let k = $('#mainForm').find('input[name="k"]').val();
      //create a linked list with n elements that represent each child
      let circularLnkdList = new LinkedList();
      if (n != 1) {
        for (let i = 1; i <= n; i++) {
          let node = circularLnkdList.add(i);
          //to make the linked list circular last element in linked list should point to the first element as next
          if (n == i) {
            node.next = circularLnkdList.head;
          }
        }

        let lastManStanding = calculateLastManStanding(circularLnkdList, k);
        $("<h><br>The last man standing for " + n + " children and threshold " + k + " will be number: " + lastManStanding.head.element + "</h>").appendTo(document.body);
      } else {

        $("<h><br>The last man standing for " + n + " children and threshold " + k + " will be number: " + 1 + "</h>").appendTo(document.body);

      }



    } catch (e) {
      console.log(e)
    }
    event.preventDefault();
  });

  /**
   * Recursive function to eliminate the K-th person in each iteration
   * Time complexity is (n^2 - n)
   * @param circularLinkedList: linked list that represents each child in the circle
   * @param k : the threshold value for elemination
   * @returns {*}
   */
  let calculateLastManStanding = function (circularLinkedList, k) {
    //count to track the counting of people
    let count = 1;

    while (count != k) {
      //increment the head till k
      circularLinkedList.head = circularLinkedList.head.next;
      count++;
      //when count or head in linked list has reached k remove the element
      if (count == k) {
        circularLinkedList.removeHead();
      }
    }
    //if there is only single element in linked list thats the answer
    if (circularLinkedList.size == 1) {
      return circularLinkedList;
    }

    return calculateLastManStanding(circularLinkedList, k)
  }
});


/**
 * Linked List implementation
 * @constructor
 */
function LinkedList () {
  this.head = null;
  this.size = 0;
}

/**
 * Node of a linked list and its properties
 * @param element
 * @constructor
 */
function Node (element) {
  this.element = element;
  this.next = null;
}

/**
 * Adds element in the linked list
 * @param element
 * @returns {Node}
 */
LinkedList.prototype.add = function (element) {
  let node = new Node(element);
  let current;
  if (this.head == null)
    this.head = node;
  else {
    current = this.head;
    while (current.next) {
      current = current.next;
    }
    current.next = node;
  }
  this.size++;
  return node;
}

/**
 * Removes the head element from the linked list and points head to the next element in the linked list
 */
LinkedList.prototype.removeHead = function () {
  let prev = this.head;
  let first = this.head;
  while (prev.next !== this.head) {
    prev = prev.next
  }
  prev.next = first.next;
  this.head = prev.next;
  this.size--
}
