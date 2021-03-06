import axios from 'axios';
import React,{useEffect} from 'react'
import {useDispatch, useSelector} from "react-redux";
import BookDetail from './BookDetail';
import { Link } from 'react-router-dom'
import {fetchBooks} from '../action/addBookAction';
import MeterialTable from 'material-table';
import { Redirect } from 'react-router';

const BList = () => {
    const blist = useSelector((state) => state.book_detail.blist);
    const userValidation = useSelector((state) => state.users);

    const dispatch = useDispatch();
    const fetchBooksDetail = async()=>{
        if(userValidation.is_authenticated){
        const response = await axios.get("https://book-store-management-backend.herokuapp.com/api/books/",{headers:{ "Authorization":  localStorage.getItem("access_token")}})
        .catch((err) => {
            console.log("error: ",err)
        });dispatch(fetchBooks(response.data));
    }
    }
    useEffect(() => {
        fetchBooksDetail() }, []);
    const column = [{title: "Author", field: "author"},
        {title:"Title" , field:"title"},
        {title:"Price", field:"price"},
        {title:"Edition", field:"edition"}]  
    if (userValidation.is_authenticated){     
    if(userValidation.users.is_superuser){   
    return (
        
      <div className="m-3">
        <div className="text-right my-2">
          <Link to="/addbook" className="btn btn-primary "> Add Books</Link>
        </div>
       
        <table className="table shadow  table-striped table-bordered table-sm">
            <thead className="bg-info text-white">
                <tr>
                <th>
                    Id
                </th>               
                <th>Author</th>
                <th>Title</th>
                <th>Price</th>
                <th>Edition</th>
                <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {
                    blist.map((list) =>
                    <BookDetail list={list} key={list.id}/>
                    )
                }  
             
            </tbody>
        </table>
       
        </div>
        )}
    else{
        return(<div className="row p-3 m-0">
        <div className="text-right">
            <Link to="/addrating" className="btn btn-info my-3 button_rate"> Rate Book</Link>
        </div>
        <MeterialTable title="Books List"
        data = {blist}
        columns ={column}
        options={{
                    pageSize: 10,
                    padding: 'dense',
                    pageSizeOptions: [20, 50]
                  }}               
                  />
                  </div>);
    } 
    }
    else{
        return(
            <Redirect to="/login" />
        )
    }   
}
export default BList
