import { OnInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { CategoriesDataSource, CategoriesItem } from './categories-datasource';
import { Category } from './category.dto';
import { CategoryService } from './category.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styles: [
    `
      .full-width-table {
        width: 100%;
      }
    `,
  ],
})
export class CategoriesComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<CategoriesItem>;

  dataSource!: MatTableDataSource<Category>;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'name', 'description'];

  showForm: Boolean = false;

  constructor(private categoryService: CategoryService) {}

  ngOnInit(): void {
    this.refreshData();
  }

  onNewCategoryClick() {
    this.showForm = true;
  }

  onBackForm() {
    this.showForm = false;
    this.refreshData();
  }

  refreshData() {
    this.categoryService.getAll().subscribe((categories) => {
      this.dataSource = new MatTableDataSource(categories);
      this.table.dataSource = this.dataSource;
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }

  onSave(category: Category) {
    console.log('Save on category.component.ts', category);

    this.categoryService.save(category).subscribe((categorySaved) => {
      console.log('save on category.component.ts', categorySaved);
      this.showForm = false;
      this.refreshData();
    });
  }
}
