import React, { useState } from 'react'
import { getResponse } from '../API/apiCall'
import Pagination from './Pagination'
import { Link } from 'react-router-dom'
import './Blog.css'
import PostDisplay from './PostDisplay'

function Blog() {

    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(10);
    const [apidata, setapidata] = useState('')
    const [noOfPosts, setNoOfPosts] = useState(0)
    const [apiCalled, setApiCalled] = useState(false)
    

    const getData = async() => {
        const data = await getResponse()
        console.log(data)
        setNoOfPosts(data.data.blogs.length)
        setapidata(data)
    }

    if(!apiCalled){
        getData()
        setApiCalled(true)
    }
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const paginate = pageNumber => setCurrentPage(pageNumber);

    return (
        <div>
            <h1>Blogs</h1>
            <button onClick={getData}>get data</button> 
            <h1>
                {apidata.data && (
                    <div>
                          {apidata.data.blogs.slice(indexOfFirstPost, indexOfLastPost).map((xtitle, index)=>{
                            return(
                            <div className='blog-items' key={index}>
                                <Link to='/postdisplay'>
                                    <p>{xtitle.title}</p>
                                </Link>
                                <p>{xtitle.date}</p>
                                <p>{xtitle.post}</p>
                            </div>
                            )
                        })
                    }
                    </div>
                )}
                 
            </h1>
            <Pagination
            postsPerPage={postsPerPage}
            totalPosts={noOfPosts}
            paginate={paginate} />

        </div>
    )
}

export default Blog