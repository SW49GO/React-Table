import React from "react"
import { useState, useEffect, useCallback } from "react"
import { FaCaretUp, FaCaretDown, FaRegTrashAlt } from 'react-icons/fa'
import * as parms from './parameters'
import PropTypes from 'prop-types'

function TableReact ({dataColumns, 
                      dataRows, 
                      dataEntries, 
                      handleNbEntries, 
                      handleResultSearch, 
                      allowRemoveRow, 
                      handleRemoveRow, 
                      backGroundRows,
                      customThead,
                      customTbody,
                      customContainer}){

    // Show Entries default array
    const defaultEntries = ['5','10','15','20','50','100']
    dataEntries = dataEntries ?? defaultEntries

    // STATES
    const [nbTotalRows, setNbTotalRows] = useState(0)
    const [resultSearch, setResultSearch] = useState([])
    const [nbEntries, setNbEntries] = useState(dataEntries[0])
    // States for Paging
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)
    // State Index Column
    const [indexColumn, setIndexColumn] = useState(0)
    // State for the search column
    const [searchItem, setSearchItem] = useState(Object.keys(dataRows[0])[indexColumn])
    console.log('searchItem:', searchItem)
    // State status array for each Column initializing to null
    const [isChoice, setIsChoice] = useState(new Array(dataColumns.length).fill(null))
    // State for Index of selected rows to remove
    const [removeData, setRemoveData]= useState(null)
    // State to show datas of one row selected for media Mobile
    const [showData, setShowData]= useState(null)

    // Width of each columns
    const widthColumn = 100 / dataColumns.length + '%'

     /**
     * Function to Retrieving data for the current page
     * @returns {array}
     */
    const getCurrentPageData = useCallback(() => {
        const startIndex = (currentPage - 1) * nbEntries
        const endIndex = startIndex + nbEntries
        return dataRows.slice(startIndex, endIndex)
    }, [currentPage, nbEntries, dataRows])

    useEffect(() => {
        // Data for the Input Search
        const totalRows = resultSearch.length > 0 ? resultSearch.length : dataRows.length
        setNbTotalRows(totalRows)
        setTotalPages(Math.ceil(totalRows / nbEntries))
        setCurrentPage(1)
    }, [dataRows, resultSearch, nbEntries])

//  Manage Show Entries and Input Search

    const handleSelectChangeEntries = (event) => {
        const newValue = event.target.value
        setNbEntries(newValue)
        handleNbEntries(newValue)
    }

    const handleInputChange = useCallback((e) => {
        const inputSearch = e.target.value.toLowerCase()
        const result = dataRows.filter((item) => item[searchItem].toLowerCase().startsWith(inputSearch))
        setResultSearch(result)
        handleResultSearch(result)
    }, [dataRows, searchItem, handleResultSearch])

//   Manage table columns

    // Style thead columns
    const mergedStyleColumns = {
        ...parms.styleTable.thColumn,
        width: widthColumn,
        ...customThead
    }

    /**
     * Function to initialize functions and states when clicked on column
     * @param {number} index (the column clicked)
     */
    const toggleIcon = (index) => {
        setIndexColumn(index)
        setSearchItem(Object.keys(dataRows[0])[index])

        // Upgrade [isChoice] for the clicked column
        setIsChoice((prevChoices) =>
            prevChoices.map((prevChoice, i) =>
            i === index ? (prevChoice === null ? true : !prevChoice) : false
            )
        )
        // Upgrade [isChoice] for the others columns
        setIsChoice((prevChoices) =>
            prevChoices.map((prevChoice, i) =>
            i !== index ? null : prevChoice
            )
    )
    // Call function with column index 
        functionExecuted(index)
    }

    /**
     * Function to load the function to sort datas
     * @param {number} index 
     */
    const functionExecuted = (index) => {

    if (isChoice[index]===null || isChoice[index]===false) {
        handleClickUp(index)
    } else {
        handleClickDown(index)
    }
    }

    // Array to received datas after sorting
    let newData=[]

    const handleClickUp = (index) => {
        newData = parms.sortingData(dataRows, dataColumns, index, 'asc')
        setResultSearch(newData) 
    }

    const handleClickDown = (index) => {
        newData = parms.sortingData(dataRows, dataColumns , index, 'desc')
        setResultSearch(newData)
    }

//  Manage table rows  
    const backgroundRow = backGroundRows ?? '141, 141, 141'

    /**
     * Function to allow delete an employee for Dev
     * or function to show Employee informations under media querie <=768px
     * @param {number} index 
     * @param {*} event 
     */
    const handleClickRow=(index, event)=>{
        setRemoveData(index)
        const screenWidth = window.innerWidth
        if (screenWidth <= 768) {
        setShowData(index)
            if (event) {
                event.stopPropagation()
            }
        }
    }

    /**
     * Function to remove an employee
     * @param {number} index 
     */
    const handleRemoveEmployee=(index)=>{
        if(allowRemoveRow){
        const selectedRow = getCurrentPageData()[index]
        const copyData = [...dataRows]
        const currentData = copyData.findIndex(item =>{
            const nbKeys = Object.keys(item)
            return (nbKeys>1 ? item[Object.keys(item)[0]] === selectedRow[Object.keys(selectedRow)[0]] && item[Object.keys(item)[1]] === selectedRow[Object.keys(selectedRow)[1]] && item[Object.keys(item)[2]] === selectedRow[Object.keys(selectedRow)[2]]: item[Object.keys(item)[0]] === selectedRow[Object.keys(selectedRow)[0]] && item[Object.keys(item)[1]] === selectedRow[Object.keys(selectedRow)[1]])
        })
            if(currentData !== -1){
            handleRemoveRow(copyData[currentData], currentData)
            copyData.splice(parseInt(currentData), 1)
            }
        }
    }

