import {Component} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {HttpClient} from "@angular/common/http";
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title = 'vanvoitthoi';
  input: string = '';
  tuGhep: any;
  tuDon: any;
  sameList: any = [];
  semiSameList: any = [];
  formTuDon = [];
  searched = false;
  isMobile = false;
  isLoading = new BehaviorSubject(false);

  constructor(
    private readonly httpClient: HttpClient) {
  }

  ngOnInit(): void {
    this.isMobile = window.screen.width < 500;
    this.readData();
  }

  // #region private function
  private readData(): void {
    this.httpClient.get('assets/data/ghep.xlsx', {responseType: 'blob'})
      .subscribe((data: any) => {
        const reader: FileReader = new FileReader();
        reader.onload = (e: any) => {
          const bstr: string = e.target.result;
          const wb: XLSX.WorkBook = XLSX.read(bstr, {type: 'binary'});
          const wsname: string = wb.SheetNames[0];
          const ws: XLSX.WorkSheet = wb.Sheets[wsname];
          this.tuGhep = XLSX.utils.sheet_to_json(ws, {header: 1});
        };
        reader.readAsBinaryString(data);
      });
    this.httpClient.get('assets/data/don.xlsx', {responseType: 'blob'})
      .subscribe((data: any) => {
        const reader: FileReader = new FileReader();
        reader.onload = (e: any) => {
          const bstr: string = e.target.result;
          const wb: XLSX.WorkBook = XLSX.read(bstr, {type: 'binary'});
          const wsname: string = wb.SheetNames[0];
          const ws: XLSX.WorkSheet = wb.Sheets[wsname];
          this.tuDon = XLSX.utils.sheet_to_json(ws, {header: 1});
        };
        reader.readAsBinaryString(data);
      });
  }

  private removeAccents(str: string): string {
    return str.toString().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  }

  // #endregion
  search(value: string): void {
    this.searched = false;
    this.reset();
    const valueSplit = value.split(' ');
    this.tuGhep.forEach((d: any) => {
      const dSplit = d[0].split(' ');
      if (dSplit.length === valueSplit.length) {
        let same = 0;
        let semiSame = 0;
        for (let i = 0; i < valueSplit.length; i++) {
          if (this.tachPhuAmDau(valueSplit[i]) === this.tachPhuAmDau(dSplit[i])) {
            same++;
            semiSame++;
          } else if (this.tachPhuAmDau(this.removeAccents(valueSplit[i])) === this.tachPhuAmDau(this.removeAccents(dSplit[i]))) {
            semiSame++;
          }
        }
        if (same === valueSplit.length) {
          this.sameList.push(d);
        } else if (semiSame === valueSplit.length) {
          this.semiSameList.push(d);
        }
      }
    });
    const fromTuDon: any = [];
    valueSplit.forEach(word => {
      const wordI: any = [];
      this.tuDon.forEach((tuDon: any) => {
        if (this.tachPhuAmDau(word) === this.tachPhuAmDau(tuDon[0])) {
          wordI.push(tuDon);
        }
      });
      fromTuDon.push(wordI);
    });
    this.formTuDon = this.generateCombinations(fromTuDon);
    this.searched = true;
  }

  private tachPhuAmDau(text: string): string {
    const phuAm = [
      'b', 'ch', 'c', 'd', 'đ', 'gh', 'g', 'h', 'kh', 'k', 'l', 'm', 'nh', 'ng', 'ngh', 'n', 'ph', 'p', 'q', 'r', 's', 'th', 'tr', 't', 'v', 'x', 'y'
    ];

    for (const pA of phuAm) {
      if (text.toLowerCase().startsWith(pA)) {
        return text.toLowerCase().replace(pA, '');
      }
    }

    return text; // Trả về chuỗi rỗng nếu không tìm thấy phụ âm đầu
  }

  private reset(): any {
    this.sameList = [];
    this.semiSameList = [];
  }

  private generateCombinations(arrays: any, currentCombination = [], index = 0, result = []): any {
    if (index === arrays.length) {
      // @ts-ignore
      result.push(currentCombination.toString().replaceAll(',', ' '));
      return;
    }

    const currentArray = arrays[index];
    for (const item of currentArray) {
      const newCombination: any = [...currentCombination, item];
      this.generateCombinations(arrays, newCombination, index + 1, result);
    }

    return result;
  }
}
