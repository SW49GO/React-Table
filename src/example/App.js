import TableReact from "../lib/TableReact"

function App(){
    const columns = ['First Name','Last Name', 'Start Date','Date of Birth', 'Department','Street','City','State','Zip Code']
    const employeesData =[
        { firstName: 'Lea' , lastName: 'Laravel' , dateOfBirth: '02/10/1970', startDate: '10/01/2024' ,department: 'Engineering', street:'Verdun', city: 'Angers' ,states:'AL', zipCode: '49000'},
        { firstName: 'Etienne' , lastName: 'Daho' , dateOfBirth: '20/07/1973', startDate: '17/02/2024' ,department: 'Sales', street:'Charles', city: 'Nantes' ,states:'AK', zipCode: '44000'},
        { firstName: 'John' , lastName: 'Portman' , dateOfBirth: '07/03/1975', startDate: '11/03/2024' ,department: 'Marketing', street:'Minier', city: 'Montauban' ,states:'CA', zipCode: '82000'},
        { firstName: 'Marie' , lastName: 'Goldman' , dateOfBirth: '10/04/1965', startDate: '23/05/2024' ,department: 'Legal', street:'Hotel bleu', city: 'Cholet' ,states:'ID', zipCode: '49000'},
        { firstName: 'Paul' , lastName: 'Newman' , dateOfBirth: '06/10/1963', startDate: '21/07/2024' ,department: 'Sales', street:'Des motos', city: 'Lyon' ,states:'FL', zipCode: '87000'},
        { firstName: 'Bradley' , lastName: 'Cooper' , dateOfBirth: '15/103/1971', startDate: '29/07/2024' ,department: 'Sales', street:'Gemmes', city: 'Nantes' ,states:'FL', zipCode: '44000'}
    ]
    const entries = ['5','10','15','20','50','100']
    return (
        <div>
            <TableReact dataColumns={columns}
                        dataRows={employeesData}
                        dataEntries={entries}/>
        </div>
    )
}
export default App