//  Manage table paging  
   
     const handlePrevPage = () => {
        if (currentPage > 1) {
          setCurrentPage(currentPage - 1)
        }
      }
      const handleNextPage = () => {
        if (currentPage < totalPages) {
          setCurrentPage(currentPage + 1)
        }
      }

    // If the key value number matches the column number
    if(dataColumns.length > 0 && dataColumns.length === Object.keys(dataRows[0]).length && dataRows.length > 0){
        return(
        <div style={{...parms.styleTable.parentContainerTable,...customContainer}}>
            {/* SHOW - SEARCH */}
            <div style={parms.styleTable.dataSearch}>
                <div>
                    <span>Show </span>
                    <select aria-label="Show entries" name="selectNbEntries" value={nbEntries} onChange={handleSelectChangeEntries} data-testid="selectNbEntries">
                        {dataEntries.map((item,index)=>(
                        <option key={index} >{item}</option>
                        ))}
                    </select>
                    <span> entries</span>
                </div>
                <div>
                Search: <input style= {{width:'6rem'}} id="inputSearch" type="search" name="search"  onChange={handleInputChange} data-testid="inputSearch"/>
                </div>
            </div>
            {/* TABLE */}
            <table style={parms.styleTable.containerTable}>
                <thead>
                    <tr>
                        {dataColumns &&
                        dataColumns.map((item, index) => (
                            <th style={mergedStyleColumns} key={index} onClick={() => toggleIcon(index)}>
                            <div style={parms.styleTable.tdColumn}>
                                <span style={parms.styleTable.tdColumnSpan}>{item.name}</span>
                                <div style={parms.styleTable.iconColumn}>
                                <FaCaretUp style={{ opacity: isChoice[index] === null ? 0.3 : isChoice[index] ? 1 : 0.3 }} />
                                <FaCaretDown style={{ opacity: isChoice[index] === null ? 0.3 : isChoice[index] ? 0.3 : 1 }} />
                                </div>
                            </div>
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody style={customTbody}>
                    {getCurrentPageData().map((item, index) => (
                        <tr
                        key={index}
                        style={{
                            ...parms.styleTable.show,
                            backgroundColor: index % 2 === 0 ? `rgba(${backgroundRow}, 0.4)` : `rgba(${backgroundRow}, 0.2)`,
                            borderTop: index ===0 && '1px solid #000',  borderBottom: index === getCurrentPageData().length - 1 && '1px solid #000'
                        }}
                        onMouseOver={(event) => {
                            event.target.parentElement.style.backgroundColor = `rgba(${backgroundRow}, 1)`
                            setRemoveData(index)
                        }}
                        onMouseOut={(event) => {
                            event.target.parentElement.style.backgroundColor = index % 2 === 0 ? `rgba(${backgroundRow}, 0.4)` : `rgba(${backgroundRow}, 0.2)`
                            setRemoveData(null)
                        }}
                        onClick={(event)=>{handleClickRow(index,event)}}
                        >
                        {Object.keys(item).map((key, tdIndex) => (
                            <td 
                            key={key}
                            style={{
                                ...parms.styleTable.tdRow,
                                width: widthColumn,
                                backgroundColor:
                                indexColumn === tdIndex ? (index % 2 === 0 ? `rgba(${backgroundRow}, 1)` : `rgba(${backgroundRow}, 0.4)`) : 'inherit'
                            }}
                            >
                            {item[key]}
                            </td>
                        ))}
                        {showData === index && (
                            <td colSpan={Object.keys(item).length} >
                                <div style={parms.styleTable.infosRow}>
                                    <p style={parms.styleTable.closeInfosRow}  onClick={(event) => {event.stopPropagation(); setShowData(null)}}>X</p>
                                    {/* <p>Employee : {item.firstName} {item.lastName}</p>
                                    <p>Dates : S:{item.startDate} B:{item.dateOfBirth}</p>
                                    <p>Department: {item.department}</p>
                                    <p>Adresses: {item.street} </p>
                                    <p>&emsp;&emsp; {item.zipCode} {item.city}</p>
                                    <p>State: {states.find(state => state.abbreviation === item.states)?.name} </p> */}
                                </div>
                            </td>
                        )}
                        {removeData === index && allowRemoveRow === true &&(
                        <td style={parms.styleTable.removeRow} onClick={()=>handleRemoveEmployee(index)}><FaRegTrashAlt/></td>
                        )}
                        </tr>
                    ))}
                </tbody>
                <tfoot></tfoot>
            </table>
            <div style={parms.styleTable.navContainerPage}>
                <div>
                Showing {((currentPage - 1) * nbEntries) + 1} to {Math.min(currentPage * nbEntries, nbTotalRows)} of {nbTotalRows}
                </div>
                {/* PAGING */}
                <div>
                    <button style={parms.styleTable.btnPages} onClick={handlePrevPage}>Preview</button>
                    <span style={parms.styleTable.nbPages}>{currentPage}</span>
                    <button style={parms.styleTable.btnPages} onClick={handleNextPage}>Next</button>
                </div>
            </div>
        </div>)
    }else{
        return(
            <div>NO DATA TO SHOW</div>
        )
    }
}
TableReact.propTypes = {
    dataColumns: PropTypes.array.isRequired,
    dataRows: PropTypes.array.isRequired,
    dataEntries: PropTypes.array
  }


export default TableReact