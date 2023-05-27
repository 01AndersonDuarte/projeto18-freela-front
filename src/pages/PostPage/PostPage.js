import axios from "axios";
import { useEffect, useState } from "react";

export default function PostPage() {
  const [photo, setPhoto] = useState();
  const [imageUrl, setImageUrl] = useState(null);
  const config = { headers: { Authorization: `Bearer 97fef5f4-4812-4961-a45b-62065f48a361` } };

  function sendPost(e) {
    e.preventDefault();

    const url = 'http://localhost:5000/create-post';
    const formData = new FormData();
    formData.append('photo', photo);
    formData.append('description', "Essa é um breve description");

    axios.post(url, formData, config).then((sucess) => {
      // console.log(sucess.data);
    }).catch((error) => {
      console.log(error);
    });
  };

  useEffect(() => {
    const url = 'http://localhost:5000/get-user-posts/6';
    axios.get(url).then((sucess) => {
      // console.log(sucess.data);
      setImageUrl(sucess.data);
    }).catch((error) => {
      console.log(error);
    });
  }, []);

  return (
    <div>
      <form action="/create-post" method="POST" encType="multipart/form-data" onSubmit={sendPost}>
        <input name="photo" type="file" onChange={e => setPhoto(e.target.files[0])} />
        <button type="submit">ENVIAR</button>
      </form>

      {imageUrl && imageUrl.map(i => 
        <>
          <img src={i.image}/>
          <p>{i.description}</p>
        </>
      )}
    </div>
  );
}