
import fs from 'fs'

const peliculasJson = JSON.parse(
  fs.readFileSync("./peliculas.json", "utf8"),
);

export function ObtenerPeliculas(offset, limit) {
  return peliculasJson.slice(offset, offset + limit)
}

export function ObtenerPelicula(imdbID){
  return peliculasJson.find(p => p.imdbID == imdbID) ?? null
}

export function CountPeliculas() {
  return peliculasJson.length
}

export function CrearPelicula(ranking, title, poster) {
  const ultimaPelicula = peliculasJson[peliculasJson.length - 1];
  const idUltimaPelicula = ultimaPelicula.imdbID;
  const idNuevaPelicula =
    parseInt(idUltimaPelicula.substring(2, idUltimaPelicula.length - 1)) + 1;

  const peliculaToInsert = {
    imdbID: "tt0" + idNuevaPelicula,
    ranking: ranking,
    Title: title,
    Poster: poster,
  };

  peliculasJson.push(peliculaToInsert);

  const nuevoContenido = JSON.stringify(peliculasJson, null, 2);
  fs.writeFile("./peliculas.json", nuevoContenido, "utf8", (err) => {
    if (err) {
      console.error("Error al escribir en el archivo:", err);
      return;
    }
    console.log("El objeto se ha inyectado correctamente en el archivo JSON.");
  });

  return nuevoContenido;
}

export function ActualizarPelicula(idPelicula, ranking, title, poster) {

  const indicePelicula = peliculasJson.findIndex(
    (pelicula) => pelicula.imdbID === idPelicula,
  );

  if (indicePelicula === -1) {
    res.status(404).send("Pelicula no encontrada");
    return;
  }

  const peliculaActualizada = {
    imdbID: idPelicula,
    ranking: ranking,
    Title: title,
    Poster: poster,
  };

  peliculasJson[indicePelicula] = peliculaActualizada;

  const nuevoContenido = JSON.stringify(peliculasJson, null, 2);
  fs.writeFile("./src/data/peliculas.json", nuevoContenido, "utf8", (err) => {
    if (err) {
      console.error("Error al escribir en el archivo:", err);
      return;
    }
    console.log(
      "El objeto se ha actualizado correctamente en el archivo JSON.",
    );
  });

  return nuevoContenido
}