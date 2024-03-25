import React from "react"
import { useState, useEffect } from "react"
import { useDispatch, useSelector } from 'react-redux'
import { selectTotalEmployees, selectEntries, selectTotalSearch, selectEmployees, selectColumn, changeNbEntries,  saveSearch, initializeEmployees } from "./store"
import * as parms from './parameters'

function TableReact ({dataColumns, dataRows, dataEntries}){
    const dispatch = useDispatch()
    const widthColumn = 100 / (dataColumns.length) + '%'

    // Datas Table Pagination
    let totalEmployees = parseInt(useSelector(selectTotalEmployees))
    const totalSearch = useSelector(selectTotalSearch)
    const nbEntries = parseInt(useSelector(selectEntries))

    if (totalSearch>0){
        totalEmployees=totalSearch
    }
    // Initialize Rows
    if (totalEmployees === 0){
      dispatch(initializeEmployees(dataRows))
    }
    // States for Paging
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)

    // Updating the total number of pages every time the data changes
    useEffect(() => {
    setTotalPages(Math.ceil(dataRows.length / (nbEntries)))
    setCurrentPage(1)
    }, [dataRows, nbEntries])

    /**
     * Function to Retrieving data for the current page
     * @returns {array}
     */
    const getCurrentPageData = () => {
    const startIndex = parseInt(currentPage - 1) * parseInt(nbEntries)
    const endIndex = parseInt(startIndex) + parseInt(nbEntries)
    // Breaking down the data table
    return dataRows.slice(startIndex, endIndex)
    }
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                            Show Entries and Input Search                                              //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // For the number of entries
        const entriesSelected = useSelector(selectEntries)
        const [selectedEntries, setSelectedEntries] = useState(entriesSelected)
    
        const handleSelectChangeEntries = (event) => {
            const newValue = event.target.value
            setSelectedEntries(newValue)
            dispatch(changeNbEntries(newValue))
        }
    // For the Input Search
         // Employees array
         const allEmployees = useSelector(selectEmployees)
         const filterColumn = useSelector(selectColumn)
         // Definition of the search column
         const searchItem = Object.keys(allEmployees[0])[filterColumn]
         
     /**
      * Function to search word in the column selected
      * @param {object} e 
      */
         const handleInputChange=(e)=>{
             const inputSearch = e.target.value.toLowerCase()
             const result = allEmployees.filter((item)=> item[searchItem].toLowerCase().startsWith(inputSearch))
             // Store the result
             dispatch(saveSearch(result))
         }
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                  Manage table columns                                                 //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                  Manage table rows                                                    //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                  Manage table paging                                                  //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

     //Function to manage paging
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
        <div>
            <div style={parms.styleTable.employeeSearch}>
                <div>
                    <span>Show </span>
                    <select aria-label="Show entries" name="selectNbEntries" value={selectedEntries} onChange={handleSelectChangeEntries} data-testid="selectNbEntries">
                        {dataEntries.map((item,index)=>(
                        <option key={index} >{item}</option>
                        ))}
                    </select>
                    <span> entries</span>
                </div>
                <div>
                Search: <input id="inputSearch" type="search" name="search"  onChange={handleInputChange} data-testid="inputSearch"/>
                </div>
            </div>
            <table style={parms.styleTable.containerTable}>
                <thead>
                    {/* {dataColumns.length>0 &&<ColumnTable dataColumns={dataColumns} widthColumn={widthColumn} dataRows={dataRows}/>} */}
                </thead>
                <tbody>
                    {/* <RowTable widthColumn={widthColumn} backgroundRow={'66,214,188'} getCurrentPageData={getCurrentPageData}/> */}
                </tbody>
                <tfoot></tfoot>
            </table>
            <div style={parms.styleTable.navContainerPage}>
                <div>
                Showing {((currentPage - 1) * nbEntries) + 1} to {Math.min(currentPage * nbEntries, totalEmployees)} of {totalEmployees}
                </div>
                <div>
                    <button style={parms.styleTable.btnPages} onClick={handlePrevPage}>Preview</button>
                    <span style={parms.styleTable.nbPages}>{currentPage}</span>
                    <button style={parms.styleTable.btnPages} onClick={handleNextPage}>Next</button>
                </div>
            </div>
        </div>)
    }else{

    }
}



export default TableReact