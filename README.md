I.	Event loop, callback.
Event loop.
-  JS là ngôn ngữ đơn luồng nên khi gặp tác vụ to dễ bị rơi vào tình trạng blocking(những task sau đơn giản là phải chờ cái task lớn thực hiện xong) và Eventloop ra đời để giải quyết vấn đề này.
- CallBack: đơn giản là 1 hàm sẽ được gọi từ hàm khác
II.	This trong JavaScript
- This: Chỉ tới đối tượng mà hiện tại nó đang xử lý (gần giống pointer), nó sẽ mang những đặc điểm của object đấy
III.	Object
- Object chứa các thuộc tính và phương thức, và có đảm bảo 4 tính chất hướng đổi tượng như các ngôn ngữ khác
- Object trong JS được tạo nên từ function
IV.	prototype
- Object kế thừa prototype và kế thừa cả thuộc tính lẫn phương thức nằm trong protype của mình 
- Protytype cũng là một object, Dùng để thêm thuộc tính vào một đối tượng
