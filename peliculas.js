import { Router } from 'express'
import bodyParser from 'body-parser'
const router = Router()
router.use(bodyParser.json());

import { ObtenerPeliculas, ObtenerPelicula, CountPeliculas, CrearPelicula } from './peliculasController.js'

router.get("/", (req, res) => {
  res.send("Hello World!");
});

//LISTAR
router.get("/listar", (req, res) => {
  const limit = parseInt(req.query.limit) || 10; // Si no se proporciona, el valor predeterminado será 10
  const offset = parseInt(req.query.offset) || 0; // Si no se proporciona, el valor predeterminado será 0

  const peliculasJson = ObtenerPeliculas(offset, limit);

  const peliculasFinal = {
    total: peliculasJson.length,
    movies: peliculasJson,
  };

  res.send(peliculasFinal);
});

//LISTAR
router.get("/count", (req, res) => {

  const peliculasLenght = CountPeliculas();

  res.send(""+peliculasLenght);
});

//OBTENER
router.get("/:id", (req, res) => {
  const id = parseInt(req.query.id)

  const peliculaJson = ObtenerPelicula(id);

  res.send(peliculaJson);
});

//INSERT
router.post("/", (req, res) => {
  const ranking = req.body.ranking;
  const title = req.body.Title;
  const poster = req.body.Poster;

  const crearPelicula = CrearPelicula(ranking, title, poster);

  res.send(crearPelicula);
});

//UPDATE
router.patch("/:idPelicula", (req, res) => {
  const idPelicula = req.params.idPelicula;
  const ranking = req.body.ranking;
  const title = req.body.Title;
  const poster = req.body.Poster;

  const actualizarPelicula = ActualizarPelicula(idPelicula, ranking, title, poster)

  res.send(actualizarPelicula);
});

//DELETE
router.delete("/:idPelicula", (req, res) => {
  const idPelicula = req.params.idPelicula;

  const indicePelicula = peliculasJson.findIndex(
    (pelicula) => pelicula.imdbID === idPelicula,
  );

  if (indicePelicula === -1) {
    res.status(404).send("Pelicula no encontrada");
    return;
  }

  peliculasJson.splice(indicePelicula, 1);

  const nuevoContenido = JSON.stringify(peliculasJson, null, 2);
  fs.writeFile("./src/data/peliculas.json", nuevoContenido, "utf8", (err) => {
    if (err) {
      console.error("Error al escribir en el archivo:", err);
      return;
    }
    console.log("El objeto se ha eliminado correctamente del archivo JSON.");
  });

  res.send(204);
});

export default router
