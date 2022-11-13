import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title = 'Tôi nên ăn gì?';
  options: any = [];
  list = [
    'Bún bò', 'Bún đậu mắm tôm', 'Bún đậu nước mắm', 'Bún riêu', 'Bún chả', 'Bún cá', 'Bún ngan', 'Bún bò Huế', 'Hủ tiếu',
    'Cơm rang dưa bò', 'Cơm rang cải bò', 'Cơm rang đùi gà', 'Cơm rang', 'Nghèo rồi, ăn cơm bụi đi', 'Nghèo thì đi nấu cơm đi', 'Cơm tấm', 'Cơm cháy', 'Cơm mẹ nấu',
    'Phở bò', 'Phở gà', 'Phở ngan', 'Phở cuốn',
    'Cháo lòng', 'Cháo gà',
    'Mì lòng', 'Mì Quảng', 'Mì xào', 'Miến trộn',
    'Gà rán', 'Khoai tây lắc phô mai', 'Nem nướng Nha Trang',
    'Lẩu', 'Nướng', 'Xiên bẩn', 'Chả cá', 'Ốc', 'Mướp đắng nhồi thịt', 'Nem chua', 'Nem chua rán',
    'Bánh mì', 'Bánh xèo', 'Bánh bao', 'Bánh cuốn', 'Bánh bèo', 'Bánh bột lọc', 'Bánh chưng', 'Bánh tráng trộn', 'Bánh tráng nướng', 'Bánh tráng cuộn', 'Bánh rán',
    'Bánh trung thu', 'Bông lan trứng muối',
    'Bò sốt vang', 'Chả lá lốt', 'Giả cầy ', 'Tiết canh', 'Thịt chua', 'Trứng vịt lộn', 'Cút lộn mè sao',
    'Tôm hùm', 'Cua hoàng đế', 'Hải sản cao cấp', 'Chè', 'Tào phớ', 'Sương sa hạt lựu',
    'Uống rượu thay cơm', 'Uống bia thay cơm', 'Thịt chó', 'Thịt mèo', 'Thịt kho tàu',
    'Xôi xéo', 'Xôi gấc', 'Xôi lạc', 'Xôi dừa', 'Xôi chim', 'Xôi gà', 'Cốm',
    'It\'s giảm cân time', 'Ăn đấm', 'Ăn đòn', 'Ăn đồng bằng ăn cát', 'Ăn năn hối cải', 'Ăn cháo đá bát',
    'Xoài xanh chấp bột canh', 'Gà hầm lá ngải', 'Trứng hầm lá ngải',
    'Sữa đậu nành', 'Ngô nướng', 'Đi nhậu thôiii!'
  ];
  optionSelected = '';
  showLoading = false;
  selectCount = 0;
  hiddenButton = false;
  isIntransigent = false;
  constructor() {
    this.options = this.list;
  }

  select() {
    if (this.selectCount < 3) {
      this.showLoading = true;
      const timeWaiting = 4000 / (this.options.length * 3);
      for (let i = 0; i < this.options.length * 3; i++) {
        setTimeout(() => {
          this.optionSelected = '';
          this.optionSelected = this.options[Math.floor(Math.random() * this.options.length)];
        }, i * timeWaiting)
      }
      setTimeout(() => {
        this.optionSelected = this.options[Math.floor(Math.random() * this.options.length)];
        if (!this.isIntransigent) {
          this.selectCount++;
        }
        this.showLoading = false;
      }, 4000);
    } else {
      this.hiddenButton = true;
      this.optionSelected = 'Ăn đấm';
    }
  }

  makeMeIntransigent() {
    this.selectCount = 0;
    this.hiddenButton = false;
    this.isIntransigent = true;
  }
}
