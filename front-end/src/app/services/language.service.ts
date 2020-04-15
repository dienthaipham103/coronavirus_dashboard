import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  opt = 0;

  // set onChange object for opt
  change = new Subject();
  set option(value: number) {
    this.opt = value;
    this.change.next();
  }
  get option() {
    return this.opt;
  }

  dic = [{title: 'Theo dõi tình hình dịch bệnh Covid-19',
          description: 'Dịch bệnh bắt đầu ở Vũ Hán, tỉnh Hồ Bắc, Trung Quốc, vào tháng 12 năm 2019',
          case: 'Số ca nhiễm',
          death: 'Số ca tử vong',
          recovered: 'Số ca khỏi bệnh',
          chart_title: 'Các biểu đồ (Dựa theo dữ liệu toàn cầu)',
          linechart00_title: 'Tổng số lượng ca nhiễm, tử vong và khỏi bệnh trên thế giới',
          linechart00_ylabel: 'Số lượng',
          linechart01_title: 'Sự thay đổi của tỉ lệ tử vong và tỉ lệ bình phục theo thời gian',
          linechart01_ylabel: 'Tỉ lệ (%)',
          death_rate: 'Tỉ lệ tử vong',
          recovered_rate: 'Tỉ lệ bình phục',
          linechart02_title: 'Số ca nhiễm, tử vong và bình phục mới mỗi ngày',
          piechart_title: 'Phân bố số lượng ca mắc bệnh giữa các nước trên thế giới (%)',
          barchart00_title: '30 quốc gia có số lượng ca nhiễm nhiều nhất thế giới',
          barchart01_title: 'Số ca nhiễm mới mỗi ngày',
          barchart02_title: 'Số ca tử vong mỗi ngày',
          barchart03_title: 'Số ca khỏi bệnh mỗi ngày',
          stat_title: 'Thống kê',
          col1: 'Hạng',
          col2: 'Quốc gia',
          col3: '',
          col4: 'Nhiễm bệnh',
          col5: 'Tử vong',
          col6: 'Khỏi bệnh',
          col7: 'Đang điều trị',
          col8: 'TL tử vong (%)',
          col9: 'TL khỏi bệnh (%)',
          col10: 'Số ngày dịch bùng phát',
          detail_linechart00_title: 'Tổng số lượng ca nhiễm, tử vong và khỏi bệnh ở ',
          credit: 'Nguồn dữ liệu',
          language: 'Tiếng Việt'},

          {title: 'Coronavirus Dashboard',
          description: 'The outbreak started in Wuhan, Hubei province, China, in December 2019',
          case: 'Cases',
          death: 'Deaths',
          recovered: 'Recovered',
          chart_title: 'Graphs (Global)',
          linechart00_title: 'Cumulative number of cases, deaths and recovered in the world',
          linechart00_ylabel:'Number',
          linechart01_title: 'Change of death rate and recovered rate',
          linechart01_ylabel: 'Rate (%)',
          death_rate: 'Death Rate',
          recovered_rate: 'Recovered Rate',
          linechart02_title: 'Changes of daily Cases, Recovered and Deaths',
          piechart_title: 'Countries cases distribution (%)',
          barchart00_title: '30 countries with high number of cases',
          barchart01_title: 'Daily new cases',
          barchart02_title: 'Daily deaths',
          barchart03_title: 'Daily recovered',
          stat_title: 'Statistics',
          col1: 'Rank',
          col2: 'Flag',
          col3: 'Country',
          col4: 'Cases',
          col5: 'Deaths',
          col6: 'Recovered',
          col7: 'Active',
          col8: 'Death Rate (%)',
          col9: 'Recovered Rate (%)',
          col10: 'Days',
          detail_linechart00_title: 'Cumulative number of cases, deaths and recovered in ',
          credit: 'Data Source',
          language: 'English'}];

  constructor() {
    console.log(this.opt);
  };

  show(content) {
    return this.dic[this.opt][content];
  }

}