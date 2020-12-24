import axios from "axios";

for (let i = 0; i <8 ; i++) {
    const body = {
        title: "My",
        description: "documental",
        duration: 200,
        yearOfPublished: 2000+i,
    };
    axios
        .post("http://0.0.0.0:8000/api/movies/", body)
        .then((res) => console.log(res.data))
        .catch((e) => console.log(e));

}

