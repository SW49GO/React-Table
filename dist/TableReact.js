"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _fa = require("react-icons/fa");
var parms = _interopRequireWildcard(require("./parameters"));
var _propTypes = _interopRequireDefault(require("prop-types"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function TableReact(_ref) {
  var _dataEntries;
  let {
    dataColumns,
    dataAllRows,
    dataEntries,
    handleNbEntries,
    handleResultSearch,
    allowRemoveRow,
    handleRemoveRow,
    backGroundRows,
    customThead,
    customTbody,
    customContainer,
    customModalInfos
  } = _ref;
  // Show Entries default array
  const defaultEntries = ['5', '10', '15', '20', '50', '100'];
  dataEntries = (_dataEntries = dataEntries) !== null && _dataEntries !== void 0 ? _dataEntries : defaultEntries;

  // STATES
  const [dataRows, setDataRows] = (0, _react.useState)(dataAllRows);
  const [nbTotalRows, setNbTotalRows] = (0, _react.useState)(0);
  const [resultSearch, setResultSearch] = (0, _react.useState)([]);
  const [nbEntries, setNbEntries] = (0, _react.useState)(dataEntries[0]);
  // States for Paging
  const [currentPage, setCurrentPage] = (0, _react.useState)(1);
  const [totalPages, setTotalPages] = (0, _react.useState)(1);
  // State Index Column
  const [indexColumn, setIndexColumn] = (0, _react.useState)(0);
  // State for the search column
  const [searchItem, setSearchItem] = (0, _react.useState)(Object.keys(dataRows[0])[indexColumn]);
  // State status array for each Column initializing to null
  const [isChoice, setIsChoice] = (0, _react.useState)(new Array(dataColumns.length).fill(null));
  // State for Index of selected rows to remove
  const [removeData, setRemoveData] = (0, _react.useState)(null);
  // State to show datas of one row selected for media Mobile
  const [showData, setShowData] = (0, _react.useState)(null);

  // Width of each columns
  const widthColumn = 100 / dataColumns.length + '%';

  /**
  * Function to Retrieving data for the current page
  * @returns {array}
  */
  const getCurrentPageData = (0, _react.useCallback)(() => {
    const startIndex = (currentPage - 1) * nbEntries;
    const endIndex = startIndex + nbEntries;
    return dataRows.slice(startIndex, endIndex);
  }, [currentPage, nbEntries, dataRows]);
  (0, _react.useEffect)(() => {
    const totalRows = resultSearch.length > 0 ? resultSearch.length : dataRows.length;
    setNbTotalRows(totalRows);
    setTotalPages(Math.ceil(totalRows / nbEntries));
    setCurrentPage(1);
    if (resultSearch.length > 0) {
      setDataRows(resultSearch);
    } else {
      setDataRows(dataAllRows);
    }
  }, [dataRows, resultSearch, nbEntries, dataAllRows]);

  //  Manage Show Entries and Input Search

  const handleSelectChangeEntries = event => {
    const newValue = event.target.value;
    setNbEntries(newValue);
    handleNbEntries(newValue);
  };
  const handleInputChange = (0, _react.useCallback)(e => {
    const inputSearch = e.target.value.toLowerCase();
    if (inputSearch === '') {
      setResultSearch(dataAllRows);
    } else {
      // Data for the Input Search
      const result = dataRows.filter(item => item[searchItem].toLowerCase().startsWith(inputSearch));
      setResultSearch(result);
      handleResultSearch(result);
    }
  }, [dataRows, searchItem, handleResultSearch, dataAllRows]);

  //   Manage table columns

  // Style thead columns
  const mergedStyleColumns = {
    ...parms.styleTable.thColumn,
    width: widthColumn,
    ...customThead
  };

  /**
   * Function to initialize functions and states when clicked on column
   * @param {number} index (the column clicked)
   */
  const toggleIcon = index => {
    setIndexColumn(index);
    setSearchItem(Object.keys(dataRows[0])[index]);

    // Upgrade [isChoice] for the clicked column
    setIsChoice(prevChoices => prevChoices.map((prevChoice, i) => i === index ? prevChoice === null ? true : !prevChoice : false));
    // Upgrade [isChoice] for the others columns
    setIsChoice(prevChoices => prevChoices.map((prevChoice, i) => i !== index ? null : prevChoice));
    // Call function with column index 
    functionExecuted(index);
  };

  /**
   * Function to load the function to sort datas
   * @param {number} index 
   */
  const functionExecuted = index => {
    if (isChoice[index] === null || isChoice[index] === false) {
      handleClickUp(index);
    } else {
      handleClickDown(index);
    }
  };

  // Array to received datas after sorting
  let newData = [];
  const handleClickUp = index => {
    newData = parms.sortingData(dataRows, dataColumns, index, 'asc');
    setResultSearch(newData);
  };
  const handleClickDown = index => {
    newData = parms.sortingData(dataRows, dataColumns, index, 'desc');
    setResultSearch(newData);
  };

  //  Manage table rows  
  const backgroundRow = backGroundRows !== null && backGroundRows !== void 0 ? backGroundRows : '141, 141, 141';

  /**
   * Function to allow delete a row
   * and function to show row informations under media querie <=768px
   * @param {number} index 
   * @param {*} event 
   */
  const handleClickRow = (index, event) => {
    setRemoveData(index);
    const screenWidth = window.innerWidth;
    if (screenWidth <= 768) {
      setShowData(index);
      if (event) {
        event.stopPropagation();
      }
    }
  };

  /**
   * Function to remove a row
   * @param {number} index 
   */
  const handleRemoveOneRow = index => {
    if (allowRemoveRow) {
      const selectedRow = getCurrentPageData()[index];
      const copyData = [...dataRows];
      const currentData = copyData.findIndex(item => {
        const nbKeys = Object.keys(item);
        return nbKeys > 1 ? item[Object.keys(item)[0]] === selectedRow[Object.keys(selectedRow)[0]] && item[Object.keys(item)[1]] === selectedRow[Object.keys(selectedRow)[1]] && item[Object.keys(item)[2]] === selectedRow[Object.keys(selectedRow)[2]] : item[Object.keys(item)[0]] === selectedRow[Object.keys(selectedRow)[0]] && item[Object.keys(item)[1]] === selectedRow[Object.keys(selectedRow)[1]];
      });
      if (currentData !== -1) {
        handleRemoveRow(copyData[currentData], currentData);
        copyData.splice(parseInt(currentData), 1);
      }
    }
  };

  //  Manage table paging  

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  // If the key value number matches the column number
  if (dataColumns.length > 0 && dataColumns.length === Object.keys(dataRows[0]).length && dataRows.length > 0) {
    var _customContainer$colo, _customContainer$colo2;
    return /*#__PURE__*/_react.default.createElement("div", {
      style: {
        ...parms.styleTable.parentContainerTable,
        ...customContainer
      }
    }, /*#__PURE__*/_react.default.createElement("div", {
      style: parms.styleTable.dataSearch
    }, /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("span", null, "Show "), /*#__PURE__*/_react.default.createElement("select", {
      "aria-label": "Show entries",
      name: "selectNbEntries",
      value: nbEntries,
      onChange: handleSelectChangeEntries,
      "data-testid": "selectNbEntries"
    }, dataEntries.map((item, index) => /*#__PURE__*/_react.default.createElement("option", {
      key: index
    }, item))), /*#__PURE__*/_react.default.createElement("span", null, " entries")), /*#__PURE__*/_react.default.createElement("div", null, "Search: ", /*#__PURE__*/_react.default.createElement("input", {
      style: {
        width: '6rem'
      },
      id: "inputSearch",
      type: "search",
      name: "search",
      onChange: handleInputChange,
      "data-testid": "inputSearch"
    }))), /*#__PURE__*/_react.default.createElement("table", {
      style: parms.styleTable.containerTable
    }, /*#__PURE__*/_react.default.createElement("thead", null, /*#__PURE__*/_react.default.createElement("tr", null, dataColumns && dataColumns.map((item, index) => /*#__PURE__*/_react.default.createElement("th", {
      style: mergedStyleColumns,
      key: index,
      onClick: () => toggleIcon(index)
    }, /*#__PURE__*/_react.default.createElement("div", {
      style: parms.styleTable.tdColumn
    }, /*#__PURE__*/_react.default.createElement("span", {
      style: parms.styleTable.tdColumnSpan
    }, item.name), /*#__PURE__*/_react.default.createElement("div", {
      style: parms.styleTable.iconColumn
    }, /*#__PURE__*/_react.default.createElement(_fa.FaCaretUp, {
      style: {
        opacity: isChoice[index] === null ? 0.3 : isChoice[index] ? 1 : 0.3
      }
    }), /*#__PURE__*/_react.default.createElement(_fa.FaCaretDown, {
      style: {
        opacity: isChoice[index] === null ? 0.3 : isChoice[index] ? 0.3 : 1
      }
    }))))))), /*#__PURE__*/_react.default.createElement("tbody", {
      style: customTbody
    }, getCurrentPageData().map((item, index) => /*#__PURE__*/_react.default.createElement("tr", {
      key: index,
      style: {
        ...parms.styleTable.show,
        backgroundColor: index % 2 === 0 ? "rgba(".concat(backgroundRow, ", 0.4)") : "rgba(".concat(backgroundRow, ", 0.2)"),
        borderTop: index === 0 && '1px solid #000',
        borderBottom: index === getCurrentPageData().length - 1 && '1px solid #000'
      },
      onMouseOver: event => {
        event.target.parentElement.style.backgroundColor = "rgba(".concat(backgroundRow, ", 1)");
        setRemoveData(index);
      },
      onMouseOut: event => {
        event.target.parentElement.style.backgroundColor = index % 2 === 0 ? "rgba(".concat(backgroundRow, ", 0.4)") : "rgba(".concat(backgroundRow, ", 0.2)");
        setRemoveData(null);
      },
      onClick: event => {
        handleClickRow(index, event);
      }
    }, Object.keys(item).map((key, tdIndex) => /*#__PURE__*/_react.default.createElement("td", {
      key: key,
      style: {
        ...parms.styleTable.tdRow,
        width: widthColumn,
        backgroundColor: indexColumn === tdIndex ? index % 2 === 0 ? "rgba(".concat(backgroundRow, ", 1)") : "rgba(".concat(backgroundRow, ", 0.4)") : 'inherit'
      }
    }, item[key])), showData === index && /*#__PURE__*/_react.default.createElement("td", {
      colSpan: Object.keys(item).length
    }, /*#__PURE__*/_react.default.createElement("div", {
      style: {
        ...parms.styleTable.infosRow,
        ...customModalInfos
      }
    }, /*#__PURE__*/_react.default.createElement("p", {
      style: parms.styleTable.closeInfosRow,
      onClick: event => {
        event.stopPropagation();
        setShowData(null);
      }
    }, "X"), Object.keys(dataRows[index]).map(key => /*#__PURE__*/_react.default.createElement("p", {
      key: key
    }, parms.useUpperCaseFistLetter(key), " : ", item[key])))), removeData === index && allowRemoveRow === true && /*#__PURE__*/_react.default.createElement("td", {
      style: parms.styleTable.removeRow,
      onClick: () => handleRemoveOneRow(index)
    }, /*#__PURE__*/_react.default.createElement(_fa.FaRegTrashAlt, null))))), /*#__PURE__*/_react.default.createElement("tfoot", null)), /*#__PURE__*/_react.default.createElement("div", {
      style: parms.styleTable.navContainerPage
    }, /*#__PURE__*/_react.default.createElement("div", null, "Showing ", (currentPage - 1) * nbEntries + 1, " to ", Math.min(currentPage * nbEntries, nbTotalRows), " of ", nbTotalRows), /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("button", {
      style: {
        ...parms.styleTable.btnPages,
        color: (_customContainer$colo = customContainer === null || customContainer === void 0 ? void 0 : customContainer.color) !== null && _customContainer$colo !== void 0 ? _customContainer$colo : parms.styleTable.btnPages.color
      },
      onClick: handlePrevPage
    }, "Preview"), /*#__PURE__*/_react.default.createElement("span", {
      style: parms.styleTable.nbPages
    }, currentPage), /*#__PURE__*/_react.default.createElement("button", {
      style: {
        ...parms.styleTable.btnPages,
        color: (_customContainer$colo2 = customContainer === null || customContainer === void 0 ? void 0 : customContainer.color) !== null && _customContainer$colo2 !== void 0 ? _customContainer$colo2 : parms.styleTable.btnPages.color
      },
      onClick: handleNextPage
    }, "Next"))));
  } else {
    return /*#__PURE__*/_react.default.createElement("div", {
      style: parms.styleTable.error
    }, "OUPSSSS....there's a problem with your data !");
  }
}
TableReact.propTypes = {
  dataColumns: _propTypes.default.array.isRequired,
  dataAllRows: _propTypes.default.array.isRequired,
  dataEntries: _propTypes.default.array,
  handleNbEntries: _propTypes.default.func,
  handleResultSearch: _propTypes.default.func,
  handleRemoveRow: _propTypes.default.func,
  allowRemoveRow: _propTypes.default.bool,
  backGroundRows: _propTypes.default.string,
  customThead: _propTypes.default.object,
  customTbody: _propTypes.default.object,
  customContainer: _propTypes.default.object,
  customModalInfos: _propTypes.default.object
};
var _default = exports.default = TableReact;