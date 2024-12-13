import React, { useMemo } from 'react';
import { AgGridReact } from 'ag-grid-react'; // https://www.ag-grid.com/
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';
import { TypeKeyValueForm } from 'modules/types';
import styles from './GridTable.module.scss';

function GridTable({
  columns,
  list,
  activeDefaultColDef,
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
          rowData={list}
          defaultColDef={activeDefaultColDef ? { flex: 1 } : undefined}
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
  list: any[];
  activeDefaultColDef?: boolean;
  disableCheckbox?: boolean;
  paginationPageSize?: number;
  paginationPageSizeSelector?: number[];
  onClickRow?: (id: string) => void;
}

export default GridTable;
