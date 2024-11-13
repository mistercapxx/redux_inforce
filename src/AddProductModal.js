import Modal from 'react-modal';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

const AddProductModal = ({isOpen,closeModal}) => {
    const [name,setName] = useState('');
    const [count,setCount] = useState('');

    const dispatch = useDispatch();

    const addProduct = () => {
       dispatch({
        type:'products/addProduct',
        payload:{name,count:parseInt(count)},///because it goes string
       });
       closeModal();//and close after adding

    }
///if true, open modal with inputs
    return (
        <Modal isOpen={isOpen} onRequestClose={closeModal}>
            <h2>Add New Product?</h2>
            <div>
                <label>Name :</label>
                <input
                type='text'
                value={name}
                onChange={(e)=>setName(e.target.value)}
                />

            </div>
            <div>
                <label>Quantity :</label>
                <input
                type='text'
                value={count}
                onChange={(e)=>setCount(e.target.value)}
                />
                
            </div>
            <button onClick={addProduct}>Add</button>
            <button onClick={closeModal}>Cancel</button>
        </Modal>
    )
}

export default AddProductModal;


