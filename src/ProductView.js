import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const ProductView = ({productId}) => {

    const [newComment,setNewComment] = useState('');//state for comments tracking
    const dispatch = useDispatch();
    const thatproduct = useSelector((state)=> state.products.products.find((prod)=> prod.id === productId)
    );
  
    const handleAddComment = (e) => {
        e.preventDefault();///to avoid render issue
        dispatch({
            type:'comments/addComment',
            payload:{productId,text:newComment,id:Date.now()},
        })
        setNewComment('');///clear after adding
    }

    const handleDeleteComment = (commentId) => {
        dispatch({
            type:'comments/removeComment',
            payload:commentId,
        })
    }

    const handleEdit = () => {
        console.log('Button clicked') ///yet to finish
    }
    return (
        <div>
            <h2>{thatproduct.name}</h2>
            <p>Quantity:{thatproduct.count}</p>
            <button onClick={handleEdit}>Edit</button>

            <h3>Comments:</h3>
            <ul>
                {thatproduct.comments.map((comment)=>(
                    <li key={comment.id}>
                        {comment.text}
                        <button onClick={()=>handleDeleteComment(comment.id)}>Delete</button>
                    </li>
                ))}
            </ul>
            <h4>Add comment:</h4>
            <form onSubmit={handleAddComment}>
<input
type='text'
value={newComment}
onChange={(e)=>setNewComment(e.target.value)}
placeholder='Type comment'
/>
<button type='submit'>Add</button>
            </form>
        </div>
    );
};
export default ProductView;