const Serie = require("../models/serie.model");

async function findAll(){
    const series = await Serie.find();
    return series;
}

async function findById(id){
    const serie = await Serie.findById(id);
    return serie;
}

async function insert(body) {
    const newSerie = new Serie({
      title: body.title,
      synopsis: body.synopsis,
      img: body.img,
      director: body.director,
      year: body.year,
      category: body.category,
    });
    await newSerie.save();
    return  newSerie
}

async function update(id, body) {
  const updatedSerie = await Serie.findByIdAndUpdate(
      id, 
      {
          title: body.title,
          synopsis: body.synopsis,
          img: body.img,
          director: body.director,
          year: body.year,
          category: body.category,
      },
      { new: true } // devuelve el documento actualizado
  );
  return updatedSerie;
}
async function deleteOne(id) {
  const serieDeleted = await Serie.findByIdAndDelete(id);
  return serieDeleted;
}


module.exports = {
    findAll,
    findById,
    insert,
    update,
    deleteOne,
}