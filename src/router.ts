import {
  createProduct,
  deleteProduct,
  getOneProduct,
  getProducts,
} from "./handlers/product";
import {
  createUpdate,
  deleteUpdate,
  getOneUpdate,
  getUpdates,
  updateUpdate,
} from "./handlers/update";

import { Router } from "express";
import { body } from "express-validator";
import { handleInputErrors } from "./modules/middleware";

const router = Router();

// Product routes
router.get("/product", getProducts);
router.get("/product/:id", getOneProduct);
router.post(
  "/product/",
  body("name").isString(),
  handleInputErrors,
  createProduct
);
router.delete("/product/:id", deleteProduct);

// Update routes
router.get("/update", getUpdates);
router.get("/update/:id", getOneUpdate);
router.put(
  "/update/:id",
  body("title").optional(),
  body("body").optional(),
  body("status").isIn(["IN_PROGRESS", "SHIPPED", "DEPRECATED"]).optional(),
  body("version").optional(),
  updateUpdate
);
router.post(
  "/update",
  body("title").exists(),
  body("body").exists().isString(),
  body("productId").exists().isString(),
  createUpdate
);
router.delete("/update/:id", deleteUpdate);

// Update Point routes
router.get("/updatepoint", () => {});
router.get("/updatepoint/:id", () => {});
router.put(
  "/updatepoint/:id",
  body("name").optional().isString(),
  body("descritpion").optional().isString(),
  () => {}
);
router.post(
  "/updatepoint/",
  body("name").isString(),
  body("descritpion").isString(),
  body("updateId").exists().isString(),
  () => {}
);
router.delete("/updatepoint/:id", () => {});

router.use((err, _req, res) => {
  if (err instanceof Error) {
    res.status(500).json({ message: "Something went wrong" });
    return;
  }
});

export default router;
