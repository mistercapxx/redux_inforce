import { useDispatch, useSelector } from "react-redux";
import AddProductModal from './AddProductModal';
import { useState } from "react";
import ProductView from "./ProductView";

const ProductList = () => {
const products = useSelector(state => state.products.products);
const dispatch = useDispatch();
const [isModalOpen,setIsModalOpen] = useState(false); ///open modal
const [sortOption,setSortOption] = useState('name'); ///for sorting by name or qunatity// default is name
const [selectedProductId, setSelectedProductId] = useState(null);///for selected product from list



const handleSortChange = (e) => {
    setSortOption(e.target.value); ///choosing filter
    ///by current value from select option
};

const openModal = () => setIsModalOpen(true);
const closeModal = () => setIsModalOpen(false); ///close modal if cancel or added already

const sortedProducts = [...products].sort((a,b)=> { ///sorted array by name or quantity
    if(sortOption === 'name') {
        return a.name.localeCompare(b.name);
    }
    else {
        return a.count - b.count;
    }
})


// const addProduct = (newProduct) => {
//     dispatch({
//         type:'products/addProduct',
// payload:newProduct})
// }
const removeProduct = (productId) => {
    dispatch({
        type:'products/removeProduct',
        payload:productId})
}

    return (
<div>
    <h1>Products</h1>
    <select onChange={handleSortChange} value={sortOption}>
        <option value="name">By Name</option> 
        <option value="count">By Quantity</option>
    </select>

        <ul>
        {sortedProducts.map(product => (
            <li key={product.id}>
                   {product.name} - {product.count}
                <button onClick={()=>removeProduct(product.id)}>Remove</button>
            </li>
        ))}
    </ul>

   
    <button onClick={openModal}>Add New Product</button>
  
    {/* <button onClick={()=> addProduct({name:'New Product'})}>Add Product</button> */}
    <AddProductModal isOpen={isModalOpen} closeModal={closeModal}/>
</div>
    )
};
export default ProductList;