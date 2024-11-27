import React, { useMemo } from 'react';
import { AgGridReact } from 'ag-grid-react'; // React Data Grid Component
import 'ag-grid-community/styles/ag-grid.css'; // Mandatory CSS required by the Data Grid
import 'ag-grid-community/styles/ag-theme-quartz.css';
import styles from './GridTable.module.scss';

function GridTable({
  columns,
  lists,
  disableCheckbox,
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
          paginationPageSize={10}
          paginationPageSizeSelector={[10, 25, 50]}
          onCellClicked={(e: any) => {
            onClickRow(e.data.id);
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
  onClickRow: (id: string) => void;
}

export default GridTable;
