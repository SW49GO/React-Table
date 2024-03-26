export const styleTable = {
    parentContainerTable:{ display: 'flex',flexDirection: 'column',alignItems: 'center',width: '100%',fontSize: '1rem',marginBottom: '4rem'},
    dataSearch:{display: 'flex',justifyContent: 'space-between',width: '100%',marginBottom:'1.5rem'},
    containerTable:{tableLayout: 'fixed',width: '100%',borderCollapse: 'collapse', backgroundColor:'#fff', color:'#000'},
    thColumn:{fontSize:'.8rem'},
    tdColumn:{display: 'flex',justifyContent: 'space-between',padding: '0.5rem'},
    tdColumnSpan:{textAlign:'center', boxSizing: 'content-box',overflow: 'hidden',textOverflow: 'ellipsis',whiteSpace: 'wrap', fontSize:'0.8rem'},
    iconColumn:{display: 'flex',flexDirection: 'column'},
    tdRow:{ boxSizing: 'content-box',overflow: 'hidden',textOverflow: 'ellipsis',whiteSpace: 'nowrap', fontSize:'0.9rem', padding:'.3rem'},
    show:{ visibility: 'visible'},
    hidden:{display: 'none'},
    btnPages:{border:'none',backgroundColor: 'transparent', color:"#000"},
    nbPages:{border:'1px solid #000',borderRadius: '.3125rem',background: 'linear-gradient(to top,rgb(188, 189, 189, 0.6),rgb(254, 254, 254))',padding: '.25rem .625rem'},
    navContainerPage:{display: 'flex',justifyContent: 'space-between',width: '100%', marginTop: '1.5rem'},
    infosRow:{position: 'absolute',padding: '1rem',fontSize: '1rem',backgroundColor: '#ededed',border:'1px solid #000',lineHeight: '0.5rem',zIndex: '3',top: '50%' ,left: '50%' ,transform: 'translate(-50%, -50%)'},
    closeInfosRow:{ position:'relative', right: '0rem',top: '-1rem'},
    removeRow:{position: 'relative',top:'0',right: '1.8rem'},
    error:{margin:'5rem'}
}

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

/**
 * Function to checks word and pass first letter to uppercase
 * @param {string} word 
 * @returns {string} 
 */
export function useUpperCaseFistLetter(word){
    // Check the word or multiple words
    if (word && typeof word === 'string' && word.trim().length > 0) {
        // Use space to separate word
        const words = word.trim().split(/\s+/)

        const capitalizedWords = words.map((w, index) => {
            // Capitalize the first word only
            if (index === 0 && /^[A-Za-z]+$/.test(w)) {
                return w.charAt(0).toUpperCase() + w.slice(1)
            } else {
                return w
            }
        })
        // Return all words
        return capitalizedWords.join(' ')
    } 
}