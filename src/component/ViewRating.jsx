import axios from 'axios';
import React,{useEffect} from 'react'
import {useDispatch, useSelector} from "react-redux";
import { Link } from 'react-router-dom'
import {fetchRating} from '../action/addBookAction';
import MeterialTable from 'material-table';
import { Nav } from './Nav';



const ViewRating = () => {
    const blist = useSelector((state) => state.book_detail.review);
    
    const dispatch = useDispatch();
    const fetchBooksDetail = async()=>{
        const response = await axios.get("https://book-store-management-backend.herokuapp.com/api/book-review/",{headers:{ "Authorization":  localStorage.getItem("access_token")}})
        .catch((err) => {
            console.log("error: ",err)
        });dispatch(fetchRating(response.data));
    }
    useEffect(() => {
        fetchBooksDetail() }, []);
    const column = [{title:"Book Id", field:"book_id"},    
{title:"User", field:"username"},
{title:"Rating ", field:"rating"},
{title:"Review", field:"review"},
{title:"Date", field:"datetime"}]    
    

    return (
        <div className="container mt-2">
          <div className="text-right">
            <Link to="/addrating" className="btn btn-info my-3 button_rate"> Rate Book</Link>
        </div>           
        <MeterialTable title="Rating Table"
        data = {blist}
        columns ={column}
        options={{
                    pageSize: 10,
                    padding: 'dense',
                    pageSizeOptions: [20, 50]
                  }}
            
                  />
       </div>
    )
}

export default ViewRating
