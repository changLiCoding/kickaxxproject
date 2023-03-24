const express = require("express");
const router = express.Router();

const { getProductsByCategoryName } = require("../db/queries/categories");
const { updateProductStockByModel } = require("../db/queries/products");
const {
	getProductsBySubCategoryName,
} = require("../db/queries/sub_categories");

router.get("/:name/sub_categories/:sub_name", (req, res) => {
	const subCategoryName = req.params.sub_name;
	getProductsBySubCategoryName(subCategoryName)
		.then((products) => res.status(200).json({ products }))
		.catch((err) => {
			res.status(500).json({ error: err.message });
		});
});
router.get("/:name", (req, res) => {
	const categoryName = req.params.name;
	getProductsByCategoryName(categoryName)
		.then((products) => res.status(200).json({ products }))
		.catch((err) => {
			res.status(500).json({ error: err.message });
		});
});

router.post("/:name", async (req, res) => {
	console.log("Change category: ", req.params.name);
	const { product, updateType } = req.body;
	console.log("New product here: ", product);
	try {
		let newProduct = {};
		if (updateType === "increment") {
			newProduct = { ...product, stock_quantity: product.stock_quantity + 1 };
		} else if (updateType === "decrement") {
			newProduct = { ...product, stock_quantity: product.stock_quantity - 1 };
		}
		console.log("New Product aftar change: ", newProduct);
		const returnedNewProduct = await updateProductStockByModel(newProduct);
		console.log(returnedNewProduct);
		return res
			.status(200)
			.json({ message: "Product Updated", returnedNewProduct });
	} catch (error) {
		return res.status(500).json({
			message:
				"Internal server error from server !!!!!!!!! Product not updated be ware!",
		});
	}
});

module.exports = router;
