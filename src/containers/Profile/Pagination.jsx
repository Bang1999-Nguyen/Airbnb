import React from 'react'
import './Profile.scss'
const Paginate = ({ postsPerPage, totalPosts, paginate, pageNumber, nextPage, prevPage }) => {
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
        pageNumbers.push(i)
    }
    return (
        <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', marginTop: '0px', textAlign: 'center', marginRight: '0px' }} >
            <div className="icon-previous">
                <button onClick={() => prevPage(pageNumber--)} style={{  color: '#fff',  borderRadius: '50%',   fontWeight: '600', pointerEvents: `${pageNumber < 2 ? 'none' : 'auto'}`, color: `${pageNumber < 2 ? 'gray' : 'crimson'}`, border:`${pageNumber < 2 ? '1px solid black' : 'transparent'}`,  backgroundColor: `${pageNumber < 2 ? 'white' : 'black'}`, width:'50px', height:'50px'}} className="pg_previous"><i class="fas fa-chevron-left" style={{lineHeight:'50px', color:`${pageNumber < 2 ? 'black' : '#fff'}`}}></i></button>
            </div>
            <div style={{display:'flex'}}>
                {
                    pageNumbers.map((number, index) =>{
                        return <li style={{color:`${pageNumber === number ? 'white' : 'black'}`, backgroundColor: `${pageNumber === number ? 'crimson' : '#fff'}`}} key={index} className="nav-link-pagination">
                            <p onClick={() => paginate(number)}>{number}</p>
                            </li>
                    })
                }
            </div>
            <div className="icon-next">
                <button onClick={() => nextPage(pageNumber++)} style={{  color: '#fff',  borderRadius: '50%',   fontWeight: '600', pointerEvents: `${pageNumber >= Math.ceil(totalPosts / postsPerPage) ? 'none' : 'auto'}`, color: `${pageNumber >= Math.ceil(totalPosts / postsPerPage) ? 'gray' : 'crimson'}`, border:`${pageNumber >= Math.ceil(totalPosts / postsPerPage) ? '1px solid black' : 'transparent'}`,  backgroundColor: `${pageNumber >= Math.ceil(totalPosts / postsPerPage) ? 'white' : 'black'}`, width:'50px', height:'50px'}} className="pg_previous"><i class="fas fa-chevron-right" style={{lineHeight:'50px', color:`${pageNumber >= Math.ceil(totalPosts / postsPerPage) ? 'black' : '#fff'}`}}></i></button>
            </div>
           
        </div>
    )
}
export default Paginate