import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';
import { StatisticService } from 'src/app/services/statistic.service';

// TODO: Replace this with your own data model type
export interface StatisticItem {
  country: string;
  rank: number;
  cases: number;
  deaths: number;
  recovered: number;
  active: number;
  death_rate: number;
  recovered_rate: number;
  flag: string,
  days: number
}

// TODO: replace this with real data from your application
// const EXAMPLE_DATA: StatisticItem[] = [
//   {rank: 1, name: '	United States', flag: 'assets/flags/us.png'},
//   {rank: 2, name: 'Spain', flag: 'assets/flags/spain.png'},
//   {rank: 3, name: 'Italy', flag: 'assets/flags/itali.png'}
// ];

/**
 * Data source for the Statistic view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class StatisticDataSource extends DataSource<StatisticItem> {
  data: StatisticItem[];
  paginator: MatPaginator;
  sort: MatSort;

  constructor(statisticService) {
    super();
    statisticService.getData().subscribe(data=>{
      this.data = data;
      console.log(data);
      console.log(this.data);
    })
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<StatisticItem[]> {
    // Combine everything that affects the rendered data into one update
    // stream for the data-table to consume.
    const dataMutations = [
      observableOf(this.data),
      this.paginator.page,
      this.sort.sortChange
    ];

    return merge(...dataMutations).pipe(map(() => {
      return this.getPagedData(this.getSortedData([...this.data]));
    }));
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect() {}

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getPagedData(data: StatisticItem[]) {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    return data.splice(startIndex, this.paginator.pageSize);
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: StatisticItem[]) {
    if (!this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort.direction === 'asc';
      switch (this.sort.active) {
        case 'country': return compare(a.country, b.country, isAsc);
        case 'rank': return compare(+a.rank, +b.rank, isAsc);
        case 'flag': return compare(a.flag, b.flag, isAsc);
        case 'cases': return compare(+a.cases, +b.cases, !isAsc);
        case 'deaths': return compare(+a.deaths, +b.deaths, !isAsc);
        case 'recovered': return compare(+a.recovered, +b.recovered, !isAsc);
        case 'active': return compare(+a.active, +b.active, !isAsc);
        case 'death_rate': return compare(+a.death_rate, +b.death_rate, !isAsc);
        case 'recovered_rate': return compare(+a.recovered_rate, +b.recovered_rate, !isAsc);
        case 'days': return compare(+a.days, +b.days, !isAsc);
        default: return 0;
      }
    });
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a: string | number, b: string | number, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
