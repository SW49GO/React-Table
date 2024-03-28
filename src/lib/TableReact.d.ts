import * as React from 'react'

// Declaration of the different typings of the Component for compatibility with Typescrypt users

interface TableReactProps {
    dataColumns: any[];
    dataAllRows: any[];
    dataEntries?: any[];
    allowRemoveRo?: boolean;
    backGroundRows?: string;
    customThead?: React.CSSProperties;
    customTbody?: React.CSSProperties;
    customContainer?:React.CSSProperties;
    customModalInfos?: React.CSSProperties;
    handleNbEntries: () => void;
    handleResultSearch: () => void;
    handleRemoveRow?: () => void;
}

declare const TableReact: React.FunctionComponent<TableReactProps>

export default TableReact