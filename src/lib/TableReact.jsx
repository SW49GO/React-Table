import React from "react"
import { useState, useEffect } from "react"
import { useDispatch, useSelector } from 'react-redux'
import { selectTotalEmployees, selectEntries, selectTotalSearch, selectEmployees, selectColumn, changeNbEntries,  saveSearch, selectSearch, initializeEmployees, changeColumnIndex,removeEmployee } from "./store"
import { FaCaretUp, FaCaretDown, FaRegTrashAlt } from 'react-icons/fa'
import * as parms from './parameters'
import PropTypes from 'prop-types'

function TableReact ({dataColumns, dataRows, dataEntries}){
    const dispatch = useDispatch()

    // Show Entries default array
    const defaultEntries = ['5','10','15','20','50','100']
    dataEntries = dataEntries ?? defaultEntries

    const widthColumn = 100 / (dataColumns.length) + '%'

    // Datas Table Pagination
    let totalEmployees = parseInt(useSelector(selectTotalEmployees))
    const totalSearch = useSelector(selectTotalSearch)
    const nbEntries = parseInt(useSelector(selectEntries))

    if (totalSearch>0){
        totalEmployees = totalSearch
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

    // Retrieve result of a search
    const resultSearch = useSelector(selectSearch)
    dataRows = resultSearch.length>0 ? resultSearch:allEmployees

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

    // Style thead columns
    const mergedStyleColumns = {
        ...parms.styleTable.thColumn,
        width: widthColumn
    }

    // Status array for each column initializing to null
    const [isChoice, setIsChoice] = useState(new Array(dataColumns.length).fill(null))

    /**
     * Function to initialize functions and states when clicked on column
     * @param {number} index (the column clicked)
     */
    const toggleIcon = (index) => {
    dispatch(changeColumnIndex(index))

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

    // Array ti received datas after sorting
    let newData=[]

    const handleClickUp = (index) => {
    newData = parms.sortingEmployees(dataRows, dataColumns, index, 'asc')
    dispatch(saveSearch(newData))
    }

    const handleClickDown = (index) => {
    newData = parms.sortingEmployees(dataRows, dataColumns , index, 'desc')
    dispatch(saveSearch(newData))
    }
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                  Manage table rows                                                    //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    const backgroundRow='141, 141, 141'
    const indexColumn = useSelector(selectColumn)

    // For DEV : Initialization used delete an employee
    const removeDev = false

    // Index of selected employee to remove
    const [removeEmployeeList, setRemoveEmployeeList]= useState(null)

    const employees = useSelector(selectEmployees)
    // State to show datas of one employee on media Mobile
    const [showData, setShowData]= useState(null)

    /**
     * Function to allow delete an employee for Dev
     * or function to show Employee informations under media querie <=768px
     * @param {number} index 
     * @param {*} event 
     */
    const handleClickRow=(index, event)=>{
        setRemoveEmployeeList(index)
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
    if(removeDev){
    const selectedEmployee = getCurrentPageData()[index]
    const copyEmployee = [...employees]
    const currentEmployee = copyEmployee.findIndex(employee =>{
    return employee.firstName === selectedEmployee.firstName && employee.lastName === selectedEmployee.lastName && employee.city === selectedEmployee.city
    })
    if(currentEmployee !== -1){
    copyEmployee.splice(parseInt(currentEmployee), 1)
    dispatch(removeEmployee(copyEmployee))
    }
    }
    }

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
        <div style={parms.styleTable.parentContainerTable}>
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
                Search: <input style= {{width:'6rem'}} id="inputSearch" type="search" name="search"  onChange={handleInputChange} data-testid="inputSearch"/>
                </div>
            </div>
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
                <tbody>
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
                            setRemoveEmployeeList(index)
                        }}
                        onMouseOut={(event) => {
                            event.target.parentElement.style.backgroundColor = index % 2 === 0 ? `rgba(${backgroundRow}, 0.4)` : `rgba(${backgroundRow}, 0.2)`
                            setRemoveEmployeeList(null)
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
                                <div style={parms.styleTable.infosEmployee}>
                                    <p style={parms.styleTable.closeInfosEmployee}  onClick={(event) => {event.stopPropagation(); setShowData(null)}}>X</p>
                                    {/* <p>Employee : {item.firstName} {item.lastName}</p>
                                    <p>Dates : S:{item.startDate} B:{item.dateOfBirth}</p>
                                    <p>Department: {item.department}</p>
                                    <p>Adresses: {item.street} </p>
                                    <p>&emsp;&emsp; {item.zipCode} {item.city}</p>
                                    <p>State: {states.find(state => state.abbreviation === item.states)?.name} </p> */}
                                </div>
                            </td>
                        )}
                        {removeEmployeeList === index && removeDev === true &&(
                        <td style={parms.styleTable.removeEmployee} onClick={()=>handleRemoveEmployee(index)}><FaRegTrashAlt/></td>
                        )}
                        </tr>
                    ))}
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