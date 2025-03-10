const express = require("express");
const router = express.Router();
const {
  findAll,
  findById,
  insert,
  update,
  deleteOne,
} = require("../controllers/serie.controller");
const { isAuthenticated, isAdminPro } = require("../middleware/auth.middleware");

router.get("/", isAuthenticated, async (req,res) => {
  try {
    const series = await findAll();
    return res.status(200).json(series);
  } catch (error) {
    return res
      .status(500)
      .json({ msg: "error en la busqueda de las series" });
  }
});
router.get("/:id", isAuthenticated, async (req,res) =>{
  try {
    const serie = await findById(req.params.id);
    return res.status(200).json(serie);
  } catch (error) {
    return res
      .status(500)
      .json({ msg: "error en la busqueda de la serie con dicho ID" });
  }
});


router.post("/", isAdminPro, async (req,res) =>{
  try {
    const newSerie = await insert(req.body)
    return res.status(200).json({msg: "serie creada con éxito", newSerie})
  } catch(error) {
    return res.status(500).json({ msg: "error al guardar la serie" });
  }
});

router.delete("/:id", isAdminPro, async (req, res) => {
  try {
    const serieDeleted = await deleteOne(req.params.id);
    return res.status(200).json({ msg: "serie elminada: ", serieDeleted });
  } catch (error) {
    return res.status(500).json({ msg: "error interno del servidor" });
  }
});

router.put("/:id", isAdminPro, async (req, res) => {
  try {
    const updatedSerie = await update(req.params.id, req.body);
    return res.status(200).json({ msg: "serie modificada: ", updatedSerie });
  } catch (error) {
    return res.status(500).json({ msg: "error interno del servidor" });
  }
});

module.exports = router;