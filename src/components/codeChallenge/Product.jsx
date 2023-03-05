import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import state from 'sweetalert/typings/modules/state';

//doesn't have to be here
const defaultProduct = {
	id: 0,
	sku: '',
	grams: 0.0,
	price: 0,
	title: '',
	weight: 0.0,
};

function Product() {
	//this is what I am grabbing from the router
	const location = useLocation();
	const navigate = useNavigate();
	const { productId } = useParams();

	//this is my state's
	const [myProduct, setMyProduct] = useState(defaultProduct);
	const [prodId, setProductId] = useState(productId);

	console.log({ productId, prodId, location });

	const goToPage = (e) => {
		const targetPage = e.currentTarget.dataset.page;
		console.log(targetPage);
		navigate(targetPage);
	};

	useEffect(() => {
		console.log('useEffect is firing');
		setProductId(productId);
		//using to update the state for myProduct
		//optional chaining (?) does internal null check
		if (state?.type === 'PRODUCT_VIEW' && state?.payload) {
			console.log('productView change is firing');
			setMyProduct((prevState) => {
				//copy the preState and copy of payload as well, and payload will overwrite
				//the properties of prevState
				return { ...prevState, ...state.payload };
			});
		} //useEffect function is firing everytime array dependency changes ex.[productId, state]
	}, [productId, state]);

	return (
		<main>
			<div className="row mb-3 text-center my-5">
				<div className="col">
					<div className="card mb-4 rounded-3 shadow-sm border-primary">
						<div className="card-header py-3 text-white bg-primary border-primary">
							<h4 className="my-0 fw-normal">Enterprise</h4>
						</div>
						<div className="card-body">
							<h3 className="card-title pricing-card-title">
								R: {productId} | S: {prodId}
							</h3>
							<pre className="text-start">
								<code>{JSON.stringify(myProduct, undefined, 2)}</code>
							</pre>

							<button type="button" className="w-100 btn btn-lg btn-primary">
								Contact Us
							</button>
						</div>
					</div>
				</div>
				<div className="col"></div>
			</div>
		</main>
	);
}

export default Product;
