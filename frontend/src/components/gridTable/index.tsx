import React, { useMemo } from 'react';
import { AgGridReact } from 'ag-grid-react'; // https://www.ag-grid.com/
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';
import styles from './GridTable.module.scss';

function GridTable({
  columns,
  lists,
  disableCheckbox,
  paginationPageSize,
  paginationPageSizeSelector,
  onClickRow,
}: TypeGridTable) {
  // 체크박스 기능
  const rowSelection: any = useMemo(
    () => ({
      mode: 'multiRow',
    }),
    [],
  );

  return (
    <div className={styles.wrap}>
      <div
        className={[styles.innerWrap, 'ag-theme-quartz'].join(' ')} // applying the Data Grid theme
      >
        <AgGridReact
          columnDefs={columns}
          rowData={lists}
          defaultColDef={{ flex: 1 }}
          rowSelection={disableCheckbox && rowSelection}
          pagination
          paginationPageSize={paginationPageSize || 10}
          paginationPageSizeSelector={
            paginationPageSizeSelector || [10, 25, 50]
          }
          onCellClicked={(e: any) => {
            if (onClickRow) onClickRow(e.data);
          }}
        />
      </div>
    </div>
  );
}

interface TypeGridTable {
  columns: any[];
  lists: any[];
  disableCheckbox?: boolean;
  paginationPageSize?: number;
  paginationPageSizeSelector?: number[];
  onClickRow?: (id: string) => void;
}

export default GridTable;
