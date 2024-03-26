import TableReact from "../lib/TableReact"


function App(){

    const columns = [
        {name:'First Name',sort:'AZ'},
        {name:'Last Name',sort:'AZ'}, 
        {name:'Date of Birth',sort:'DATE'},
        {name:'Start Date',sort:'DATE'},
        {name:'Department',sort:'AZ'},
        {name:'Street',sort:'AZ'},
        {name:'City',sort:'AZ'},
        {name:'State',sort:'AZ'},
        {name:'Zip Code',sort:'NUM'}]
    // const columns = [
    //     {name:'Fruits',sort:'AZ'},
    //     {name:'Fleurs',sort:'AZ'}, 
    //     {name:'Date d\'achat',sort:'DATE'},
    //     {name:'Prix',sort:'NUM'}
    // ]
    // const employeesData =[
    //     { fruit: 'Banane', fleur:'Tulipe', date:'10/02/2024', prix:'10'},
    //     { fruit: 'Orange', fleur:'Rose', date:'07/01/2024', prix:'25'}]
    const employeesData =[
        { firstName: 'Lea' , lastName: 'Laravel' , dateOfBirth: '02/10/1970', startDate: '10/01/2024' ,department: 'Engineering', street:'Verdun', city: 'Angers' ,states:'AL', zipCode: '49000'},
        { firstName: 'Etienne' , lastName: 'Daho' , dateOfBirth: '20/07/1973', startDate: '17/02/2024' ,department: 'Sales', street:'Charles', city: 'Nantes' ,states:'AK', zipCode: '44000'},
        { firstName: 'John' , lastName: 'Portman' , dateOfBirth: '07/03/1975', startDate: '11/03/2024' ,department: 'Marketing', street:'Minier', city: 'Montauban' ,states:'CA', zipCode: '82000'},
        { firstName: 'Marie' , lastName: 'Goldman' , dateOfBirth: '10/04/1965', startDate: '23/05/2024' ,department: 'Legal', street:'Hotel bleu', city: 'Cholet' ,states:'ID', zipCode: '49000'},
        { firstName: 'Paul' , lastName: 'Newman' , dateOfBirth: '06/10/1963', startDate: '21/07/2024' ,department: 'Sales', street:'Des motos', city: 'Lyon' ,states:'FL', zipCode: '87000'},
        { firstName: 'Bradley' , lastName: 'Cooper' , dateOfBirth: '15/103/1971', startDate: '29/07/2024' ,department: 'Sales', street:'Gemmes', city: 'Nantes' ,states:'FL', zipCode: '44000'}
    ]
    //const entries = ['5','10','15','20','50','100']
    const handleNbEntries=(nb)=>{
        console.log('nb:', nb)
    }
    const handleResultSearch= (result)=>{
        console.log('result:', result)
    }
    const handleRemoveRow= (objRemove, index)=>{
        console.log('index:', index)
        console.log('objRemove:', objRemove)
    }

    return (
        <div style={{width:'90%', margin:'0 auto'}}>
            <TableReact dataColumns={columns}
                        dataRows={employeesData}
                        handleNbEntries={handleNbEntries}
                        handleResultSearch={handleResultSearch}
                        allowRemoveRow={true}
                        handleRemoveRow={handleRemoveRow}
                        customThead={{border:'1px solid black', backgroundColor:'red'}}
                        backGroundRows={'190,120,130'}
                        customContainer={{border:'1px solid black', borderRadius:'1rem', backgroundColor:'blue',padding:'1rem', color:"#fff"}}/>
        </div>
    )
}
export default App