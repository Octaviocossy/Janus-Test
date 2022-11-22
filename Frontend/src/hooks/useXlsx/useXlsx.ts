import * as XLSX from 'xlsx';

import { Column } from '../../models';

const useXlsx = <T>(data: T[], schema: Column<T>[]) => {
  let template: any = {};
  let parsedData: T[] = [];

  data.forEach((dta) => {
    schema.forEach((sch) => {
      if (sch.Cell) {
        template[sch.Header] = sch.Cell(dta);
      } else {
        template[sch.Header] = dta[sch.accessor as keyof typeof dta];
      }
    });
    parsedData = [...parsedData, template];
    template = {};
  });

  const Xlsx = () => {
    const book = XLSX.utils.book_new();
    const jsonToSheet = XLSX.utils.json_to_sheet(parsedData);

    XLSX.utils.book_append_sheet(book, jsonToSheet, 'Page 1');

    XLSX.writeFile(
      book,
      `${new Date()
        .toLocaleDateString()
        .toString()}-${new Date().getTime()}.xlsx`
    );
  };

  return { Xlsx };
};

export default useXlsx;
