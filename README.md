# Table React components created using `create-react-app` by SW49GO

## Presentation :
This is a reusable React component that allows you to display a custom Table in your application.

In this table :
- You can choose the number of lines to display
- You can carry out a search on each column by first clicking on the column header
- The data display can be sorted by column in ascending or descending order by clicking on the desired column header
- You have the possibility, using the 'allowRemoveRow' props, to make an icon appear on each line to retrieve its contents using the associated callback function 'handleRemoveRow'

##### The component is TypeScript compatible and includes a type definition file (TableReact.d.ts) for an improved development experience. In a TypeScript project, the TypeScript compiler will automatically use this definition file.

### Examples Custom style :
<img src="https://raw.githubusercontent.com/SW49GO/React-Table/master/public/assets/example.jpg" alt="datepicker"/>

## Installing the package in your project:
```bash
npm i table-react-sw49go
```
## Prerequisites :
- Node.js v18.16.0

## Dependencies to install :
- "react": "^18.2.0"
- "react-dom": "^18.2.0"
- "prop-types": "^15.8.1"
- "react-icons": "^5.0.1"

## Format of data :
```
/** COLUMNS CONFIGURATION :
*   keys: 'name' for title thead & 'sort' initialize the expected behavior of sorting data, REQUIRED
*   values : 'AZ' for alphanumeric
*            'NUM' for number
*            'DATE' format for date dd/mm/yyyy 
*/


    const columns = [
        {name:'Fruits',sort:'AZ'},
        {name:'Flowers',sort:'AZ'}, 
        {name:'Date d\'achat',sort:'DATE'},
        {name:'Price',sort:'NUM'}
    ]

    const data =[
        { fruit: 'Banane', flower:'Tulipe', date:'10/02/2024', price:10},
        { fruit: 'Orange', flower:'Rose', date:'07/01/2024', price:25}]

// Number entries NOT REQUIRED but can be changed, default is :

    const entries = ['5','10','15','20','50','100']
```

## Imported the component into your project :
```
import { TableReact } from 'table-react-sw49go'

// IMPORT YOUR DATA

function App(){

// Function to retrieve number of entries selected
    const handleNbEntries=(nbEntries)=>{
        console.log('nbEntries:', nbEntries)
    }

// Function to retrieve search generated object
    const handleResultSearch= (result)=>{
        console.log('result:', result)
    }

// Function to retrieve the row selected 'to be remove or other' and his index if 'allowRemoveRow' be 'true'
    const handleRemoveRow= (objRemove, index)=>{
        console.log('index:', index)
        console.log('objRemove:', objRemove)
    }

    return (
        <div>
            <TableReact dataColumns={columns}
                        dataAllRows={data}
                        handleNbEntries={handleNbEntries}
                        handleResultSearch={handleResultSearch}
                        handleRemoveRow={handleRemoveRow}
                        allowRemoveRow={true}
                        customThead={{backgroundColor:'#1a2e91', color:'#00f2ff'}}
                        backGroundRows={'101, 201, 237'}
                        customContainer={{border:'1px solid black', borderRadius:'1rem', backgroundColor:'blue',padding:'1rem', color:"#fff"}}
                       />
        </div>
    )
}
export default App
```

# Using the different component options (Props):
- dataColumns (array) : data to be display in table head - REQUIRED
- dataAllRows (array) : data to be display in table body - REQUIRED
- dataEntries (array) : data to be in the selected show entries 
- handleNbEntries (function) : callback function to retrieve number of entries selected 
- handleResultSearch (function) : callback function to retrieve search generated object 
- handleRemoveRow (function) : callback function to retrieve the row selected 'to be remove or other' and his index if allowRemoveRow be 'true'
- allowRemoveRow (boolean) : allow retrieve the object selected
- backGroundRows (string) : the RGB color of background rows
- customThead (object) :  CssProperties to custom thead of table
- customTbody (object) :  CssProperties to custom tbody of table
- customContainer (object) :  CssProperties to custom the container with all parts
- customModalInfos (object) :  CssProperties to custom infos when click on data in window < 768px