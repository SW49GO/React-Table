export const styleTable = {
    parentContainerTable:{ display: 'flex',flexDirection: 'column',alignItems: 'center',width: '100%',fontSize: '1rem',marginBottom: '4rem'},
    dataSearch:{display: 'flex',justifyContent: 'space-between',width: '100%',marginBottom:'1.5rem'},
    containerTable:{tableLayout: 'fixed',width: '100%',borderCollapse: 'collapse', backgroundColor:'#fff', color:'#000'},
    thColumn:{fontSize:'.8rem'},
    tdColumn:{display: 'flex',justifyContent: 'space-between',padding: '0.5rem'},
    tdColumnSpan:{textAlign:'center', boxSizing: 'content-box',overflow: 'hidden',textOverflow: 'ellipsis',whiteSpace: 'wrap', fontSize:'0.8rem'},
    iconColumn:{display: 'flex',flexDirection: 'column'},
    tdRow:{ boxSizing: 'content-box',overflow: 'hidden',textOverflow: 'ellipsis',whiteSpace: 'nowrap', fontSize:'0.9rem'},
    show:{ visibility: 'visible'},
    hidden:{display: 'none'},
    btnPages:{border:'none',backgroundColor: 'transparent'},
    nbPages:{border:'1px solid #000',borderRadius: '.3125rem',background: 'linear-gradient(to top,rgb(188, 189, 189, 0.6),rgb(254, 254, 254))',padding: '.25rem .625rem'},
    navContainerPage:{display: 'flex',justifyContent: 'space-between',width: '100%', marginTop: '1.5rem'},
    infosRow:{position: 'absolute',left:'20%',width: '16rem',padding: '0.5rem',fontSize: '1rem',backgroundColor: '#ededed',border:'1px solid #000',lineHeight: '0.5rem',zIndex: '3'},
    closeInfosRow:{ position:'relative', right: '-15.5rem',top: '-0.5rem'},
    removeRow:{position: 'relative',top:'0',right: '1.8rem'}}

/**
 * Function to sort the datas
 * @param {array} data 
 * @param {number} index 
 * @param {string} sorts 
 * @returns {array} 
 */
export function sortingData(dataRows, dataColumns, index , sorts){
    // Retrieve the key by the index
    const filterColumn = Object.keys(dataRows[0])[index]
    const sorting = dataColumns[index].sort
    console.log('sorting:', sorting)
    const newData = [...dataRows]

    if (sorts==='asc'){
        if(sorting==='NUM'){
            return newData.sort((a, b) => parseInt(a[filterColumn]) - parseInt(b[filterColumn]))
        }else if (sorting==='DATE'){
                return newData.sort((a, b) => {
                        const dateA = convertStringToDate(a[filterColumn])
                        const dateB = convertStringToDate(b[filterColumn])
                        return dateA - dateB
                      })
        }else{
            return newData.sort((a, b) => a[filterColumn].localeCompare(b[filterColumn], 'fr'))
        }
    }else {
        if(sorting==='NUM'){
            return newData.sort((a, b) => parseInt(b[filterColumn]) - parseInt(a[filterColumn]))
        }else if (sorting==='DATE'){
                return newData.sort((a, b) => {
                        const dateA = convertStringToDate(a[filterColumn])
                        const dateB = convertStringToDate(b[filterColumn])
                        return dateB - dateA
                      })
        }else{
            return newData.sort((a, b) => b[filterColumn].localeCompare(a[filterColumn], 'fr'))
        }
    }
}

/**
 * Function to convert format string Date
 * @param {string} dateString 
 * @returns 
 */
export function convertStringToDate(dateString) {
    const [day, month, year] = dateString.split('/');
    return new Date(year, month - 1, day);
}