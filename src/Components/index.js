import React, {Fragment,useState, useEffect, useMemo} from 'react'
import ReactDOM from 'react-dom';
import  Header from './Headers/Header';
import PaginationComponent from './Pagination/PaginationComponent';
import Search from './Search/Search';
import Footer from './Footer/Footer';

const Index = () => {
    const [comments, setComments] = useState([]);
    const [totalItems, setTotalItems]= useState(0);
    const [currentPage, setcurrentPage]= useState(1);
    const [search, setSearch] = useState("");
    const [sorting, setSorting] = useState({field: "", order: ""})
    const ITEMS_PER_PAGE = 8;
    const headers = [
            {name: "SNO", field: "SNO", sortable: true},
            {name: "DEPT", field: "DEPT", sortable: true},
            {name: "PURCHASED_ON", field: "PURCHASED_ON", sortable: true},
            {name: "PRICE", field: "PRICE", sortable: true},
            {name: "QUANTITY", field: "QUANTITY", sortable: true},
            {name: "REQUST_RAISED_BY", field: "REQUST_RAISED_BY", sortable: true},
            {name: "REQUEST_RAISED_ON", field: "REQUEST_RAISED_ON", sortable: true},
            {name: "DESCRIPTION", field: "DESCRIPTION", sortable: true}
        ];

    useEffect(() => {
        const getData = () => {
            fetch('./data.json')  
            .then( response  => response.json()) 
            .then(json => {
                setComments(json);
            });
        };
        getData();
    }, []);

    const commentsData = useMemo(() => {
        let computedComments = comments;
        if(search){
            computedComments = computedComments.filter(
                comment => 
                comment.DEPT.toLowerCase().includes(search.toLowerCase()) ||
                comment.PURCHASED_ON.toLowerCase().includes(search.toLowerCase()) ||
                comment.DESCRIPTION.toLowerCase().includes(search.toLowerCase()) ||
                comment.REQUST_RAISED_BY.toLowerCase().includes(search.toLowerCase()) ||
                comment.PRICE.toLowerCase().includes(search.toLowerCase()) ||
                comment.REQUEST_RAISED_ON.toLowerCase().includes(search.toLowerCase())
            )
        }

        setTotalItems(computedComments.length);
        if( sorting.field ) {
            const reversed = sorting.order === "asc" ? 1 : -1;
            computedComments  = computedComments.sort(
                (a,b) => 
                reversed * a[sorting.field].localeCompare(b[sorting.field])
            );
        }
        // urrent page slicing
        return computedComments.slice( 
            (currentPage - 1) * ITEMS_PER_PAGE, 
            (currentPage - 1) * ITEMS_PER_PAGE + ITEMS_PER_PAGE);
    }, [comments, currentPage, search, sorting]);
    
    return(
        <Fragment>
            <div className = "row w-100">
                <div className = "col mb-3 col-12 text-center mt-3">
                            <Search data-testid = "search-button" onSearch = { (value) => {
                                setSearch(value);
                                setcurrentPage(1);
                            }} />
                </div>
            </div>
            <div className = "row w-100">
                <div className = "col mb-3 col-12 text-center">
                    <table className = "table table-striped">
                        <Header headers={headers} onSorting = {(field, order) => 
                            setSorting({field, order})
                        }/>
                      {commentsData.length > 0 ? <tbody>
                           {commentsData.map( comment => (
                               <tr>
                                <td scope = "row">{comment.SNO}</td>
                                <td>{comment.DEPT}</td>
                                <td>{comment.PURCHASED_ON}</td>
                                <td>{comment.PRICE}</td>
                                <td>{comment.QUANTITY}</td>
                                <td>{comment.REQUST_RAISED_BY}</td>
                                <td>{comment.REQUEST_RAISED_ON}</td>
                                <td>{comment.DESCRIPTION}</td>
                               </tr>
                           ))}
                        </tbody> :<tr>
                            <td colSpan ="8" style={{color: "red", fontWeight:"bold"}}>
                            No Data availabe for Particular Record !!!
                            </td>
                            </tr>} 
                    </table>
                </div>
            </div>
            <div className = "row w-100">
                <div className = "col mb-3 col-12 pagination">
                            <PaginationComponent
                            total = {totalItems}
                            itemPerPage = {ITEMS_PER_PAGE}
                            currentPage = {currentPage}
                            onPageChange = { page => setcurrentPage(page)}
                            />
                </div>
            </div>
            <Footer />
        </Fragment>
    )
};
export default Index;